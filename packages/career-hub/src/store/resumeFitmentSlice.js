import { createSlice } from '@reduxjs/toolkit';
import { isNullOrUndefined } from '../utils/type';

const initialState = {
  fitmentScore: {},
  activeResumeId: null,
  activeResumeName: null,
  activeJobProfileId: null,
  activeResumeChecklist: [],
  isChecklistOpen: false,
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
    setActiveResume: (state, action) => {
      const jobProfileId = action.payload?.jobProfileId;
      const resumeId = action.payload?.resumeId;
      const blockerPoints = action.payload?.blockerPoints;
      const resumeName = action.payload?.resumeName;

      if (jobProfileId && resumeId) {
        state.activeResumeId = resumeId;
        state.activeJobProfileId = jobProfileId;
        state.activeResumeName = resumeName;
        const remarks = state.fitmentScore[jobProfileId]?.[resumeId]?.remarks;
        const score = state.fitmentScore[jobProfileId]?.[resumeId]?.score;

        state.activeResumeChecklist = [
          ...(score < 80 && remarks ? [remarks] : []),
          ...blockerPoints,
        ];
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

export const { setFitmentScore, setActiveResume, setChecklistOpen } =
  resumeFitmentSlice.actions;

export default resumeFitmentSlice.reducer;
