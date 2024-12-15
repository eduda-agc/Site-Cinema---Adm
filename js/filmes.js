document.addEventListener('DOMContentLoaded', () => {
    loadMovies(); // Carregar filmes da base de dados
});

// Função para carregar os filmes
async function loadMovies() {
    try {
        const response = await fetch('/movies-list'); 
        if (!response.ok) throw new Error('Erro ao carregar os filmes.');

        const movies = await response.json();

        const filmeContainer = document.getElementById('filmeContainer');
        filmeContainer.innerHTML = ''; // Limpar conteúdo anterior

        // Exibir os filmes disponíveis
        if (movies.length === 0) {
            filmeContainer.innerHTML = '<p>Nenhum filme disponível no momento.</p>';
            return;
        }

        movies.forEach(movie => {
            const filmeCard = document.createElement('div');
            filmeCard.classList.add('filme-card');
            filmeCard.innerHTML = `
                <h3>${movie.name}</h3>
                <img src="${movie.image}" alt="${movie.name}" style="width: 100%; border-radius: 10px; margin-bottom: 10px;">
                <p><strong>Sinopse:</strong> ${movie.synopsis}</p>
                <p><strong>Preço:</strong> ${movie.ticketPrice}</p>
                <button onclick="buyTicket('${movie._id}')">Comprar Ingresso</button>
            `;
            filmeContainer.appendChild(filmeCard);
        });
    } catch (error) {
        console.error(error);
        const filmeContainer = document.getElementById('filmeContainer');
        filmeContainer.innerHTML = '<p>Erro ao carregar os filmes. Tente novamente mais tarde.</p>';
    }
}

// Função para comprar ingresso (em desenvolvimento)
function buyTicket(movieId) {
    alert(`Funcionalidade para comprar ingresso do filme ${movieId} em desenvolvimento.`);
}
