export const RESUME_BLOCKER_POINTS = {
  bullets:
    "Bullet points should be used in project and work experience description for improved readability. Please use text editor's bullet point functionality for better indentation & formatting.",
  skills: 'At-least 5 skills should be included in your resume.',
  contentSize:
    'Your resume should be fully completed and not left incomplete or partially done.',
  experience:
    'At-least one project/experience with a sufficiently detailed description should be present in your resume.',
  projects:
    'At-least one project/experience with a sufficiently detailed description should be present in your resume.',
  garbage_collection: 'All the details of the resume should be accurate.',
};

/**
 * Generates a list of blocker points/improvements as text strings
 * @param {Object} value - The resume fitment value object
 * @returns {Array<string>} Array of blocker point text strings
 */
export function getBlockerPointsList(value) {
  const { blocker_and_garbage_details, tech_stack_check } = value || {};
  const { blockers, garbage_collection } = blocker_and_garbage_details || {};
  const { user_work_experiences, user_educations } = garbage_collection || {};

  const points = [];

  // Add blocker points
  Object.keys(blockers || {}).forEach((blockerKey) => {
    if (!blockers[blockerKey]) return;

    const blockerMessage = RESUME_BLOCKER_POINTS[blockerKey];
    if (blockerMessage) {
      points.push(blockerMessage);
    }
  });

  // Add tech stack check details
  if (tech_stack_check?.is_eligible === false && tech_stack_check?.details) {
    tech_stack_check.details.forEach((detail) => {
      points.push(
        `Missing skill to be added: ${detail.skill} (${detail.proficiency_period}yr exp)`
      );
    });
  }

  // Add inaccurate work experiences
  if (user_work_experiences?.length > 0) {
    user_work_experiences.forEach((experience) => {
      points.push(
        `Inaccurate work experience: ${experience.company} - ${experience.job_title}`
      );
    });
  }

  // Add inaccurate educations
  if (user_educations?.length > 0) {
    user_educations.forEach((education) => {
      points.push(
        `Inaccurate education: ${education.university} - ${education.degree} (${education.branch})`
      );
    });
  }

  return points;
}
