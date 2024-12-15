document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Evita o recarregamento da página

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        // Faz uma requisição POST para o backend
        const response = await fetch('http://127.0.0.1:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        // Tratamento de erro no login
        if (!response.ok) {
            alert(data.message || 'Erro no login');
            return;
        }

        // Verifica o papel do usuário
        if (data.user && data.user.role === 'admin') {
            alert('Login bem-sucedido! Redirecionando para a página de administração.');
            window.location.href = 'adm_addDados.html'; // Redireciona para a página de administração
        } else {
            alert('Login bem-sucedido, mas você não tem permissão de administrador.');
        }
    } catch (error) {
        console.error('Erro ao realizar login:', error);
        alert('Erro ao conectar ao servidor. Tente novamente mais tarde.');
    }
});
