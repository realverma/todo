import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { TodoItem } from "./TodoItem";
import { FormBox } from "./FormBox";
import { FilterButtons } from "./FilterButtons";

export default function Todos() {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(
    () => JSON.parse(localStorage.getItem("myitems")) || []
  );
  const [isEditItem, setIsEditItem] = useState("");
  const [toggleButton, setToggleButton] = useState(false);
  const [filter, setFilter] = useState("all");
  const [dueDate, setDueDate] = useState("");

  //Local Storage
  useEffect(() => {
    localStorage.setItem("myitems", JSON.stringify(items));
  }, [items]);

  //SUBMIT BUTTON HANDLING
  function handleSubmit(event) {
    event.preventDefault();
    if (!inputData) {
      // When User does not enter anything
      alert("Title cannot be empty");
    } else if (inputData && toggleButton) {
      // when user edit a todo item
      setItems(
        items.map((curElem) => {
          if (curElem.id === isEditItem) {
            return {
              ...curElem,
              title: inputData,
              time: new Date().toLocaleString(),
              dueDate: dueDate,
            };
          }
          return curElem;
        })
      );
      setInputData("");
      setDueDate("");
      setIsEditItem(null);
      setToggleButton(false);
    } else {
      // when user add a todo item
      const myNewInputData = {
        id: nanoid(),
        title: inputData,
        time: new Date().toLocaleString(),
        isStarred: false,
        completed: false,
        dueDate: dueDate,
      };
      setItems((previtems) => {
        return [...previtems, myNewInputData];
      });
      setInputData("");
      setDueDate("");
    }
  }

  // Sorted items
  const sortedItems = [...items];
  sortedItems.sort((a, b) => new Date(b.time) - new Date(a.time));

  //Edit the item
  function editItem(index) {
    const item_edited = items.find((curElem) => {
      return curElem.id === index;
    });
    setInputData(item_edited.title);
    setIsEditItem(index);
    setToggleButton(true);
  }

  // Function to delete todo item
  const onDelete = (id) => {
    const updatedItems = items.filter((curElem) => {
      return curElem.id !== id;
    });
    setItems(updatedItems);
  };

  // Function to Toggle Star
  function toggleStar(index) {
    setItems(
      items.map((item) =>
        item.id === index ? { ...item, isStarred: !item.isStarred } : item
      )
    );
  }

  //Function to (Un)Complete an Item
  function toggleCompleted(index) {
    setItems(
      items.map((item) =>
        item.id === index ? { ...item, completed: !item.completed } : item
      )
    );
  }

  //Filter the Todos Based on All, Completed, Due, Starred
  const filterTasks = (event) => {
    setFilter(event.target.dataset["filter"]);
  };
  let filtered = [...sortedItems];
  switch (filter) {
    case "all":
      filtered = [...sortedItems];
      break;
    case "completed":
      filtered = sortedItems.filter((item) => item.completed);
      break;
    case "uncompleted":
      filtered = sortedItems.filter((item) => !item.completed);
      break;
    case "starred":
      filtered = sortedItems.filter((item) => item.isStarred);
      break;
    default:
      filtered = [...sortedItems];
      break;
  }

  return (
    <div className="container">
      <h2>
        Todo List
        <img
          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-todo-list/check1.webp"
          alt="task"
          className="titleimg"
        ></img>
      </h2>

      <FormBox
        handleSubmit={handleSubmit}
        setInputData={setInputData}
        setDueDate={setDueDate}
        inputData={inputData}
        dueDate={dueDate}
        toggleButton={toggleButton}
      />

      <FilterButtons filterTasks={filterTasks} filter={filter} />
      <div className="todo-wrapper">
        {filtered.map((todo) => {
          return (
            <TodoItem
              todo={todo}
              onDelete={onDelete}
              key={todo.id}
              toggleStar={toggleStar}
              toggleCompleted={toggleCompleted}
              editItem={editItem}
            />
          );
        })}
      </div>
    </div>
  );
}
