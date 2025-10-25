import { configureStore } from '@reduxjs/toolkit'
import { todoSliceReducer } from '../features/tod/todoSlice'

export const store = configureStore({
    reducer: {
        todo: todoSliceReducer
    },
});