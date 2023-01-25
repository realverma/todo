import React from 'react'

export const FilterButtons = ({filter,filterTasks  }) => {


  return (
    <div className="filter">
        <button
          data-filter="all"
          className={`filter-all ${filter === "all" && "active"}`}
          onClick={filterTasks}
        >
          All
        </button>
        <button
          data-filter="completed"
          className={`filter-completed ${filter === "completed" && "active"}`}
          onClick={filterTasks}
        >
          <i class="fa-solid fa-circle-check"></i> Completed
        </button>
        <button
          data-filter="uncompleted"
          className={`filter-uncompleted ${
            filter === "uncompleted" && "active"
          }`}
          onClick={filterTasks}
        >
          <i class="fa-regular fa-circle-check"></i> Uncompleted
        </button>
        <button
          data-filter="starred"
          className={`filter-starred ${filter === "starred" && "active"}`}
          onClick={filterTasks}
        >
          <i class="fa-solid fa-star"></i> Starred
        </button>
      </div>
  )
}
