import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Main from './Main';
import './App.css';
import { useState, useEffect } from 'react';

function App() {
  // const [click, setClick] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  let stopSecondBtn;

  useEffect(() => {

    const updateTime = () => {
      let date = new Date();
      setHours((d) => date.getHours());
      setMinutes(date.getMinutes());
      setSeconds(date.getSeconds());
    }

    const time = setInterval(() => {
      updateTime();
    }, 1000);

    const stopSecond = () => {
      clearInterval(() => {
        updateTime();
      })
    }

    stopSecondBtn = `<button onClick={()=>stopSecond()}>Stop Seconds</button>`

  });

  return (
    <>
      <h1>Time: {hours}: {minutes}: {seconds} </h1>
      {stopSecondBtn}

      {/* <p>Yo've clicked {click} time!</p>
      <p>The number of times yo've clicked is {click % 2 == 0 ? "Even" : "Odd"} </p>
      <button onClick={() => setClick(click + 1)}>Click me!</button><br></br>

      <button onClick={() => setClick(click + 1)}>Add +</button>

      <button onClick={() => setClick( click != 0 ? click - 1 : click)}>Subtract -</button> */}
      {/* <Header />
      <Main />
      <Footer /> */}
    </>
  );
}

export default App;
