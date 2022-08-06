
import './App.css';
import Header from './MyComponent/Header';
import { Footer } from './MyComponent/Footer';
import { Todos } from './MyComponent/Todos';
import { TodoNew } from './addTodo/TodoNew';
import { useState,useEffect } from 'react';
import { About } from './addTodo/About.js';

import {
  BrowserRouter as Router,
  Switch,
  Route,
 Link
} from "react-router-dom";


function App() {
  let initTodo;
  if(localStorage.getItem("todos")===null)
  {
    initTodo=[];

  }
  else
  {
    initTodo=JSON.parse(localStorage.getItem("todos"));
  }
 const onDelete = (todo) => {
   console.log("I am Delete of ",todo);
   setTodos(todos.filter((e)=>{
    return e!==todo;
   }));
   localStorage.getItem("todos",JSON.stringify(todos));

 }
 const addTodo = (title,desc)=> {
  console.log("i am adding  :", title,desc);
  let sno;
  if(todos.length==0)
  {sno=0;}
  else{
    sno= todos[todos.length-1].sno+1;
  }
  
  const myTodo = {
    sno:sno,
    title:title,
    desc:desc,
  }
  setTodos([...todos,myTodo]);
  console.log(myTodo);
  
   
  
 }
  const [todos,setTodos] = useState(initTodo);
  useEffect(()=>{
    localStorage.setItem("todos",JSON.stringify(todos));
   },[todos])  
  
  return (  
      <>
      <Header title="ToDo List" searchBar={false} /> 
      <Router>
      <Switch>
      <Route exact path="/" render={()=>{
        return(
        <>
        <TodoNew addTodo={addTodo}/>     
      <Todos todos={todos} onDelete={onDelete}/>
        </> 
        )
      }}>           
          </Route>
          <Route path="/about">
            <About />
          </Route>
                   
        </Switch> 
           
      <Footer/>
      </Router>    
      </>
   
  );
}

export default App;
