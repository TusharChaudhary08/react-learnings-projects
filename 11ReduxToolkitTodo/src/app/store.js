import {configureStore } from '@reduxjs/toolkit'
import todoReducer from '../faetures/Todo/TodoSlice'
export const store  = configureStore({
    reducer:todoReducer
});