import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  todos: [{ id: 2, text: "hello", completed:false }],
};

export const todoSlice = createSlice({
    name:'todo',
    initialState,
    reducers:{
        addTodo:(state, action)=>{
           const todo = {
            id:nanoid(),
            text:action.payload,
            completed:false

           }

           state.todos.push(todo);

        },

        removeTodo :(state, action)=>{
          state.todos = state.todos.filter((todo)=> todo.id !== action.payload); // rewriting the new array in todos
        },

        editTodo : (state, action)=>{
            state.todos = state.todos.map((todo)=> todo.id === action.payload.id ? {...todo, text:action.payload.text} : todo)
        },

        toggleComplete : (state, action ) =>{
          state.todos = state.todos.map((todo)=> todo.id === action.payload ? {...todo, completed:!todo.completed} : todo)
        }
    }

})


export const {addTodo, removeTodo, editTodo, toggleComplete}  = todoSlice.actions

export default todoSlice.reducer