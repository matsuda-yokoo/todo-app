import React from "react";

const AddTodoForm = ({todo,onAddFormSubmit,onAddInputChange})=>{
    return (
        <form onSubmit={onAddFormSubmit}>
          <h2>Add Todo</h2>
          <label htmlFor="todo">Create todo:</label>
          <input 
            name="todo"
            type="text"
            placeholder="Create a new todo"
            value={todo}
            onChange={onAddInputChange} 
          />
          <button type="submit" onClick={onAddFormSubmit}>Add</button>
        </form>
    )
}

export default AddTodoForm;