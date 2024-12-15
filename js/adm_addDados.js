document.addEventListener('DOMContentLoaded', () => {
    // Salvar Filmes
    const saveMoviesButton = document.getElementById('saveMoviesButton');
    saveMoviesButton.addEventListener('click', async () => {
        const movieData = [];
    
        for (let i = 1; i <= 4; i++) {
            const name = document.querySelector(`[name="title-movie-0${i}"]`).value;
            const synopsis = document.querySelector(`[name="sin-film-0${i}"]`).value;
            const imageFile = document.querySelector(`[name="movie-image-0${i}"]`).files[0];
            const ticketPrice = document.querySelector(`[name="ticket-movie-0${i}"]`).value;
    
            if (!name || !synopsis || !imageFile || !ticketPrice) {
                alert(`Preencha todos os campos para a Sala ${i}`);
                return;
            }
    
            // Upload da imagem
            const imageUrl = await uploadImage(imageFile);
            if (!imageUrl) {
                alert(`Erro ao fazer upload da imagem para a Sala ${i}`);
                return;
            }
    
            movieData.push({
                room: i,
                name,
                synopsis,
                image: imageUrl,
                ticketPrice: parseFloat(ticketPrice),
            });
        }
    
        // Enviar dados dos filmes
        try {
            const response = await fetch('http://127.0.0.1:3000/movies', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ movies: movieData }),
            });
    
            if (!response.ok) {
                const error = await response.json();
                alert(`Erro ao salvar filmes: ${error.message}`);
                return;
            }
    
            alert('Filmes salvos com sucesso!');
        } catch (error) {
            console.error('Erro ao salvar filmes:', error);
            alert('Erro ao conectar ao servidor.');
        }
    });
    
    // Função para upload de imagens
    async function uploadImage(file) {
        const formData = new FormData();
        formData.append('file', file);
    
        try {
            const response = await fetch('http://127.0.0.1:3000/upload', {
                method: 'POST',
                body: formData,
            });
    
            if (!response.ok) {
                console.error('Erro ao fazer upload da imagem:', await response.text());
                return null;
            }
    
            const data = await response.json();
            return data.imageUrl; // Retorna a URL da imagem
        } catch (error) {
            console.error('Erro ao fazer upload da imagem:', error);
            return null;
        }
    }
    
});
