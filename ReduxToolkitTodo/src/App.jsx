import { useState } from 'react'
import TodoForm from './components/TodoFrom'
import { Provider, useSelector } from 'react-redux'
import { store } from './app/store'
import TodoItem from './components/TodoItem'


function TodoApp() {
  const todos = useSelector((state) => state.todos);


  return (
    <>


      <div className='w-full h-screen bg-blue-950 pt-20 px-5'>
        <div className=' w-full  max-w-2xl mx-auto p-5 bg-blue-900 shadow-2xl rounded-3xl'>
          <h1 className='text-3xl text-center text-white font-bold pt-5 pb-5 '>Todo app</h1>
          <div className='pb-5 w-full'>
            {/* form */}
            <TodoForm />
          </div>
          <div className='flex flex-col gap-3 w-full'>
            {/* item */}

            {todos.map((todo) => (

              <TodoItem todo={todo} />

            ))}


          </div>


        </div>


      </div>


    </>
  )
}

function App() {
  return (
    <>
      <Provider store={store}>
        <TodoApp />
      </Provider>
    </>
  )
}

export default App
