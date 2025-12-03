# @scalant/career-hub

React component library for the Career Hub home page, built with Ant Design.

## Overview

This package provides the Career Hub home page layout and components for displaying user workflow progress, eligibility checklist, and resume building guidance.

## Installation

```bash
npm install @scalant/career-hub
```

## Usage

```javascript
import { CareerHub } from '@scalant/career-hub';
import { Provider } from 'react-redux';
import { store } from '@scalant/career-hub';

function App() {
  return (
    <Provider store={store}>
      <CareerHub 
        basename="/academy/mentee-dashboard/careers-hub"
        initialData={initialData}
        jwt={token}
      />
    </Provider>
  );
}
```

## Components

### Main Components

- **CareerHub**: Main entry component with routing
- **Home**: Home page with workflow checklist
- **WorkflowChecklist**: Displays user's progress through eligibility requirements
- **DetailsPanel**: Shows details for selected checklist items
- **ResumeBuilderCard**: Guidance card for resume creation

### Layout Components

- **CareerHubLayout**: Main layout wrapper
- **HomePageLayout**: Two-column layout for home page
- **TwoColumnLayout**: Reusable two-column layout
- **ContentWrapper**: Consistent content padding and max-width
- **TabsBar**: Navigation tabs

## Features

- **Conditional Progress Display**: Shows either status badges or "Unlock First Job" progress bar based on eligibility
- **Interactive Checklist**: Users can select items to view details
- **Resume Guidance**: Displays resume builder card when resume-related tasks are selected
- **Responsive Design**: Built with Ant Design for responsive layouts
- **Storybook**: Component documentation and visual testing

## State Management

Uses Redux Toolkit for state management:
- `careerHubSlice`: Main Career Hub state
- `workflowSlice`: Workflow progress and eligibility state

## Development

```bash
# Install dependencies
npm install

# Start Storybook
npm run storybook

# Build package
npm run build

# Lint
npm run lint
```

## API Integration

The package expects workflow data in the following format:

```javascript
{
  workflowGroups: [
    {
      id: 1,
      label: "MBE blocker",
      status: "pending",
      steps: [
        {
          id: 1,
          label: "Mock Interview",
          status: "pending",
          definitions: [
            {
              key: "workflow_def_mock_interview",
              title: "Interview Name",
              tag: "Mock Interview",
              meta: {
                points: [...],
                learner_cleared_interview: 43
              }
            }
          ]
        }
      ]
    }
  ],
  meta: {
    is_job_ineligible: true,
    completedAllSteps: false
  }
}
```

## Storybook

View component documentation:

```bash
npm run storybook
```

Stories available:
- `JobEligibleWithStatusBadges`: Normal status badge display
- `JobIneligibleWithProgressBar`: Progress bar display for job ineligible users
- `WithResumeBuilderCard`: Resume builder card display

## License

MIT
