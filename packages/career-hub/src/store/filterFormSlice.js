import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  role_type: undefined,
  company_ids: [],
  job_title: [],
  job_category: [],
  seniority_level: [],
  company_categories: [],
  location: [],
  min_ctc: undefined,
  min_stipend: undefined,
  min_duration: undefined,
  notice_period: undefined,
  date_posted_on: undefined,
  mbe_skill_ids: {},
  experience_skill_ids: [],
  min_experience: undefined,
  max_experience: undefined,
};

const filterFormSlice = createSlice({
  name: 'filterForm',
  initialState,
  reducers: {
    updateFormField: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
    resetForm: () => initialState,
    setFormData: (state, action) => {
      return { ...state, ...action.payload };
    },
    addRatingFilterInput: (state) => {
      if (!state.mbe_skill_ids || typeof state.mbe_skill_ids !== 'object') {
        state.mbe_skill_ids = {};
      }
      const newKey = `mbe_skill_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      state.mbe_skill_ids[newKey] = { subject: null, rating: null };
    },
    deleteRatingFilterInput: (state, action) => {
      const { inputFieldKey } = action.payload;
      if (state.mbe_skill_ids && state.mbe_skill_ids[inputFieldKey]) {
        delete state.mbe_skill_ids[inputFieldKey];
      }
    },
    updateRatingFilterInput: (state, action) => {
      const { inputFilterSubKey, value } = action.payload;
      if (!state.mbe_skill_ids || typeof state.mbe_skill_ids !== 'object') {
        state.mbe_skill_ids = {};
      }
      // inputFilterSubKey format: "mbe_skill_123_subject" or "mbe_skill_123_rating"
      const subKey = inputFilterSubKey.split('_').slice(-1)[0];
      const fullKey = inputFilterSubKey.replace(`_${subKey}`, '');
      if (!state.mbe_skill_ids[fullKey]) {
        state.mbe_skill_ids[fullKey] = { subject: null, rating: null };
      }
      if (subKey === 'subject') {
        state.mbe_skill_ids[fullKey].subject = value;
      } else if (subKey === 'rating') {
        state.mbe_skill_ids[fullKey].rating = value;
      }
    },
  },
});

export const {
  updateFormField,
  resetForm,
  setFormData,
  addRatingFilterInput,
  deleteRatingFilterInput,
  updateRatingFilterInput,
} = filterFormSlice.actions;
export default filterFormSlice.reducer;
