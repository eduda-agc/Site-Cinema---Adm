async function carregarFilmes() {
    const container = document.getElementById('filmeContainer');
    try {
        const response = await fetch('http://localhost:3000/movies');
        if (!response.ok) throw new Error('Erro ao carregar filmes');
        
        const filmes = await response.json();
        console.log("Filmes recebidos:", filmes); // Verificar JSON recebido

        filmes.forEach(filme => {
            const card = document.createElement('div');
            card.className = 'filme-card';

            card.innerHTML = `
                <h3>${filme.name}</h3>
                <p>${filme.synopsis}</p>
                <p><strong>Sala:</strong> ${filme.room}</p>
                <p><strong>Preço:</strong> R$${filme.ticketPrice}</p>
                <img src="${filme.image}" alt="${filme.name}" style="width:100%; border-radius: 5px; margin-top: 10px;">
                <button>Assistir</button>
            `;

            container.appendChild(card);
        });
    } catch (error) {
        console.error('Erro ao carregar filmes:', error);
    }
}

document.addEventListener('DOMContentLoaded', carregarFilmes);
