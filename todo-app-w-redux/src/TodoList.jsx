import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { addTask, toggleTask, removeTask } from "./features/tod/todoSlice";

const TodoList = () => {

    const [ newTask, setNewTask ] = useState('');
    const tasks = useSelector(state => state.todo.tasks);
    const dispatch = useDispatch();


  return (
    <div>
      
    </div>
  )
}

export default TodoList;