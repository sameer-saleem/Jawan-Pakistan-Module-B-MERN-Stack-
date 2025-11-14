import { db } from './firebase';
import { ref, push } from 'firebase/database';
import { useState } from 'react';

const ProductForm = () => {
  
  const [ task, setTask ] = useState('');
  const [ taskList, setTaskList ] = useState([]);

  const handleChange = (e) => {

    setTask(e.target.value);
    
  }

  const handleSubmit = (e) => {

    e.preventDefault();

    if(task !== '' && task !== null) {

      

      const updatedTaskList = [...taskList, task];
      setTaskList(updatedTaskList);
      
      const TodoRef = ref( db, 'todo' );

      push( TodoRef, updatedTaskList );

      alert( 'Task Added Successfully.' );

      setTask('');

    } else {

      alert('Please type something');

    }

    

    

  }

  return (

    <main className='main-container'>

      <section className='product-form'>

        <h1 className='heading'>Todo</h1>

        <form onSubmit={handleSubmit} className='form'>

          <input type="text" name="name" onChange={ (e) => handleChange(e) } value={ task } className='form-control' />

          { taskList.map( ( item, i ) => {

            return <li key={i}> {item} </li>

          }) }
          <ul>

          </ul>

          <button type="submit" className='btn-submit'>Add Task</button>

        </form>

      </section>

    </main>

  )

}

export default ProductForm;