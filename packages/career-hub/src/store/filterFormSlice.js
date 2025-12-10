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
  mbe_skill_ids: [],
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
  },
});

export const { updateFormField, resetForm, setFormData } =
  filterFormSlice.actions;
export default filterFormSlice.reducer;
