# Site Cinema Adm

Este repositório contém o projeto **SiteCinema**, uma aplicação web que simula o caso de uso de um sistema completo para administração de um site de cinema. O foco do projeto é demonstrar o funcionamento de um administrador que gerencia os dados dos filmes disponíveis, adicionando e atualizando as informações através de páginas dedicadas.

## Estrutura do Projeto

```plaintext
siteCinema/
│
├── models/                    # Estruturas para o MongoDB
│   ├── Filme.js               # Model do filme
│   └── User.js                # Model do usuário (admin)
│
├── js/                        # Scripts em JavaScript para cada página
│   ├── adm_addDados.js        # Lógica para adicionar filmes
│   ├── adm_attDados.js        # Lógica para atualizar filmes
│   ├── filmes.js              # Exibição de filmes no cliente
│   └── login.js               # Lógica de autenticação do administrador
│
├── node_modules/              # Dependências instaladas pelo npm
│
├── uploads/                   # Imagens que podem ser atribuídas aos filmes ou produtos
│
├── adm_addDados.html          # Página para adicionar filmes (Administrador)
├── adm_attDados.html          # Página para atualizar filmes (Administrador)
├── filmes.html                # Página para exibir os filmes (Cliente)
├── index.html                 # Página inicial do site
├── login.html                 # Página de login para administrador
├── index.js                   # Servidor base (Node.js) e integração com MongoDB
├── package.json               # Configuração do projeto e dependências
├── package-lock.json          # Detalhamento das dependências instaladas
```
## Descrição do Caso de Uso

O caso de uso simula o administrador de um site de cinema realizando as seguintes tarefas:

1. **Adicionar um Filme**  
   Acessando a página `adm_addDados.html`, o administrador pode preencher um formulário para adicionar novos filmes à base de dados, incluindo informações como título, descrição e imagem (a ser carregada da pasta `uploads`).

2. **Atualizar um Filme**  
   Na página `adm_attDados.html`, o administrador pode modificar os dados de um filme já existente na base.

3. **Logout e Visualização de Filmes**  
   Após as alterações, ao realizar o logout, o administrador pode verificar os filmes adicionados ou atualizados na aba de filmes exibida ao público geral (`filmes.html`).

---

## Como Executar o Projeto

### Pré-requisitos

- **Node.js** instalado no sistema.  
  Caso não tenha o Node.js instalado, siga as instruções de instalação neste [link](https://nodejs.org/en).

- **MongoDB** instalado e em execução no sistema.

---

### Passo a Passo

1. **Baixar e Extrair o Repositório**  
   Faça o download ou clone o repositório e extraia os arquivos.

2. **Abrir o Diretório no Terminal**  
   Navegue até a pasta do projeto (`siteCinema`) usando o terminal.

3. **Instalar as Dependências**  
   Execute o comando:
   ```bash
   npm install


