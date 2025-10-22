import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentIncompleteForm: '',
  nextIncompleteForm: '',
  incompleteForms: [],
  completed: false,
};

const resumeFormsSlice = createSlice({
  name: 'resumeForms',
  initialState,
  reducers: {
    setCurrentIncompleteForm: (state, action) => {
      state.currentIncompleteForm = action.payload;
    },
    setNextIncompleteForm: (state, action) => {
      state.nextIncompleteForm = action.payload;
    },
    setIncompleteForms: (state, action) => {
      state.incompleteForms = action.payload;
    },
    setCompleted: (state, action) => {
      state.completed = action.payload;
    },
  },
});

export const {
  setCurrentIncompleteForm,
  setNextIncompleteForm,
  setIncompleteForms,
  setCompleted,
} = resumeFormsSlice.actions;
export default resumeFormsSlice.reducer;
