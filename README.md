# Todo App

A tiny todo app used to test documentation against the Code Capsules dashboard. Add a task, mark it done, delete it. Tasks are kept in memory, so they reset when the app restarts.

## Run locally

```bash
npm install
npm start
```

Open http://localhost:3000.

## Deploy

Deploy it as a Backend Capsule on Code Capsules: the build runs `npm install` and `npm start`, and the app listens on the `PORT` Code Capsules provides.

## Settings

| Environment variable | What it does | Default |
|---|---|---|
| `APP_TITLE` | The title at the top of the page | My Todo List |

## Logs

The app logs each change: `Task added: …`, `Task completed: …`, `Task deleted: …`.
