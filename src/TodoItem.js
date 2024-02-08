import React from "react";

const TodoItem =({todo,onHandleEditClick,onHandleDeleteClick})=>{
    return (
        <li key={todo.id}>
            {todo.text}
          <button onClick={()=>onHandleEditClick(todo)}>Edit</button>
          <button onClick={()=>onHandleDeleteClick(todo.id)}>X</button>
        </li>
    )
}

export default TodoItem;