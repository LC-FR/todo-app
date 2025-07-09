const zod = require("zod");

const createTodo = zod.object({
  title: zod.string(),
  description: zod.string().min(1)   // ✅ must specify min length!
});

const updateTodo = zod.object({
  id: zod.string(),
});

// ✅ Correct: module.exports (not module.export)
module.exports = {
  createTodo,
  updateTodo
};
