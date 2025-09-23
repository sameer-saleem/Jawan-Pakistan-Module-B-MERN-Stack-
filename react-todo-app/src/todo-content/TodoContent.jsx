import { useEffect, useState } from 'react';

const TodoContent = () => {

    const [inputData, setInputData] = useState(null);
    const [list, setList] = useState([]);

    const inputChange = (e) => {
        setInputData(e.target.value);
    }

    const addTask = () => {
        setList(prev => [...prev, inputData]);
    }

    const deletItem = (item) => {
        console.log(item);
    }

    return (
        <div>
            <input type="text" onChange={(e) => inputChange(e)} />
            <button onClick={() => addTask()}>Add</button>
            <ul>
                {list.map((item, i) => <li key={i}>
                    {item}

                    <div>
                        <button>Edit</button>
                        <button onClick={()=> deletItem(item)}>Delete</button>
                    </div>

                </li>)}
            </ul>
        </div>
    )
}

export default TodoContent