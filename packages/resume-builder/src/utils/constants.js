export const PROGRAM_TYPES = {
  ACADEMY: 'academy',
  DSML: 'dsml',
};

export const PREFERENCE_SETTINGS_IMAGE =
  'https://d2beiqkhq929f0.cloudfront.net/public_assets/assets/000/124/609/original/image_%281%29.png?1746936231';

export const RESUME_BUILDER_STEPS = {
  ACKNOWLEDGEMENT: {
    key: 'acknowledgement',
    title: 'Acknowledgement',
    component: 'Acknowledgement',
  },
  PREFERENCE_SETTINGS: {
    key: 'preferenceSettings',
    title: 'Preference Settings',
    component: 'PreferenceSettings',
  },
  RESUME_BASIC_QUESTIONS: {
    key: 'resumeBasicQuestions',
    title: 'Resume Basic Questions',
    component: 'ResumeBasicQuestions',
  },
  RESUME_TIPS: {
    key: 'resumeTips',
    title: 'Resume Tips',
    component: 'ResumeTips',
  },
  RESUME_STEPS: {
    key: 'resumeSteps',
    title: 'Resume Steps',
    component: 'ResumeSteps',
  },
};

export const ADDITIONAL_PROFILES = [
  { label: 'LeetCode', value: 'leetcode' },
  { label: 'Codeforces', value: 'codeforces' },
  { label: 'Codechef', value: 'codechef' },
  { label: 'HackerRank', value: 'hackerrank' },
  { label: 'HackerEarth', value: 'hackerearth' },
  { label: 'Geeksforgeeks', value: 'geeksforgeeks' },
];

export const PROJECT_FORM_REQUIRED_FIELDS = [
  'title',
  'project_link',
  'description',
];

export const PERSONAL_DETAILS_FORM_REQUIRED_FIELDS = [
  'name',
  'phone_number',
  'email',
  'gender',
  'linkedin',
];

export const WORK_EXPERIENCE_FORM_REQUIRED_FIELDS = [
  'company',
  'position',
  'from',
];

export const EDUCATION_FORM_REQUIRED_FIELDS = [
  'university',
  'degree',
  'marks',
  'graduation_date',
];

export const STEPS_ORDER = [
  RESUME_BUILDER_STEPS.ACKNOWLEDGEMENT,
  RESUME_BUILDER_STEPS.PREFERENCE_SETTINGS,
  RESUME_BUILDER_STEPS.RESUME_BASIC_QUESTIONS,
  RESUME_BUILDER_STEPS.RESUME_TIPS,
  RESUME_BUILDER_STEPS.RESUME_STEPS,
];

export const JOB_ROLES = {
  fresher: 'Fresher',
  nonTech: 'Non-Tech',
  qualityAssuranceOrSdeInTesting: 'Quality Assurance / SDE in Testing',
  salesforceOrServicenowOrRpa: 'Salesforce / Servicenow / RPA',
  embeddedSystemsEngineer: 'Embedded Systems Engineer',
  mobileEngineer: 'Mobile Engineer',
  frontendOrFullStack: 'Frontend/Full-stack',
  backendOrBackendHeavyFullStack: 'Backend / Backend Heavy Full-stack',
  devopsOrNetworkEngineer: 'DevOps / Network Engineer',
  dataEngineer: 'Data Engineer',
  engineeringLeadership: 'Engineering Leadership',
  nonDeveloperAndItProfessional: 'Non-Developer & IT Professional',
  developer: 'Developer',
  dataAnalystOrBusinessAnalyst: 'Data Analyst / Business Analyst',
  dataScientistOrMachineLearningEngineer:
    'Data Scientist / Machine Learning Engineer',
};

export const JOB_ROLES_BY_PROGRAM = {
  academy: [
    JOB_ROLES.fresher,
    JOB_ROLES.nonTech,
    JOB_ROLES.qualityAssuranceOrSdeInTesting,
    JOB_ROLES.salesforceOrServicenowOrRpa,
    JOB_ROLES.embeddedSystemsEngineer,
    JOB_ROLES.mobileEngineer,
    JOB_ROLES.frontendOrFullStack,
    JOB_ROLES.backendOrBackendHeavyFullStack,
    JOB_ROLES.devopsOrNetworkEngineer,
    JOB_ROLES.dataEngineer,
    JOB_ROLES.engineeringLeadership,
  ],
  dsml: [
    JOB_ROLES.fresher,
    JOB_ROLES.nonTech,
    JOB_ROLES.nonDeveloperAndItProfessional,
    JOB_ROLES.developer,
    JOB_ROLES.dataAnalystOrBusinessAnalyst,
    JOB_ROLES.dataScientistOrMachineLearningEngineer,
  ],
};

// Resume PDF link key constants
export const RESUME_PDF_LINK_KEYS = {
  FRESHER: 'fresher',
  JUNIOR_BACKEND: 'junior-back-end-engineer',
  JUNIOR_FRONTEND: 'junior-front-end-engineer',
  SENIOR_BACKEND: 'senior-back-end-engineer',
  NON_TECH: 'non-tech',
  ENGG_MANAGER: 'engg-manager',
  NON_TECH_BACKGROUND: 'non-tech-background',
  DATA_ANALYST: 'data-analyst',
  DATA_SCIENTIST: 'data-scientist',
  DSML_FRESHER: 'dsml-fresher',
};

export const RESUME_PDF_LINKS = {
  [RESUME_PDF_LINK_KEYS.DSML_FRESHER]: {
    preview: `https://d2beiqkhq929f0.cloudfront.net/public_assets/assets/000/128/793/original/Fresher_good_resume_%281%29_page-0001.jpg?1748353701`,
    pdfLink:
      'https://d2beiqkhq929f0.cloudfront.net/public_assets/assets/000/128/678/original/Fresher_good_resume_%281%29.pdf?1748329562',
  },
  [RESUME_PDF_LINK_KEYS.FRESHER]: {
    preview: `https://d2beiqkhq929f0.cloudfront.net/public_assets/assets/000/128/793/original/Fresher_good_resume_%281%29_page-0001.jpg?1748353701`,
    pdfLink:
      'https://d2beiqkhq929f0.cloudfront.net/public_assets/assets/000/128/678/original/Fresher_good_resume_%281%29.pdf?1748329562',
  },
  [RESUME_PDF_LINK_KEYS.JUNIOR_BACKEND]: {
    preview: `https://d2beiqkhq929f0.cloudfront.net/public_assets/assets/000/128/794/original/Junior_backend_developer_good_resume_page-0001.jpg?1748353769`,
    pdfLink:
      'https://d2beiqkhq929f0.cloudfront.net/public_assets/assets/000/128/679/original/Junior_backend_developer_good_resume.pdf?1748329607',
  },
  [RESUME_PDF_LINK_KEYS.JUNIOR_FRONTEND]: {
    preview: `https://d2beiqkhq929f0.cloudfront.net/public_assets/assets/000/128/795/original/Junior_frontend_developer_good_resume_page-0001.jpg?1748353816`,
    pdfLink:
      'https://d2beiqkhq929f0.cloudfront.net/public_assets/assets/000/128/680/original/Junior_frontend_developer_good_resume.pdf?1748329639',
  },
  [RESUME_PDF_LINK_KEYS.SENIOR_BACKEND]: {
    preview: `https://d2beiqkhq929f0.cloudfront.net/public_assets/assets/000/128/796/original/Senior_Backend_Developer.jpg?1748353857`,
    pdfLink:
      'https://d2beiqkhq929f0.cloudfront.net/public_assets/assets/000/128/683/original/Senior_backend_developer_good_resume.pdf?1748329744',
  },
  [RESUME_PDF_LINK_KEYS.NON_TECH]: {
    preview: `https://d2beiqkhq929f0.cloudfront.net/public_assets/assets/000/128/797/original/Non_Tech_good_resume_page-0001.jpg?1748353908`,
    pdfLink:
      'https://d2beiqkhq929f0.cloudfront.net/public_assets/assets/000/128/681/original/Non_Tech_good_resume.pdf?1748329693',
  },
  [RESUME_PDF_LINK_KEYS.ENGG_MANAGER]: {
    preview: `https://d2beiqkhq929f0.cloudfront.net/public_assets/assets/000/128/798/original/Engineering_Manager_Good_Resume_1_page-0001.jpg?1748353948`,
    pdfLink:
      'https://d2beiqkhq929f0.cloudfront.net/public_assets/assets/000/128/677/original/Engineering_Manager_Good_Resume_1.pdf?1748329511',
  },
  [RESUME_PDF_LINK_KEYS.NON_TECH_BACKGROUND]: {
    preview: `https://d2beiqkhq929f0.cloudfront.net/public_assets/assets/000/128/799/original/Non_Tech_good_resume_%281%29.jpg?1748353990`,
    pdfLink:
      'https://d2beiqkhq929f0.cloudfront.net/public_assets/assets/000/128/684/original/Non_Tech_good_resume_%281%29.pdf?1748329780',
  },
  [RESUME_PDF_LINK_KEYS.DATA_ANALYST]: {
    preview: `https://d2beiqkhq929f0.cloudfront.net/public_assets/assets/000/128/803/original/Data_Analyst_good_resume.jpg?1748354029`,
    pdfLink:
      'https://d2beiqkhq929f0.cloudfront.net/public_assets/assets/000/128/675/original/Data_analyst_good_resume.pdf?1748329370',
  },
  [RESUME_PDF_LINK_KEYS.DATA_SCIENTIST]: {
    preview: `https://d2beiqkhq929f0.cloudfront.net/public_assets/assets/000/128/804/original/Data_scientist_good_resume_page-0001.jpg?1748354071`,
    pdfLink:
      'https://d2beiqkhq929f0.cloudfront.net/public_assets/assets/000/128/676/original/Data_scientist_good_resume.pdf?1748329448',
  },
};

/**
 * Get resume preview and PDF link based on job role
 * @param {string} jobRole - The selected job role
 * @returns {Object} Object containing preview and pdfLink
 */
export const getResumeTemplateByJobRole = (jobRole) => {
  const pdfKey = JOB_ROLE_TO_RESUME_PDF_KEY[jobRole];
  if (!pdfKey) {
    // Return default fresher template if no mapping found
    return RESUME_PDF_LINKS[RESUME_PDF_LINK_KEYS.FRESHER];
  }
  return RESUME_PDF_LINKS[pdfKey];
};

// Job role constants
export const ACADEMY_JOB_ROLES = [
  { value: 'Fresher', label: 'Fresher' },
  { value: 'Non-Tech', label: 'Non-Tech' },
  {
    value: 'Quality Assurance / SDE in Testing',
    label: 'Quality Assurance / SDE in Testing',
  },
  {
    value: 'Salesforce / Servicenow / RPA',
    label: 'Salesforce / Servicenow / RPA',
  },
  {
    value: 'Embedded Systems Engineer',
    label: 'Embedded Systems Engineer',
  },
  {
    value: 'Mobile Engineer',
    label: 'Mobile Engineer',
  },
  {
    value: 'Frontend/Full-stack',
    label: 'Frontend/Full-stack',
  },
  {
    value: 'Backend / Backend Heavy Full-stack',
    label: 'Backend / Backend Heavy Full-stack',
  },
  {
    value: 'DevOps / Network Engineer',
    label: 'DevOps / Network Engineer',
  },
  {
    value: 'Data Engineer',
    label: 'Data Engineer',
  },
  {
    value: 'Engineering Leadership',
    label: 'Engineering Leadership',
  },
];

export const DSML_JOB_ROLES = [
  {
    value: 'Fresher',
    label: 'Fresher',
  },
  {
    value: 'Non-Tech',
    label: 'Non-Tech',
  },
  {
    value: 'Non-Developer & IT Professional',
    label: 'Non-Developer & IT Professional',
  },
  {
    value: 'Developer',
    label: 'Developer',
  },
  {
    value: 'Data Analyst / Business Analyst',
    label: 'Data Analyst / Business Analyst',
  },
  {
    value: 'Data Scientist / Machine Learning Engineer',
    label: 'Data Scientist / Machine Learning Engineer',
  },
];

// Program to job roles mapping
export const PROGRAM_JOB_ROLES = {
  academy: ACADEMY_JOB_ROLES,
  dsml: DSML_JOB_ROLES,
};

const RESUME_TIPS = {
  socialLinks: {
    icon: '🔗',
    title: 'Add Social Links:',
    description: `Include links to various Professional social profiles like LinkedIn, 
      Github, Leetcode, Codeforces, HackerRank, HackerEarth, 
      CodeChef, GeeksForGeeks, InterviewBit on your profile.`,
  },
  keySkills: {
    icon: '🏆',
    title: 'Highlight Key Skills:',
    description: `Include Programming Languages, Frameworks and Tools 
      in which you have hands-on experience. Include at least 5 skills`,
  },
  projects: {
    icon: '📄',
    title: 'Showcase Projects:',
    description: `Include 1-2 impactful projects to showcase your technical ability. 
      Outline each project using 4-6 bullet points. Strengthen your achievements 
      by incorporating specific metrics like % improvement, cost saved, revenue, 
      scale handled etc.. Integrate project demo link and / or git repository. 
      Include details of the Tech Stack.`,
  },
  academicDetails: {
    icon: '🎓',
    title: 'Add Academic Details:',
    description: `Mention coding achievements, certifications,
      and any relevant coursework.`,
  },
  workExperience: {
    icon: '💼',
    title: 'Add Work Experience:',
    description: `Include your latest work experience. Outline, using 2-3 bullet points, 
      your key responsibilities, projects and achievements. 
      Include Impact metrics like % improvement, cost saved, revenue increased, etc.`,
  },
};

export const RESUME_PERSONAS = {
  ACADEMY_FRESHER: [
    RESUME_TIPS.socialLinks,
    RESUME_TIPS.projects,
    RESUME_TIPS.keySkills,
  ],
  ACADEMY_NON_TECH_FRESHER: [
    RESUME_TIPS.socialLinks,
    RESUME_TIPS.projects,
    RESUME_TIPS.keySkills,
    RESUME_TIPS.workExperience,
  ],
  ACADEMY_JUNIOR_FRONTEND_DEVELOPER: [
    RESUME_TIPS.socialLinks,
    RESUME_TIPS.workExperience,
    RESUME_TIPS.projects,
    RESUME_TIPS.keySkills,
  ],
  ACADEMY_SENIOR_BACKEND_DEVELOPER: [
    RESUME_TIPS.socialLinks,
    RESUME_TIPS.workExperience,
    RESUME_TIPS.projects,
    RESUME_TIPS.keySkills,
  ],
  DSML_FRESHER: [
    RESUME_TIPS.socialLinks,
    RESUME_TIPS.projects,
    RESUME_TIPS.keySkills,
  ],
  DSML_NON_TECH_FRESHER: [
    RESUME_TIPS.socialLinks,
    RESUME_TIPS.projects,
    RESUME_TIPS.keySkills,
    RESUME_TIPS.workExperience,
  ],
  DSML_DATA_ANALYST: [
    RESUME_TIPS.socialLinks,
    RESUME_TIPS.workExperience,
    RESUME_TIPS.projects,
    RESUME_TIPS.keySkills,
  ],
  DSML_DATA_SCIENTIST: [
    RESUME_TIPS.socialLinks,
    RESUME_TIPS.workExperience,
    RESUME_TIPS.projects,
    RESUME_TIPS.keySkills,
  ],
};

export const SOCIAL_LINKS = [
  'codeforces',
  'hackerrank',
  'codechef',
  'hackerearth',
  'geeksforgeeks',
  'leetcode',
  'scaler',
];

export const RESUME_HIGHLIGHT_IMAGES = {
  default: {
    imageLink:
      'https://d2beiqkhq929f0.cloudfront.net/public_assets/assets/000/126/271/original/Resume_Default_from_Figma_%281%29.png?1747392412',
    recommendation: 'Recommendations based on your persona will appear here',
  },
  fresherNonTech: {
    imageLink:
      'https://d2beiqkhq929f0.cloudfront.net/public_assets/assets/000/126/272/original/Fresher_Non-Tech_Resume.png?1747392498',
    recommendation:
      'The Projects section needs to be the main focus of your resume. Build and Include 2-3 impactful projects to showcase your skills.',
  },
  qualityAssurance: {
    imageLink:
      'https://d2beiqkhq929f0.cloudfront.net/public_assets/assets/000/126/273/original/Quality_Assurance_Resume_Builder.png?1747392566',
    recommendation: `The Projects section needs to be the main focus of your resume. Build and Include 2-3 impactful projects to showcase your skills.

In Work Experience, keep it short and include test automation /  coding-type tasks with the impact and tools used. 

In the Skills section, include popular languages, libraries and tools used hands-on at work.`,
  },
  allExceptEngineeringLeadership: {
    imageLink:
      'https://d2beiqkhq929f0.cloudfront.net/public_assets/assets/000/126/274/original/Resume_Builder_All_Except_Engineering_Leadership.png?1747392602',
    recommendation: `Work Experience needs to be the main focus of your resume. 

Include key and impactful tasks / projects with numbers across your work experience with the Programming languages, frameworks and tools used. 

In the Skills section, include popular Programming languages, libraries and tools used hands-on at work. 

Include complex / elaborate Projects done outside work if your tech work experience is under 2 years and you do not have enough impactful work-related items.
`,
  },
  engineeringLeadership: {
    imageLink:
      'https://d2beiqkhq929f0.cloudfront.net/public_assets/assets/000/128/685/original/Engineering_Leadership.png?1748329958',
    recommendation: `Work Experience needs to be the major focus of your resume. 

Include work experiences and promotions from most recent to oldest. 
Include impactful tasks and projects with numbers across your work experience with the programming languages, frameworks and tools used.
Include impactful non-technical (leadership, managerial) as well as technical initiatives. 

In the Skills section, include popular languages, libraries and tools used at work by you / your team.

`,
  },
  dsmlFresherNonTech: {
    imageLink:
      'https://d2beiqkhq929f0.cloudfront.net/public_assets/assets/000/126/278/original/DSML_Fresher_Non-Tech_Resume.png?1747392793',
    recommendation: `The Projects section needs to be the main focus of your resume. 

Build and Include 2-3 impactful projects / elaborate business cases to showcase your technical proficiency, and analytical skills. Include relevant business insights and impact metrics in each project along with the Programming languages, frameworks and tools used to do the project.

`,
  },
  dsmlNonDeveloperAndItProfessional: {
    imageLink:
      'https://d2beiqkhq929f0.cloudfront.net/public_assets/assets/000/126/279/original/DSML_Non-Developer___IT_Professional.png?1747392822',
    recommendation: `The Projects section needs to be the main focus of your resume. 

Build and Include 2-3 impactful projects / elaborate business cases to showcase your technical proficiency, and analytical skills. Include relevant business insights and impact metrics in each project along with the Programming languages, frameworks and tools used to do the project.
 
In Work Experience, keep it short and include test automation / coding-type tasks with impact and tools used.
`,
  },
  dsmlDeveloper: {
    imageLink:
      'https://d2beiqkhq929f0.cloudfront.net/public_assets/assets/000/126/280/original/DSML_Developer_Resume.png?1747392847',
    recommendation: `Work Experience and Projects are both important components of your resume.

Build and Include 2-3 impactful projects / elaborate business cases to showcase your technical proficiency, and analytical skills. Include relevant business insights and impact metrics in each project along with the Programming languages, frameworks and tools used to do the project.


In Work Experience, Include key impactful tasks and projects with numbers across your work experience with the Programming languages, frameworks and tools used.

In the Skills section, include popular languages, libraries and tools used at work by you / your team.

Your resume should highlight your experience as a developer and ability as a data analyst - Combining Technical competence with analytical skills and understanding of businesses / business metrics across key industries.

`,
  },
  dsmlDataAnalyst: {
    imageLink:
      'https://d2beiqkhq929f0.cloudfront.net/public_assets/assets/000/126/281/original/DSML_Data_Analyst_Resume.png?1747392883',
    recommendation: `Work Experience needs to be the main focus of your resume. 

Include key and impactful tasks / projects with business metrics, and impact numbers across your work experience with the Programming languages, frameworks and tools used. 

In the Skills section, include popular Programming languages, libraries and tools used hands-on at work.

Include elaborate Projects or Business Cases done outside work if your tech work experience is under 2 years and you do not have enough impactful work-related items.
`,
  },
};

export const DEFAULT_TEMPLATE_CONFIG = {
  fresher: {
    sections: [
      {
        name: 'PersonalDetails',
        config: {
          view: 'view1',
        },
      },
      {
        name: 'Skills',
        config: {
          view: 'view1',
        },
      },
      {
        name: 'Experience',
        config: {
          view: 'view1',
        },
      },
      {
        name: 'Projects',
        config: {
          view: 'view1',
        },
      },
      {
        name: 'Achievements',
        config: {
          view: 'view1',
        },
      },
      {
        name: 'Education',
        config: {
          view: 'view1',
        },
      },
      {
        name: 'CustomSection',
        config: {
          view: 'view1',
        },
        page: 1,
      },
    ],
  },
};

export const AI_REVIEW_MESSAGES = {
  SUCCESS: 'You will be redirected shortly...',
  ERROR: 'Failed to initiate review. Please try again.',
};

export const MODAL_NAMES = {
  RESUME_REVIEW: 'resumeReview',
};
