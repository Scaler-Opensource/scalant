import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  per_page: 18,
  tab: 'relevant',
  filters: {
    keyword: '',
  },
  sortings: [
    {
      property: 'eligibility',
      direction: 'DESC',
    },
  ],
  page_number: 1,
  skip_expired_jobs: false,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setTab: (state, action) => {
      state.tab = action.payload;
      // Reset page number when tab changes
      state.page_number = 1;
    },
    setKeyword: (state, action) => {
      state.filters.keyword = action.payload;
      state.page_number = 1;
    },
    setPageNumber: (state, action) => {
      state.page_number = action.payload;
    },
    setPerPage: (state, action) => {
      state.per_page = action.payload;
      state.page_number = 1;
    },
    setSortings: (state, action) => {
      state.sortings = action.payload;
    },
    setSkipExpiredJobs: (state, action) => {
      state.skip_expired_jobs = action.payload;
    },
    resetFilters: (state) => {
      return {
        ...initialState,
        tab: state.tab, // Keep current tab when resetting
      };
    },
    updateFiltersFromForm: (state, action) => {
      // Preserve keyword if it exists, but replace all other filters
      const keyword = state.filters?.keyword || '';
      state.filters = {
        keyword,
        ...action.payload,
      };
      state.page_number = 1;
    },
  },
});

export const {
  setTab,
  setKeyword,
  setPageNumber,
  setPerPage,
  setSortings,
  setSkipExpiredJobs,
  resetFilters,
  updateFiltersFromForm,
} = filterSlice.actions;

export default filterSlice.reducer;
