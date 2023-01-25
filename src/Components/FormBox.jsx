import React from 'react'

export const FormBox = ({handleSubmit,setInputData,setDueDate, inputData, dueDate,toggleButton }) => {
  return (
    <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Finish my homework..."
          value={inputData}
          onChange={(event) => setInputData(event.target.value)}
        />
        <input
          type="date"
          value={dueDate}
          onChange={(event) => setDueDate(event.target.value)}
          min={new Date().toISOString().split("T")[0]}
        />

        <button className="add-btn">{toggleButton ? "Update" : "Add"}</button>
      </form>
  )
}
