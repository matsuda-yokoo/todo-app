import React,{useEffect, useState} from "react";
import TodoItem from "./TodoItem";
import AddTodoForm from "./AddTodoForm";
import EditForm from "./EditForm";

const App=()=>{
  const [todos,setTodos] = useState(()=>{
    const savedTodos = localStorage.getItem("todos");
    if(savedTodos){
      return JSON.parse(savedTodos);
    }else{
      return[];
    }
  });
  const [todo,setTodo] = useState("");
  const [isEditing,setIsEditing] = useState(false); //最初は編集状態ではない(=false)
  const [currentTodo,setCurrentTodo] = useState({});

  useEffect(()=>{
    localStorage.setItem("todos",JSON.stringify(todos));
  },[todos]);

  const handleAddInputChange=(e)=>{
    setTodo(e.target.value);
  };

    //編集機能
  const handleEditInputChange = (e)=>{
      //入力されたテキストに変更する
      setCurrentTodo({...currentTodo,text:e.target.value});
      console.log(currentTodo);
  }

  const handleAddFormSubmit=(e)=>{
    e.preventDefault(); //ブラウザのデフォルトの動作(=リロード)をしない

    //何らかの文字が入力されたら、配列todosに追加する
    if(todo !== ""){
      setTodos([
        ...todos,{id:todos.length + 1,text:todo.trim()} //最後尾のidを付加、不要なスペースを除去
      ]);
    }
    setTodo(""); //入力欄を空欄に戻す
  }

    //フォーム送信時にtodoを更新する
  const handleEditFormSubmit = (e)=>{
      e.preventDefault();
      handleUpdateTodo(currentTodo.id,currentTodo);
  }

  //削除機能
  const handleDeleteClick=(id)=>{
    //渡したidに一致しないidを持つtodoのみの配列を返す(=渡したidのtodoのみ削除)
    const removeItem = todos.filter((todo)=>{
      return todo.id !== id;
    })
    setTodos(removeItem); 
  }

    //更新されたテキストをtodosに追加する
  const handleUpdateTodo = (id,updatedTodo)=>{
    const updatedItem = todos.map((todo)=>{
      return todo.id === id ? updatedTodo : todo;
    });
    setIsEditing(false); //編集状態を終了
    setTodos(updatedItem) //todosを更新
  }

  //編集ボタンをクリックしたときのイベントハンドラ
  const handleEditClick=(todo)=>{
    setIsEditing(true); //編集状態になる
    setCurrentTodo({...todo}); //編集するtodoをセットする
  }

  return (
  <div className="App">
    {/* 編集中かどうかをまず判断する */}
    {isEditing ? (
      // todo編集フォーム
      <EditForm
      currentTodo={currentTodo}
      setIsEditing={setIsEditing}
      onEditInputChange={handleEditInputChange}
      onEditFormSubmit={handleEditFormSubmit}
      />
    ):(
      // todo追加フォーム
      <AddTodoForm
      todo={todo}
      onAddInputChange={handleAddInputChange}
      onAddFormSubmit={handleAddFormSubmit}
      />
    )}

    {/* 入力されたtodoをリスト表示する */}
    <ul className="todo-list">
        {todos.map((todo)=>{
          return (
          <TodoItem
            todo={todo}
            onHandleEditClick={handleEditClick}
            onHandleDeleteClick={handleDeleteClick}
            />
          )
          })}
    </ul>
  </div>
  );
};

export default App;
