// import Header from './components/header/Header';
// import Footer from './components/footer/Footer';
// import Main from './Main';
// import './App.css';
// import { useState, useEffect } from 'react';
// import SignIn from './components/login/Login';
// import { Route, Routes } from 'react-router-dom';
// import Signup from './components/signup/Signup';

// function App() {
//   // const [click, setClick] = useState(0);
//   // const [hours, setHours] = useState(0);
//   // const [minutes, setMinutes] = useState(0);
//   // const [seconds, setSeconds] = useState(0);
//   // let stopSecondBtn;

//   // useEffect(() => {

//   //   const updateTime = () => {
//   //     let date = new Date();
//   //     setHours((d) => date.getHours());
//   //     setMinutes(date.getMinutes());
//   //     setSeconds(date.getSeconds());
//   //   }

//   //   const time = setInterval(() => {
//   //     updateTime();
//   //   }, 1000);

//   //   const stopSecond = () => {
//   //     clearInterval(() => {
//   //       updateTime();
//   //     })
//   //   }

//   //   stopSecondBtn = `<button onClick={()=>stopSecond()}>Stop Seconds</button>`

//   // });

//   return (
//     <>
//     <Header />
//     <Routes>
//       <Route path="/" element={<Signup />}/>
//       <Route path="/sign-in" element={<SignIn />}/>
//     </Routes>
//       {/* <h1>Time: {hours}: {minutes}: {seconds} </h1>
//       {stopSecondBtn} */}

//       {/* <p>Yo've clicked {click} time!</p>
//       <p>The number of times yo've clicked is {click % 2 == 0 ? "Even" : "Odd"} </p>
//       <button onClick={() => setClick(click + 1)}>Click me!</button><br></br>

//       <button onClick={() => setClick(click + 1)}>Add +</button>

//       <button onClick={() => setClick( click != 0 ? click - 1 : click)}>Subtract -</button> */}
//       {/* <Header />
//       <Main />
//       <Footer /> */}
//     </>
//   );
// }

// export default App;



import React from 'react'
import './App.css'
import { useState } from 'react'

export default function App() {
  const [todoList, setTodoList] =useState([])
const saveTodoList = (event) =>{
const toname = event.target.toname.value;

if(toname.includes(toname)){ 

const finalTodoList = [...todoList, toname];
setTodoList(finalTodoList)
}
else{
  alert(`Todo already add", ${toname} `);
}
event.preventDefault();
}
const list = todoList.map((value,index)=>{

return(
  <TodoListItem  value={value}/>
)}
)
  return (
    <>
  <h1>ToDo App</h1>
  <div>
    <form onSubmit={saveTodoList}>
    <input type="text" name='toname' placeholder="Add a new task" />
    <button>Add Task</button>
    </form>
    <div className='todo-list'>
    <ul>
      {list}
    </ul> 
    </div>



  </div>
  </>
  )
}

function TodoListItem(props) {
  return(
    <li>{props.value} <span>&times;</span></li>
  )
}