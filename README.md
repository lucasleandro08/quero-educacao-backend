# Quero Educação - Sistema de Consulta de Ofertas
Um sistema web para consulta e filtro de ofertas de bolsa de estudo, desenvolvido como desafio técnico.
## Tecnologias Utilizadas
### Backend
- Node.js
- TypeScript
- Express.js
- Vitest (testes)
### Frontend
- React 18
- TypeScript
- Vite
- CSS3
## Pré-requisitos
- Node.js 18.0.0 ou superior
- npm 8.0.0 ou superior
## Instalação e Execução
### 1. Clone o repositório
git clone https://ithub.com/lucasleandro08/quero-educacao-backend.git <br>
cd quero-educacao-backend <br>
### 2. Instale as dependências
npm run install:all
### 3. Execute o projeto
npm run dev <br>
Este comando iniciará simultaneamente:
- Backend: http://localhost:3000
- Frontend: http://localhost:5173
### Comandos Disponíveis

#### Raiz do projeto
- `npm run dev` - Executa backend e frontend simultaneamente
- `npm run install:all` - Instala dependências de todos os módulos
- `npm run build` - Gera build de produção
- `npm test` - Executa testes do backend

#### Backend (na pasta /backend)
- `npm run dev` - Executa servidor em modo desenvolvimento
- `npm run build` - Gera build de produção
- `npm test` - Executa testes unitários
- `npm start` - Executa servidor em modo produção

#### Frontend (na pasta /frontend)
- `npm run dev` - Executa aplicação em modo desenvolvimento
- `npm run build` - Gera build de produção
- `npm run preview` - Executa preview do build

### Testes
O teste não faz parte do processo seletivo, porém eu quis usar eles para testar a funcionalidade do programa antes de fazer o frontend.
