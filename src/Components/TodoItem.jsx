import React from "react";

export const TodoItem = ({todo,toggleStar,toggleCompleted,editItem,onDelete}) => {
  return (
    <div className={`main-todo ${todo.completed && "todo-completed"}`}>
      <div className="todo-container">
        
        <h3 className="todo-title">{todo.title}</h3>
        <button
          className={`star-btn ${todo.completed && "todo-completed"}`}
          title="mark important"
          onClick={() => toggleStar(todo.id)}
        >
          {todo.isStarred ? (
            <i class="fa-solid fa-star"></i>
          ) : (
            <i class="fa-regular fa-star"></i>
          )}
        </button>
        <button
          className={`completed-btn ${todo.completed && "todo-completed"}`}
          title="mark completed"
          onClick={() => toggleCompleted(todo.id)}
        >
          {todo.completed ? (
            <i class="fa-solid fa-circle-check"></i>
          ) : (
            <i class="fa-regular fa-circle-check"></i>
          )}
        </button>
        <button
          className={`edit-btn ${todo.completed && "todo-completed"}`}
          title="edit"
          onClick={() => editItem(todo.id)}
        >
          <i class="fa-solid fa-pen"></i>
        </button>
        <button
          className={`delete-btn ${todo.completed && "todo-completed"}`}
          title="delete"
          onClick={() => onDelete(todo.id)}
        >
          <i class="fa-sharp fa-solid fa-xmark"></i>
        </button>
      </div>
      
      <p className="duedate-text">Due Date : {todo.dueDate}</p>
    </div>
  );
};
