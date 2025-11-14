import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { addNumber } from "./features/tod/todoSlice";

const TodoList = () => {

  const [newTask, setNewTask] = useState('');
  const calcTotal = useSelector(state => state.calcState.total);
  const dispatch = useDispatch();


  return (
    <div className="calculator">
      <input type="text" id="display" className="display" disabled value={calcTotal} />
      <div className="buttons">
        <button className="clear" onClick={() => clearDisplay()}>AC</button>
        <button className="operation" onClick={() => appendOperator('**')}>^</button>
        <button className="operation" onClick={() => appendOperator('Math.sqrt(')}>√</button>
        <button className="operation" onClick={() => appendOperator('/')}>/</button>
        <button className="number" onClick={() => dispatch(addNumber(7))}>7</button>
        <button className="number" onClick={() => dispatch(addNumber(8))}>8</button>
        <button className="number" onClick={() => dispatch(addNumber(9))}>9</button>
        <button className="operation" onClick={() => appendOperator('*')}>*</button>
        <button className="number" onClick={() => dispatch(addNumber(4))}>4</button>
        <button className="number" onClick={() => dispatch(addNumber(5))}>5</button>
        <button className="number" onClick={() => dispatch(addNumber(6))}>6</button>
        <button className="operation" onClick={() => appendOperator('-')}>-</button>
        <button className="number" onClick={() => dispatch(addNumber(1))}>1</button>
        <button className="number" onClick={() => dispatch(addNumber(2))}>2</button>
        <button className="number" onClick={() => dispatch(addNumber(3))}>3</button>
        <button className="operation" onClick={() => appendOperator('+')}>+</button>
        <button className="number" onClick={() => dispatch(addNumber(0))}>0</button>
        <button className="number" onClick={() => dispatch(addNumber('.'))}>.</button>
        <button className="equal" onClick={() => calculate()}>=</button>
      </div>
    </div>
  )
}

export default TodoList;