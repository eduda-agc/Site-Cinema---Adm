document.addEventListener('DOMContentLoaded', () => {
    const filmeContainer = document.getElementById('filmeContainer');

    // Carregar filmes e produtos ao carregar a página
    loadMovies();
    loadProducts();

    // Função para carregar filmes
    async function loadMovies() {
        try {
            const response = await fetch('http://127.0.0.1:3000/movies');
            const movies = await response.json();
    
            movies.forEach(movie => {
                const movieCard = document.createElement('div');
                movieCard.classList.add('filme-card');
                movieCard.innerHTML = `
                    <label>Sala ${movie.room}</label>
                    <p>Nome: <span class="movie-name">${movie.name}</span></p>
                    <p>Sinopse: <span class="movie-synopsis">${movie.synopsis}</span></p>
                    <p>Preço: <span class="movie-ticket">${movie.ticketPrice}</span></p>
                    <img src="${movie.image}" alt="Imagem do Filme" style="width: 100%; margin-bottom: 10px;">
                    <button class="edit-movie" data-id="${movie._id}">Modificar</button>
                `;
                filmeContainer.appendChild(movieCard);
    
                const editButton = movieCard.querySelector('.edit-movie');
                editButton.addEventListener('click', () => editMovie(movie, movieCard));
            });
        } catch (error) {
            console.error('Erro ao carregar filmes:', error);
        }
    }

    // Função para editar filme
    async function editMovie(movie, movieCard) {
        movieCard.innerHTML = `
            <label>Sala ${movie.room}</label>
            <input type="text" class="movie-name" value="${movie.name}">
            <textarea class="movie-synopsis">${movie.synopsis}</textarea>
            <input type="number" class="movie-ticket" value="${movie.ticketPrice}">
            <label>Imagem Atual:</label>
            <img src="${movie.image}" alt="Imagem do Filme" style="width: 100%; margin-bottom: 10px;">
            <input type="file" class="movie-image" accept="image/*">
            <button class="save-movie">Salvar</button>
        `;
    
        const saveButton = movieCard.querySelector('.save-movie');
        saveButton.addEventListener('click', async () => {
            const updatedMovie = {
                name: movieCard.querySelector('.movie-name').value,
                synopsis: movieCard.querySelector('.movie-synopsis').value,
                ticketPrice: parseFloat(movieCard.querySelector('.movie-ticket').value),
            };
    
            const imageFile = movieCard.querySelector('.movie-image').files[0];
            const formData = new FormData();
            formData.append('name', updatedMovie.name);
            formData.append('synopsis', updatedMovie.synopsis);
            formData.append('ticketPrice', updatedMovie.ticketPrice);
    
            if (imageFile) {
                formData.append('image', imageFile); // Adicionar imagem, se selecionada
            }
    
            try {
                const response = await fetch(`http://127.0.0.1:3000/movies/${movie._id}`, {
                    method: 'PUT',
                    body: formData, // Enviar como FormData para incluir a imagem
                });
    
                if (response.ok) {
                    alert('Filme atualizado com sucesso!');
                    location.reload(); // Recarregar página para refletir alterações
                } else {
                    alert('Erro ao atualizar filme.');
                }
            } catch (error) {
                console.error('Erro ao salvar filme:', error);
            }
        });
    }
    
});
