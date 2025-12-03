// Routing Configuration for Career Hub
// LLD: This file defines all routes for the Career Hub SPA
// Routes are organized by feature area and will be used by the AppRouter component

import { ROUTES, NAVIGATION_TABS, JOB_LIST_TABS } from '../utils/constants';

// LLD: Route definitions with component references
// Each route maps to a page component in src/pages/
// Components will be lazily loaded in the AppRouter for better performance

export const routeConfig = [
  // Home/Checklist Page
  // LLD: Shows eligibility workflow checklist - first page users see
  // Component: src/pages/Home/Home.jsx
  {
    path: ROUTES.HOME,
    exact: true,
    component: 'Home',
    requiresAuth: true,
  },
  
  // Job Insights/Digest Page
  // LLD: Shows job insights, trends, and digest information
  // Component: src/pages/JobInsights/JobInsights.jsx
  {
    path: ROUTES.JOB_INSIGHTS,
    exact: true,
    component: 'JobInsights',
    requiresAuth: true,
  },
  
  // Practice Arena Page
  // LLD: Shows practice/interview preparation resources
  // Component: src/pages/PracticeArena/PracticeArena.jsx
  {
    path: ROUTES.PRACTICE_ARENA,
    exact: true,
    component: 'PracticeArena',
    requiresAuth: true,
  },
  
  // Resume Repository Page
  // LLD: Shows user's resume repository and management
  // Component: src/pages/ResumeRepo/ResumeRepo.jsx
  {
    path: ROUTES.RESUME_REPO,
    exact: true,
    component: 'ResumeRepo',
    requiresAuth: true,
  },
  
  // Resume Builder Route
  // LLD: Redirects to or embeds the resume-builder package
  // This may be handled differently depending on host app integration
  {
    path: ROUTES.RESUME_BUILDER,
    exact: true,
    component: 'ResumeBuilder',
    requiresAuth: true,
  },
  
  // Job Detail Page
  // LLD: Shows detailed job description, requirements, and apply flow
  // Component: src/pages/JobDetail/JobDetail.jsx
  {
    path: ROUTES.JOB_DETAIL,
    exact: true,
    component: 'JobDetail',
    requiresAuth: true,
  },
  
  // All Jobs Routes (tab-based)
  // LLD: All jobs routes are handled by the Jobs page with tab parameter
  // Component: src/pages/Jobs/Jobs.jsx (handles all job list views)
  {
    path: ROUTES.ALL_JOBS,
    exact: true,
    component: 'Jobs',
    tab: JOB_LIST_TABS.ALL,
    requiresAuth: true,
  },
  {
    path: ROUTES.RELEVANT_JOBS,
    exact: true,
    component: 'Jobs',
    tab: JOB_LIST_TABS.RELEVANT,
    requiresAuth: true,
  },
  {
    path: ROUTES.SAVED_JOBS,
    exact: true,
    component: 'Jobs',
    tab: JOB_LIST_TABS.SAVED,
    requiresAuth: true,
  },
  {
    path: ROUTES.APPLIED_JOBS,
    exact: true,
    component: 'Jobs',
    tab: JOB_LIST_TABS.APPLIED,
    requiresAuth: true,
  },
  {
    path: ROUTES.ELIGIBLE_JOBS,
    exact: true,
    component: 'Jobs',
    tab: JOB_LIST_TABS.ELIGIBLE,
    requiresAuth: true,
  },
  {
    path: ROUTES.RECOMMENDED_JOBS,
    exact: true,
    component: 'Jobs',
    tab: JOB_LIST_TABS.RECOMMENDED,
    requiresAuth: true,
  },
  {
    path: ROUTES.EXCEPTIONAL_JOBS,
    exact: true,
    component: 'Jobs',
    tab: JOB_LIST_TABS.EXCEPTIONAL,
    requiresAuth: true,
  },
  
  // Jobs Base Route
  // LLD: Default jobs route - redirects to all jobs or user's default tab
  {
    path: ROUTES.JOBS,
    exact: true,
    component: 'Jobs',
    tab: JOB_LIST_TABS.ALL, // Default tab
    requiresAuth: true,
  },
];

// LLD: Helper function to get route by path
export const getRouteByPath = (path) => {
  return routeConfig.find(route => route.path === path);
};

// LLD: Helper function to get routes by component name
export const getRoutesByComponent = (componentName) => {
  return routeConfig.filter(route => route.component === componentName);
};

