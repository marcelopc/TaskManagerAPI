```markdown
# TaskManagerAPI

TaskManagerAPI is a backend application for task management that utilizes MongoDB as the database. This project allows users to create, track, and manage their daily tasks, providing features such as user registration, authentication, task creation, status updates, task assignment to specific users, and task search.

## Technologies Used

- Node.js
- Express.js
- Docker
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)

## Prerequisites

Make sure you have Docker installed on your machine. You can download Docker at: [https://www.docker.com/get-started](https://www.docker.com/get-started)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/task-manager-api.git
```

2. Navigate to the project directory:

```bash
cd task-manager-api
```

3. Start MongoDB using Docker Compose:

```bash
docker-compose up -d
```

This will create a Docker container with MongoDB running.

4. Install project dependencies:

```bash
npm install
```

5. Create an `.env` file in the project root directory and define the following environment variables:

```bash
PORT=3000
MONGODB_URI=mongodb://localhost:27017/task-manager
JWT_SECRET=<your-jwt-secret-key>
```

Make sure to replace `<your-jwt-secret-key>` with your desired secret key for JWT token generation.

6. Start the server locally:

```bash
npm start
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## API Endpoints

- `POST /api/register`: Register a new user.
- `POST /api/login`: Perform user login and return a JWT token.
- `GET /api/tasks`: Retrieve all tasks for the authenticated user.
- `POST /api/tasks`: Create a new task.
- `PUT /api/tasks/:taskId`: Update the status of a task.
- `PUT /api/tasks/:taskId/assign/:userId`: Assign a task to a specific user.
- `GET /api/tasks/search`: Search for tasks based on criteria.

Refer to the complete API documentation in the `API.md` file.

## Contribution

Contributions are welcome! If you encounter any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
```
