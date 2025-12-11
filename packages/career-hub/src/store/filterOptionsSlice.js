import { createSlice } from '@reduxjs/toolkit';
import { convertToSelectOption } from '../utils/filterOptions';
import filterService from '../services/filterService';

const initialState = {
  companyOptions: [],
  titleOptions: [],
  experienceSkillOptions: [],
};

const filterOptionsSlice = createSlice({
  name: 'filterOptions',
  initialState,
  reducers: {
    setCompanyOptions: (state, action) => {
      state.companyOptions = convertToSelectOption(
        action.payload,
        'id',
        'value'
      );
    },
    setTitleOptions: (state, action) => {
      state.titleOptions = action.payload;
    },
    setExperienceSkillOptions: (state, action) => {
      state.experienceSkillOptions = action.payload;
    },
    clearCompanyOptions: (state) => {
      state.companyOptions = [];
    },
    clearTitleOptions: (state) => {
      state.titleOptions = [];
    },
    clearExperienceSkillOptions: (state) => {
      state.experienceSkillOptions = [];
    },
    clearAllOptions: (state) => {
      state.companyOptions = [];
      state.titleOptions = [];
      state.experienceSkillOptions = [];
    },
  },
  extraReducers: (builder) => {
    // Handle RTK Query results
    builder.addMatcher(
      filterService.endpoints.getCompanies.matchFulfilled,
      (state, action) => {
        state.companyOptions = convertToSelectOption(
          action.payload,
          'id',
          'value'
        );
      }
    );

    builder.addMatcher(
      filterService.endpoints.getTitles.matchFulfilled,
      (state, action) => {
        state.titleOptions = action.payload;
      }
    );

    builder.addMatcher(
      filterService.endpoints.getExperienceSkills.matchFulfilled,
      (state, action) => {
        state.experienceSkillOptions = action.payload;
      }
    );
  },
});

export const {
  setCompanyOptions,
  setTitleOptions,
  setExperienceSkillOptions,
  clearCompanyOptions,
  clearTitleOptions,
  clearExperienceSkillOptions,
  clearAllOptions,
} = filterOptionsSlice.actions;

export default filterOptionsSlice.reducer;
