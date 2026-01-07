import { isNullOrUndefined } from './type';

export function getBlockerPointsChecklist(resumeReviewData) {
  const { overall_resume_score, section_feedback, section_scores } =
    resumeReviewData?.resume_evaluation_result || {};

  if (
    isNullOrUndefined(overall_resume_score) ||
    isNullOrUndefined(section_feedback) ||
    overall_resume_score > 2
  ) {
    return [];
  }

  const points = [];

  Object.keys(section_feedback).forEach((key) => {
    if (section_scores[key] < 2) {
      points.push(section_feedback[key][0]);
    }
  });

  return points;
}
