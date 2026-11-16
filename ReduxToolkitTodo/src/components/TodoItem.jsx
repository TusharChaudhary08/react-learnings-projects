import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeTodo, editTodo, toggleComplete } from '../faetures/Todo/TodoSlice';

function TodoItem({todo}) {

  
  const dispatch = useDispatch();
  const [isEditable, setEditable] = useState(false);


  return (
    <>
  
        
            <li
              key={todo.id}
              className={`flex items-center justify-between px-3  h-12 rounded-xl 
             ${todo.completed ? 'bg-green-200' : 'bg-white'}`}
            >

              <div className='flex items-center justify-center w-full gap-2 '>

                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => dispatch(toggleComplete(todo.id))}
                />

                <input
                  type="text"
                  className={`w-full h-4  p-3 overflow-hidden font-semibold outline-0 rounded-lg 
                    ${isEditable ? "border-2 border-black/20 shadow-2xl" : "border-none"} 
                    ${todo.completed ? 'line-through' : ''} `}
                  value={todo.text}
                  readOnly={!isEditable}
                  onChange={(e)=> dispatch(editTodo({id:todo.id, text:e.target.value}))}
                />

              

              </div>

              <div className='flex items-center justify-center gap-2 m-2'>

                <button
                className={`inline-flex items-center justify-center w-8 h-8 rounded-lg bg-amber-200
                ${todo.completed ? 'opacity-50' : ''}`}
                disabled={todo.completed}
                onClick={() => { setEditable((prev) => !prev) }}

                >

                  {isEditable ? (<FolderIcon/>) : (<PencilIcon/>)}
                </button>

                <button
                  onClick={() => { dispatch(removeTodo(todo.id)) }}
                  className='inline-flex items-center justify-center w-8 h-8 rounded-lg bg-red-200 '>
                  <CrossIcon/>
                </button>

              </div>


            </li>
         

      

    </>
  )
}


const FolderIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M3 6.5C3 5.67 3.67 5 4.5 5H9L11 7H19.5C20.33 7 21 7.67 21 8.5V18C21 18.83 20.33 19.5 19.5 19.5H4.5C3.67 19.5 3 18.83 3 18V6.5Z"
        fill="#E5E7EB"
        stroke="#9CA3AF"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path
        d="M3.5 10H20.5"
        stroke="#D1D5DB"
        strokeWidth="1"
      />
    </svg>
  );
};


const PencilIcon = () => (
<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
       fill="none" stroke="currentColor" stroke-width="2"
       stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 20h9"/>
    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
  </svg>
);


const CrossIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#EF4444"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);




export default TodoItem