import { JOB_ROLES, PROGRAM_TYPES, RESUME_HIGHLIGHT_IMAGES } from './constants';

const getAcademyResumeHighlightImage = (jobRole) => {
  switch (jobRole) {
    case JOB_ROLES.fresher:
      return RESUME_HIGHLIGHT_IMAGES.fresherNonTech;
    case JOB_ROLES.nonTech:
      return RESUME_HIGHLIGHT_IMAGES.fresherNonTech;
    case JOB_ROLES.qualityAssuranceOrSdeInTesting:
      return RESUME_HIGHLIGHT_IMAGES.qualityAssurance;
    case JOB_ROLES.salesforceOrServicenowOrRpa:
      return RESUME_HIGHLIGHT_IMAGES.qualityAssurance;
    case JOB_ROLES.engineeringLeadership:
      return RESUME_HIGHLIGHT_IMAGES.engineeringLeadership;
    default:
      return RESUME_HIGHLIGHT_IMAGES.allExceptEngineeringLeadership;
  }
};

const getDsmlResumeHighlightImage = (jobRole) => {
  switch (jobRole) {
    case JOB_ROLES.fresher:
      return RESUME_HIGHLIGHT_IMAGES.dsmlFresherNonTech;
    case JOB_ROLES.nonTech:
      return RESUME_HIGHLIGHT_IMAGES.dsmlFresherNonTech;
    case JOB_ROLES.nonDeveloperAndItProfessional:
      return RESUME_HIGHLIGHT_IMAGES.dsmlNonDeveloperAndItProfessional;
    case JOB_ROLES.developer:
      return RESUME_HIGHLIGHT_IMAGES.dsmlDeveloper;
    case JOB_ROLES.dataAnalystOrBusinessAnalyst:
      return RESUME_HIGHLIGHT_IMAGES.dsmlDataAnalyst;
    case JOB_ROLES.dataScientistOrMachineLearningEngineer:
      return RESUME_HIGHLIGHT_IMAGES.dsmlDataAnalyst;
    default:
      return RESUME_HIGHLIGHT_IMAGES.dsmlFresherNonTech;
  }
};

const getDevOpsResumeHighlightImage = (jobRole) => {
  switch (jobRole) {
    case JOB_ROLES.devops:
      return RESUME_HIGHLIGHT_IMAGES.devopsEngineer;
    case JOB_ROLES.techAdjacent:
      return RESUME_HIGHLIGHT_IMAGES.devopsTechAdjacent;
    case JOB_ROLES.nonTech:
      return RESUME_HIGHLIGHT_IMAGES.devopsNonTech;
    case JOB_ROLES.dataAnalystOrBusinessAnalyst:
      return RESUME_HIGHLIGHT_IMAGES.devopsDataAnalyst;
    case JOB_ROLES.fresher:
      return RESUME_HIGHLIGHT_IMAGES.devopsFresher;
    case JOB_ROLES.developer:
      return RESUME_HIGHLIGHT_IMAGES.devopsDeveloper;
    case JOB_ROLES.dataEngineer:
      return RESUME_HIGHLIGHT_IMAGES.devopsDataEngineer;
    case JOB_ROLES.embeddedSystemsEngineer:
      return RESUME_HIGHLIGHT_IMAGES.embeddedSystemsEngineer;
    default:
      return RESUME_HIGHLIGHT_IMAGES.default;
  }
};

export const getResumeHighlightImage = (jobRole, programType) => {
  if (!jobRole || !programType) {
    return RESUME_HIGHLIGHT_IMAGES.default;
  }

  if (programType === PROGRAM_TYPES.ACADEMY) {
    return getAcademyResumeHighlightImage(jobRole);
  } else if (programType === PROGRAM_TYPES.DSML) {
    return getDsmlResumeHighlightImage(jobRole);
  } else if (programType === PROGRAM_TYPES.DEVOPS) {
    return getDevOpsResumeHighlightImage(jobRole);
  }

  return RESUME_HIGHLIGHT_IMAGES.default;
};
