import { createSlice } from '@reduxjs/toolkit';
import { isNullOrUndefined } from '../utils/type';
import { getBlockerPointsChecklist } from '../utils/resumeUtils';

const initialState = {
  fitmentScore: {},
  activeResumeId: null,
  activeResumeName: null,
  activeJobProfileId: null,
  activeResumeChecklist: [],
  isChecklistOpen: false,
  resumeReviewData: {},
};

const resumeFitmentSlice = createSlice({
  name: 'resumeFitment',
  initialState,
  reducers: {
    setFitmentScore: (state, action) => {
      const jobProfileId = action.payload?.job_profile_id;
      const resumeId = action.payload?.user_resume_id;
      const score = action.payload?.score;
      const remarks = action.payload?.remarks;

      if (jobProfileId && resumeId && !isNullOrUndefined(score)) {
        state.fitmentScore[jobProfileId] = {
          ...state.fitmentScore[jobProfileId],
          [resumeId]: { score, remarks },
        };
      }
    },
    setResumeReviewData: (state, action) => {
      const resumeId = action.payload.resume_id;
      if (resumeId) {
        state.resumeReviewData[resumeId] = action.payload;
      }
    },
    setActiveResume: (state, action) => {
      const jobProfileId = action.payload?.jobProfileId;
      const resumeId = action.payload?.resumeId;
      const resumeName = action.payload?.resumeName;

      if (jobProfileId && resumeId) {
        state.activeResumeId = resumeId;
        state.activeJobProfileId = jobProfileId;
        state.activeResumeName = resumeName;

        state.activeResumeChecklist = getBlockerPointsChecklist(
          state.resumeReviewData[resumeId]
        );
      }
    },
    setChecklistOpen: (state, action) => {
      if (action.payload?.syncWithBlockerPoints) {
        state.isChecklistOpen = state.activeResumeChecklist?.length > 0;
      } else {
        state.isChecklistOpen = action.payload?.isOpen;
      }
    },
  },
});

export const {
  setFitmentScore,
  setActiveResume,
  setChecklistOpen,
  setResumeReviewData,
} = resumeFitmentSlice.actions;

export default resumeFitmentSlice.reducer;
