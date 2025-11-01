import { configureStore } from '@reduxjs/toolkit'
import calcReducer from '../features/tod/todoSlice'

export const store = configureStore({
    reducer: {
        calcState: calcReducer
    },
});