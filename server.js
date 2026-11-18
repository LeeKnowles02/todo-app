// A tiny todo app: add, complete and delete tasks. Tasks are kept in memory, so they reset when the app restarts.
const express = require("express");

const app = express();
app.use(express.urlencoded({ extended: false }));

// Set APP_TITLE in the Capsule's Config tab to change the page title.
const title = process.env.APP_TITLE || "My Todo List";
const tasks = [];
let nextId = 1;

const escape = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

function page() {
  const items = tasks
    .map(
      (t) => `<li class="${t.done ? "done" : ""}">
        <span>${escape(t.text)}</span>
        ${t.done ? "" : `<form method="post" action="/tasks/${t.id}/complete"><button>Done</button></form>`}
        <form method="post" action="/tasks/${t.id}/delete"><button>Delete</button></form>
      </li>`,
    )
    .join("");
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escape(title)}</title>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 32rem; margin: 3rem auto; padding: 0 1rem; }
    li { display: flex; gap: .5rem; align-items: center; margin: .4rem 0; }
    li span { flex: 1; }
    li.done span { text-decoration: line-through; color: #888; }
    form { display: inline; }
  </style>
</head>
<body>
  <h1>${escape(title)}</h1>
  <form method="post" action="/tasks">
    <input name="text" placeholder="What needs doing?" required maxlength="200" aria-label="New task">
    <button>Add Task</button>
  </form>
  <ul>${items || "<li>No tasks yet.</li>"}</ul>
</body>
</html>`;
}

app.get("/", (req, res) => res.send(page()));

app.post("/tasks", (req, res) => {
  const text = (req.body.text || "").trim();
  if (text) {
    tasks.push({ id: nextId++, text, done: false });
    console.log(`Task added: ${text}`);
  }
  res.redirect("/");
});

app.post("/tasks/:id/complete", (req, res) => {
  const task = tasks.find((t) => t.id === Number(req.params.id));
  if (task) {
    task.done = true;
    console.log(`Task completed: ${task.text}`);
  }
  res.redirect("/");
});

app.post("/tasks/:id/delete", (req, res) => {
  const i = tasks.findIndex((t) => t.id === Number(req.params.id));
  if (i >= 0) console.log(`Task deleted: ${tasks.splice(i, 1)[0].text}`);
  res.redirect("/");
});

// Code Capsules sets PORT; 3000 when run locally.
const port = process.env.PORT || 3000;
if (require.main === module) app.listen(port, () => console.log(`Todo app listening on port ${port}`));

module.exports = app;
