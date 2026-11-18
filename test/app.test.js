const { test } = require("node:test");
const assert = require("node:assert");
const app = require("../server");

test("add, complete and delete a task", async () => {
  const server = app.listen(0);
  const base = `http://localhost:${server.address().port}`;
  const post = (path, body) => fetch(base + path, { method: "POST", body: new URLSearchParams(body), redirect: "manual" });
  try {
    assert.match(await (await fetch(base)).text(), /No tasks yet/);
    await post("/tasks", { text: "Buy milk" });
    assert.match(await (await fetch(base)).text(), /Buy milk/);
    await post("/tasks/1/complete", {});
    assert.match(await (await fetch(base)).text(), /class="done"/);
    await post("/tasks/1/delete", {});
    assert.match(await (await fetch(base)).text(), /No tasks yet/);
  } finally {
    server.close();
  }
});
