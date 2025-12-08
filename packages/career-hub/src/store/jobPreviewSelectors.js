import { createSelector } from '@reduxjs/toolkit';

const selectJobPreview = (state) => state.jobPreview || {
  activeJobId: null,
  activeTab: 'requirements',
  shouldScroll: false,
};

export const selectActiveJobId = createSelector(
  [selectJobPreview],
  (preview) => preview.activeJobId
);

export const selectActiveTab = createSelector(
  [selectJobPreview],
  (preview) => preview.activeTab
);

export const selectShouldScroll = createSelector(
  [selectJobPreview],
  (preview) => preview.shouldScroll
);
