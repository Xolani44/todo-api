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
- PostgreSQL
- Docker & docker-compose

## Run Locally

**Prerequisites:** Docker and Docker Desktop installed

```bash
git clone git@github-personal:Xolani44/todo-api.git
cd todo-api
cp .env.example .env  # add your own credentials
docker compose up --build
```

API runs on `http://127.0.0.1:3000`

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