# Todo API

A REST API built with Node.js and Express.

## Purpose

Built to understand how REST APIs work from scratch — how HTTP methods 
map to actions, how data flows between a client and a server, and how 
to structure a Node.js backend project.

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

## Run Locally

**Prerequisites:** Node.js installed

```bash
git clone git@github-personal:Xolani44/todo-api.git
cd todo-api
npm install
npm start
```

API runs on `http://localhost:3000`

## Decisions & Trade-offs

- Used in-memory storage intentionally — keeping focus on API 
  structure before introducing a database
- Used CommonJS (`require`) over ES Modules since Node defaults to it

## What I'd Improve

- Add a real database (PostgreSQL or MongoDB)
- Add input validation (reject requests missing a title)
- Add error handling middleware
- Write automated tests