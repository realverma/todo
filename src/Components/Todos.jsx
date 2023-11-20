import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { TodoItem } from "./TodoItem";
import { FormBox } from "./FormBox";
import { FilterButtons } from "./FilterButtons";
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

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


  let filtered = [...items];
  switch (filter) {
    case "all":
      filtered = [...items];
      break;
    case "completed":
      filtered = items.filter((item) => item.completed);
      break;
    case "uncompleted":
      filtered = items.filter((item) => !item.completed);
      break;
    case "starred":
      filtered = items.filter((item) => item.isStarred);
      break;
    default:
      filtered = [...items];
      break;
  }

  // Handle Drag and Drop
  const handleDragDrop = (result) => {
    const {destination,source,type} = result;
    if(!destination){
      return;
    }
    if(source.droppableId===destination.droppableId && destination.index === source.index){
      return;
    }
    if(type === 'group'){
      const newItems = [...items];
      const sourceIndex = source.index;
      const destinationIndex = destination.index;

    const [removed] = newItems.splice(sourceIndex, 1);
    newItems.splice(destinationIndex, 0, removed);

    return setItems(newItems);
  }
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
      <DragDropContext onDragEnd={handleDragDrop}>
      <div className="todo-wrapper">
        <Droppable droppableId="todos" type="group">
        {(provided)=>(
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {filtered.map((todo,index) => {
              return (
                <Draggable key={todo.id} draggableId={todo.id} index={index}>
                {(provided)=>(
                  <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    <TodoItem
                      key={todo.id}
                      todo={todo}
                      toggleStar={toggleStar}
                      toggleCompleted={toggleCompleted}
                      editItem={editItem}
                      onDelete={onDelete}
                    />
                  </div>
                )}
                </Draggable>
              );
            })}
          </div>
        )}
        </Droppable>
      </div>
      </DragDropContext>
    </div>
  );
}
