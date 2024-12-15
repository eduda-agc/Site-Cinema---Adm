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

