import { createSlice } from '@reduxjs/toolkit';
import { MODAL_NAMES } from '../utils/constants';

const initialState = {
  [MODAL_NAMES.RESUME_REVIEW]: false,
};

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    setModal: (state, action) => {
      state[action.payload.modalName] = action.payload.isOpen;
    },
  },
});

export const { setModal } = modalsSlice.actions;

export default modalsSlice.reducer;
