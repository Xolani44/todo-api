# Todo API

A REST API built with Node.js, Express, and PostgreSQL — containerized with Docker.

## Purpose

Built to understand how REST APIs work from scratch — how HTTP methods
map to actions, how data flows between a client and a server, and how
to structure a Node.js backend project with a real persistent database.

## Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /todos | Get all todos |
| GET | /todos/:id | Get a single todo |
| POST | /todos | Create a new todo |
| PATCH | /todos/:id | Update a todo |
| DELETE | /todos/:id | Delete a todo |

## Tech Stack

- Node.js
- Express
- PostgreSQL 15
- Docker & docker-compose

## Run Locally

**Prerequisites:** Docker and Docker Desktop installed

```bash
git clone https://github.com/Xolani44/todo-api.git
cd todo-api
```

**Set up environment variables:**

Copy `.env.example` to `.env` and fill in your credentials:

```bash
cp .env.example .env
```

On Windows (if `cp` doesn't work), manually duplicate `.env.example`,
rename it to `.env`, and update the values. See `.env.example` for 
all required variables.

**Start the containers:**

```bash
docker compose up --build
```

API runs on `http://127.0.0.1:3000`

To test the endpoints, use a tool like [Postman](https://www.postman.com/downloads)
or any HTTP client. Visiting `http://127.0.0.1:3000` in a browser will just
confirm the server is running.

## Example Requests

**Create a todo:**
```json
POST /todos
Content-Type: application/json

{
  "title": "Learn Docker"
}
```

**Expected response (`201 Created`):**
```json
{
  "id": 1,
  "title": "Learn Docker",
  "completed": false,
  "created_at": "2026-06-24T07:42:34.165Z"
}
```

**Update a todo:**
```json
PATCH /todos/1
Content-Type: application/json

{
  "completed": true
}
```

**Delete a todo:**
```json
DELETE /todos/1
```

## Decisions & Trade-offs

- Started with in-memory storage to focus on API structure first,
  then migrated to PostgreSQL for real persistence
- PostgreSQL runs as a separate container — keeping the database
  and API concerns isolated
- Credentials managed via `.env` file — never committed to GitHub
- Used CommonJS (`require`) over ES Modules since Node defaults to it
- Used parameterized queries (`$1, $2`) to prevent SQL injection

## What I'd Improve

- Add input validation (reject requests missing a title)
- Add error handling middleware
- Write automated tests
- Add a volume to docker-compose for PostgreSQL data persistence
  across container rebuilds