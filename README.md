# Task Manager (NestJS + Nuxt 3)

Small simple task list API (NestJS + MongoDB) and a Nuxt 3 UI for viewing and adding tasks.

## Project layout

- `backend/` — NestJS application with `/tasks` GET/POST endpoints using Mongoose
- `frontend/` — Nuxt 3 single-page UI that proxies API calls through Nitro routes
- `docker-compose.yml` — orchestrates MongoDB, backend, and frontend services

## Getting started

### Local development

```bash
# Backend
cd backend
npm install
npm run start:dev

# Frontend (new terminal)
cd frontend
npm install
npm run dev
```

Backend defaults to `http://localhost:3000`, frontend dev server runs on
`http://localhost:3000` by default (Nuxt). Update `NUXT_PUBLIC_BACKEND_URL`
if you change ports.

### Using Docker Compose

```bash
docker compose up --build
```

Services:
- `mongodb` on port `27017`
- `backend` on `http://localhost:3000`
- `frontend` on `http://localhost:3001`

## Environment variables

- `backend` reads `MONGO_URL` (defaults to `mongodb://localhost:27017/tasks`)
- `frontend` reads `NUXT_PUBLIC_BACKEND_URL` (defaults to `http://localhost:3000`)

## Testing the API

Once the stack is running, you can hit:

```bash
curl http://localhost:3000/tasks
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Demo task"}'
```

Then refresh the frontend page to see updates.
