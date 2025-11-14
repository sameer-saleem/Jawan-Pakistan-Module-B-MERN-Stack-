import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";
// import type { PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  total:'',
};

export const calc = createSlice({

  name: 'todo',
  initialState,

  reducers: {

    addNumber: (state, action) => {
      console.log('addd')
      state.total += action.payload;

    },
}

});

export const { addNumber } = calc.actions;
export default calc.reducer;