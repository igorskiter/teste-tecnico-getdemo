# Monorepo - teste-tecnico-getdemo

Este repositório contém o código-fonte e as configurações de infraestrutura para o projeto teste-tecnico-getdemo. O monorepo é organizado em diferentes pastas para facilitar a manutenção, desenvolvimento e deployment das aplicações front-end e back-end, além da infraestrutura necessária.

## Estrutura do Repositório

- **apps/**
  - `frontend/`: Aplicação front-end desenvolvida em React usando Vite.
  - `backend/`: Aplicação back-end desenvolvida em Node.js, utilizando Sequelize como ORM e PostgreSQL como banco de dados.

- **doc/**
  - Documentos de apoio para o desenvolvimento.

- **infra/**
  - `local/`: Arquivos de configuração para rodar a aplicação localmente usando Docker e Docker-Compose.
  - `homolog/`: Configurações para o ambiente de homologação na AWS.
  - `prod/`: Configurações para o ambiente de produção na AWS.

## Tecnologias Utilizadas

- **Front-end:**
  - React com Vite para desenvolvimento rápido e otimizado.
  
- **Back-end:**
  - Node.js com Sequelize como ORM.
  - PostgreSQL como banco de dados relacional.

- **Infraestrutura:**
  - **Docker Compose**: Para gerenciamento de container no desenvolvimento local.
  - **Router53**: Gerenciamento de DNS.
  - **CloudFront**: Distribuição de conteúdo e CDN.
  - **EC2**: Servidores para hospedar as aplicações.
  - **RDS (PostgreSQL)**: Banco de dados relacional gerenciado.
  - **S3**: Armazenamento de arquivos estáticos.

## Como Iniciar o Desenvolvimento

### Pré-requisitos

- Node.js instalado.
- Yarn 1.22.21 instalado.
- Docker e Docker-Compose instalados.

### Configuração Local

1. Clone o repositório

  ```bash
   git clone https://github.com/igorskiter/teste-tecnico-getdemo
   cd teste-tecnico-getdemo
  ```

2. Instale as dependências das aplicações
  
  ```bash
  yarn install
  ```

3. Configure as variáveis de ambiente necessárias em .env na raiz de cada aplicação

- frontend

  ```bash
  cd apps/frontend
  cp .env.example .env
  ```

- backend
  
  ```bash
  cd apps/backend
  cp .env.example .env
  ```

4. Alimentar base de desenvolvimento
  
  ```bash
  cd apps/backend
  yarn infra-dev
  yarn seed
  ```

5. Inicie aplicação
  
  ```bash
  yarn dev
  ```
  
## Estrutura de Commits e Branches

- Utilize o padrão de commits convencionais para manter a consistência nos commits.
- As branches devem seguir a convenção feature/nome-da-feature, bugfix/nome-do-bug, etc.

## Deploy

As configurações de deploy para homologação e produção estão localizadas nas pastas infra/homolog e infra/prod. As stacks incluem configurações para Router53, CloudFront, EC2, RDS, e S3.

1. Homologation
  
  ```bash
  yarn infra-homolog
  ```

2. Production
  
  ```bash
  yarn infra-prod
  ```
