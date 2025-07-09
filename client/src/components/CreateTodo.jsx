import { useState } from "react";

export function CreateTodo({ onAdd }) {
  // ✅ State for form fields
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "300px",
        margin: "20px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        backgroundColor: "#fff",
        boxShadow: "0 0 8px rgba(0,0,0,0.1)"
      }}
    >
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => settitle(e.target.value)}
        style={{
          padding: "8px",
          marginBottom: "10px",
          borderRadius: "4px",
          border: "1px solid #ccc",
          fontSize: "16px"
        }}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setdescription(e.target.value)}
        style={{
          padding: "8px",
          marginBottom: "10px",
          borderRadius: "4px",
          border: "1px solid #ccc",
          fontSize: "16px"
        }}
      />
      <button
        onClick={() => {
          fetch("http://localhost:3001/todo", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              title: title,
              description: description
            })
          })
            .then(async (res) => {
              const json = await res.json();
              alert("✅ Todo added!");
              settitle("");         // ✅ Clear fields
              setdescription("");
              onAdd();              // ✅ Refresh list in parent
            })
            .catch((err) => {
              console.error(err);
              alert("❌ Error adding todo");
            });
        }}
        style={{
          padding: "10px",
          borderRadius: "4px",
          border: "none",
          backgroundColor: "#007bff",
          color: "#fff",
          fontSize: "16px",
          cursor: "pointer"
        }}
      >
        Add a todo
      </button>
    </div>
  );
}
