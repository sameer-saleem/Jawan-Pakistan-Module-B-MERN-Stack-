import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";
// import type { PayloadAction } from '@reduxjs/toolkit';

export const todoSlice = createSlice({

  name: 'todo',
  initialState,

  reducers: {

    addTask: (state, action) => {

      const task = state.task.find( task => task.id === action.payload );
      state.task.push( { id: Date.now(), text: action.payload.complete } );

    },

    toggleTask: (state, action) => {
        const task = state.task.find(task.id === action.payload);
        if(task) task.completed != task.completed;
    },

  },

  removeTask: (state, action) => {
    state.tasks = state.tasks.filter(task => task.id !== action.payload)
}

});

export const { addTask, toggleTask, removeTask } = todoSlice.actions;