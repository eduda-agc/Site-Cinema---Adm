import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import expressFileUpload from 'express-fileupload';

// Importar modelos
import User from './models/User.js';
import Movie from './models/Filme.js';

const app = express();

// Middleware 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:5500',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:5500',
  ],
}));
app.use(expressFileUpload()); // Middleware de upload de arquivos

// Servir arquivos estáticos
app.use(express.static(path.join(process.cwd(), 'js')));
app.use(express.static(path.join(process.cwd())));
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Configuração da rota de upload
app.post('/upload', (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ message: 'Nenhum arquivo foi enviado.' });
  }

  const file = req.files.file;
  const uploadPath = path.join(process.cwd(), 'uploads', file.name);

  // Salvar o arquivo no servidor
  file.mv(uploadPath, (err) => {
    if (err) {
      console.error('Erro ao fazer upload da imagem:', err);
      return res.status(500).json({ message: 'Erro ao fazer upload.' });
    }

    res.status(200).json({ imageUrl: `/uploads/${file.name}` });
  });
});

// =========================================
// Rotas de Usuários
// =========================================

app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Buscar o usuário no banco de dados
    const user = await User.findOne({ username, password });
    if (!user) {
      return res.status(401).json({ message: 'Usuário ou senha inválidos' });
    }

    // Verificar permissão de administrador
    if (user.role !== 'admin') {
      return res.status(403).json({ message: 'Login bem-sucedido, mas você não tem permissão de administrador.' });
    }

    res.status(200).json({ message: 'Login bem-sucedido!', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro no servidor.' });
  }
});

app.get('/users', async (req, res) => {
  try {
    const users = await User.find().exec();
    return res.json(users);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao listar usuários.' });
  }
});

// =========================================
// Rotas de Filmes
// =========================================

// salvar filme
app.post('/movies', async (req, res) => {
  try {
    const { movies } = req.body;

    for (const movie of movies) {
      await Movie.findOneAndUpdate(
        { room: movie.room },
        movie,
        { upsert: true, new: true }
      );
    }

    res.status(200).json({ message: 'Filmes atualizados com sucesso!' });
  } catch (error) {
    console.error('Erro ao salvar filmes:', error);
    res.status(500).json({ message: 'Erro ao salvar filmes.' });
  }
});

// Obter todos os filmes
app.get('/movies', async (req, res) => {
  try {
    const movies = await Movie.find().exec();
    res.status(200).json(movies);
  } catch (error) {
    console.error('Erro ao listar filmes:', error);
    res.status(500).json({ message: 'Erro ao listar filmes.' });
  }
});

// Atualizar um filme
app.put('/movies/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let updateData = req.body;

    // Verificar se há uma nova imagem sendo enviada
    if (req.files && req.files.image) {
      const imageFile = req.files.image;
      const uploadPath = path.join(process.cwd(), 'uploads', imageFile.name);

      // Salvar nova imagem
      await imageFile.mv(uploadPath);
      updateData.image = `/uploads/${imageFile.name}`; // Atualizar caminho da imagem no banco
    }

    // Atualizar os outros atributos no banco
    const updatedMovie = await Movie.findByIdAndUpdate(id, updateData, { new: true }).exec();

    if (!updatedMovie) {
      return res.status(404).json({ message: 'Filme não encontrado.' });
    }

    res.status(200).json(updatedMovie);
  } catch (error) {
    console.error('Erro ao atualizar filme:', error);
    res.status(500).json({ message: 'Erro ao atualizar filme.' });
  }
});


// =========================================
// Inicialização do Servidor e Banco de Dados
// =========================================

const createAdminIfNotExists = async () => {
  const adminExists = await User.findOne({ username: 'admin' }).exec();
  if (!adminExists) {
    await User.create({
      name: 'Admin User',
      username: 'admin',
      password: 'admin123',
      role: 'admin',
    });
    console.log('Usuário administrador criado com sucesso.');
  }
};

const PORT = 3000;
const DB_URI = 'mongodb://localhost:27017/cinema';

// Conexão com o banco de dados
mongoose
  .connect(DB_URI)
  .then(async () => {
    console.log('Conectado ao banco de dados.');
    await createAdminIfNotExists();
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Erro ao conectar ao banco de dados:', err);
  });
