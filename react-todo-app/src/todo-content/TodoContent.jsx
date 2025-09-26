import { useEffect, useState } from 'react';

const TodoContent = () => {

    const [inputData, setInputData] = useState("");
    const [list, setList] = useState([]);
    const [editItem, setEditItem] = useState(null);

    const inputChange = (e) => {
        setInputData(e.target.value);
    }

    const addTask = () => {
        setInputData("");
        if (editItem !== null) {
            const updatedList = [...list];
            updatedList[editItem] = inputData;
            setList(updatedList);
            setEditItem(null);
        } else {
            setList(prev => [...prev, inputData]);
        }
    }

    const editTask = (i) => {
        setInputData(list[i]);
        setEditItem(i);
    }

    const deletItem = (del1) => {
        setList(prev => prev.filter(item => item !== del1));
    }


    return (
        <div className="main-content">
            <input
                type="text"
                value={inputData}
                onChange={(e) => inputChange(e)}
                className="input"
                placeholder="Enter a task"
            />
            <button onClick={() => addTask()} className="add-btn">Add</button>

            <ul className="todo-list">
                {list.map((item, i) => (
                    <li key={i} className="task">
                        <span>{item}</span>
                        <div className="btns">
                            <button onClick={() => editTask(i)} className="edit-btn">Edit</button>
                            <button onClick={() => deletItem(item)} className="del-btn">Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>

    )
}

export default TodoContent