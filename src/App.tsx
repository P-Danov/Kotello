import React, {FormEvent, useState} from 'react';
import './App.css';
import InputField from './components/InputField';
import TodoList from './components/TodoList';
import { Todo, User } from './model';
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { log } from 'console';
// import Job from './components/Job';
// import Button from './components/Button';



const App: React.FC = () => {
  const [todo,setTodo] = useState<string>('')
  const [todos,setTodos] = useState<Todo[]>([])
  const [counter,setCounter] = useState<number>(0)
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([])

  const users:User[] = [{name:'mike',age:23},{name:'joe',age:53},{name:'troll',age:32}]
  
  
  const handleAdd = (e:React.FormEvent) =>{
    e.preventDefault()
    if(todo){
      setTodos([...todos,{id:Date.now(),todo:todo,isDone:false}])
      setTodo("")
    }
  }
  // const incerement = () => {
  //   setCounter(counter+1)
  // }
  // const decrement = () => {
  //   setCounter(counter-1)
  // }
  // const toZero = () => {
  //   setCounter(0)
  // }

  const onDragEnd = (result: DropResult) =>{
    const { destination,source } = result

    if (!destination){
      return;
    } 
    if (destination.droppableId === source.droppableId &&
        destination.index === source.index
      ) {
        return;
      }

      let add;
      let active = todos
      let complete = completedTodos

      if (source.droppableId === "TodosList") {
        add = active[source.index];
        active.splice(source.index, 1);
      } else {
        add = complete[source.index];
        complete.splice(source.index, 1);
      }

      if (destination.droppableId === "TodosList" ){
        active.splice(destination.index,0,add)
      }else{
        complete.splice(destination.index,0,add)
      }
      setCompletedTodos(complete)
      setTodos(active)

      
  }

  console.log(todos)
  return (
    <DragDropContext onDragEnd={onDragEnd}>
    <div className="App">
      <span className='heading'>Kotify</span>
      <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd}/>
      <TodoList 
        todos={todos} 
        setTodos={setTodos}
        completedTodos={completedTodos}
        setCompletedTodos={setCompletedTodos} />

      {/* <Button text="Increment" action={incerement} setCounter={setCounter} counter={counter}/>
      <Button text="Decrement" action={decrement} setCounter={setCounter} counter={counter}/>
      <Button text="Set to 0" action={toZero} setCounter={setCounter} counter={counter}/> */}

      {/* <Job salary={99999} position="Junior SDE"/>
      <Job salary={195656} position="Senior SDE"/> */}
      {/* {users.map((user,key)=>
        <h2>{key+1}. Name: {user.name} Age: {user.age}</h2>
      )} */}
      
      {/* <p>{counter}</p>
      <button onClick={()=>{setCounter(counter+1)}}>Click ME</button> */}
    </div>
    </DragDropContext>
  );
}

export default App;
