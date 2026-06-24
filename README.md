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

- Node.js 18
- Express — HTTP routing and middleware
- PostgreSQL 15 — persistent relational database
- `pg` (node-postgres) — PostgreSQL client for Node.js
- `dotenv` — loads environment variables from `.env`
- Docker & docker-compose — containerization and local dev setup

## Prerequisites

Before running this project, make sure you have the following installed:

- [Docker Desktop](https://www.docker.com/products/docker-desktop) — required to run the containers
- [Postman](https://www.postman.com/downloads) — or any HTTP client to test the API
- Git — to clone the repository

You do **not** need Node.js or PostgreSQL installed locally — Docker handles both.

## Run Locally

**1. Clone the repository:**

```bash
git clone https://github.com/Xolani44/todo-api.git
cd todo-api
```

**2. Set up environment variables:**

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

On Windows (if `cp` doesn't work), manually duplicate `.env.example`,
rename it to `.env`. Open it and fill in your credentials — see 
`.env.example` for all required variables and what they mean.

**3. Start the containers:**

```bash
docker compose up --build
```

This will:
- Build the Node.js API image
- Pull and start a PostgreSQL 15 container
- Automatically create the `todos` table via `init.sql`
- Start the API server

**4. Confirm it's running:**

Visit `http://127.0.0.1:3000` in your browser — you should see:


```
Todo API is running
```
**5. Test the endpoints:**

Use [Postman](https://www.postman.com/downloads) or any HTTP client.
Set the base URL to `http://127.0.0.1:3000`.

## Example Requests

**Create a todo:**

```json
POST /todos
Content-Type: application/json

{
  "title": "Learn Docker"
}
```

Expected response (`201 Created`):

```json
{
  "id": 1,
  "title": "Learn Docker",
  "completed": false,
  "created_at": "2026-06-24T07:42:34.165Z"
}
```

**Get all todos:**

```json
GET /todos
```

**Get a single todo:**

```json
GET /todos/1
```

**Update a todo (partial update — only send fields you want to change):**

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

Returns `204 No Content` on success.

## Project Structure

todo-api/

├── index.js          # Express server and route handlers

├── db.js             # PostgreSQL connection pool

├── init.sql          # Database schema — runs on first container start

├── Dockerfile        # Builds the Node.js app image

├── docker-compose.yml # Defines API and database containers

├── .env.example      # Environment variable template

└── package.json      # Project dependencies and scripts

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
- Add a named volume to docker-compose for PostgreSQL data persistence
  across container rebuilds