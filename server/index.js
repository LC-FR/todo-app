const express = require('express');
const { createTodo, updateTodo } = require("./types");
const { Todo } = require("./db");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173" // Vite dev server
}));

// ✅ Add todo
app.post("/todo", async function(req, res) {
  const parsedPayload = createTodo.safeParse(req.body);
  if (!parsedPayload.success) {
    return res.status(411).json({ msg: "Invalid inputs" });
  }
  await Todo.create({
    title: req.body.title,
    description: req.body.description,
    completed: false
  });
  res.json({ msg: "Todo created" });
});

// ✅ Get all todos
app.get("/todos", async function(req, res) {
  const todos = await Todo.find({});
  res.json({ todos });
});

// ✅ Toggle completed / incomplete
app.post("/toggle", async function(req, res) {
  const { id } = req.body;
  const todo = await Todo.findById(id);
  if (!todo) {
    return res.status(404).json({ msg: "Todo not found" });
  }
  todo.completed = !todo.completed;
  await todo.save();
  res.json({ msg: `Todo marked as ${todo.completed ? "completed" : "incomplete"}` });
});

// ✅ Delete a todo
app.post("/delete", async function(req, res) {
  const { id } = req.body;
  await Todo.findByIdAndDelete(id);
  res.json({ msg: "Todo deleted" });
});

app.listen(3001, () => {
  console.log("✅ Server running on port 3001");
});
