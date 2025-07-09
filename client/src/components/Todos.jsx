export function Todos({ todos, toggleCompleted, deleteTodo }) {
  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "30px auto",
        display: "flex",
        flexDirection: "column",
        gap: "15px",
      }}
    >
      {todos.map((todo) => (
        <div
          key={todo._id}
          style={{
            padding: "15px",
            borderRadius: "8px",
            backgroundColor: "#ffffff",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            transition: "transform 0.2s",
            ...(todo.completed && {
              backgroundColor: "#e6ffe6",
              textDecoration: "line-through",
              color: "#555",
            }),
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <h3 style={{ margin: "0 0 5px", fontSize: "20px" }}>{todo.title}</h3>
          <p style={{ margin: "0 0 10px", fontSize: "16px" }}>{todo.description}</p>
          <div>
            <button
              onClick={() => toggleCompleted(todo._id)}
              style={{
                padding: "6px 12px",
                borderRadius: "4px",
                border: "none",
                backgroundColor: todo.completed ? "#ff9800" : "#4caf50",
                color: "#fff",
                cursor: "pointer",
                marginRight: "10px",
              }}
            >
              {todo.completed ? "Mark as Incomplete" : "Mark as Completed"}
            </button>
            <button
              onClick={() => deleteTodo(todo._id)}
              style={{
                padding: "6px 12px",
                borderRadius: "4px",
                border: "none",
                backgroundColor: "#f44336",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
