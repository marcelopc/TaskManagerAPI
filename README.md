# TaskManagerAPI

TaskManagerAPI é uma aplicação backend para gerenciamento de tarefas que utiliza o MongoDB como banco de dados. Este projeto permite que os usuários criem, acompanhem e gerenciem suas tarefas diárias, fornecendo recursos como registro de usuários, autenticação, criação de tarefas, atualização de status, atribuição de tarefas a usuários específicos e pesquisa de tarefas.

## Tecnologias Utilizadas

- Node.js
- Express.js
- Docker
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)

## Pré-requisitos

Certifique-se de ter o Docker instalado em sua máquina. Você pode baixar o Docker em: [https://www.docker.com/get-started](https://www.docker.com/get-started)

## Instalação

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/task-manager-api.git
```

2. Acesse o diretório do projeto:

```bash
cd task-manager-api
```

3. Inicie o MongoDB usando o Docker Compose:

```bash
docker-compose up -d
```

Isso criará um contêiner Docker com o MongoDB em execução.

4. Instale as dependências do projeto:

```bash
npm install
```

5. Crie um arquivo `.env` no diretório raiz do projeto e defina as seguintes variáveis de ambiente:

```bash
DB_HOST="172.19.0.2"
DB_PORT="27017"
DB_NAME="taskmanager"
DB_USER="root"
DB_PASS="12345678"
MONGO_URI=mongodb://$DB_USER:$DB_PASS@$DB_HOST:$DB_PORT/$DB_NAME?authSource=admin
PORT="3000"
```

Certifique-se de substituir `<sua-chave-secreta-jwt>` pela sua chave secreta desejada para geração de tokens JWT.

6. Inicie o servidor localmente:

```bash
npm start
```

A aplicação estará disponível em [http://localhost:3000](http://localhost:3000).

## Endpoints da API

- `POST /api/register`: Registra um novo usuário.
- `POST /api/login`: Realiza o login do usuário e retorna um token JWT.
- `GET /api/tasks`: Recupera todas as tarefas do usuário autenticado.
- `POST /api/tasks`: Cria uma nova tarefa.
- `PUT /api/tasks/:taskId`: Atualiza o status de uma tarefa.
- `PUT /api/tasks/:taskId/assign/:userId`: Atribui uma tarefa a um usuário específico.
- `GET /api/tasks/search`: Pesquisa tarefas com base em critérios.

Consulte a documentação completa da API no arquivo `API.md`.

## Contribuição

Contribuições são bem-vindas! Se você encontrar algum problema ou tiver sugestões de melhorias, abra uma issue ou envie um pull request.

## Licença

Este projeto está licenciado sob a [Licença MIT](https://opensource.org/licenses/MIT).
