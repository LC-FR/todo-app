const mongoose = require("mongoose");

// ✅ Correct URI — no `/users` at the end
mongoose.connect(
    "mongodb+srv://LCFR:348926744@cluster0.inji65k.mongodb.net/todo"
  ).then(() => {
    console.log("✅ Connected to MongoDB Atlas");
  }).catch((err) => {
    console.error("❌ Connection error:", err);
  });
  

const todoSchema = new mongoose.Schema({
  title: String,
  description: String,
  completed: {
    type: Boolean,
    default: false
  }
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = {
  Todo
};
