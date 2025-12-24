import React from 'react';
import JobsPage from './JobsPage';
import userProfileData from './userProfileData.json';
import hydratedData from './hydratedData.json';

export default {
  title: 'Components/JobsPage',
  component: JobsPage,
};

window.__CAREERS_HUB__ = hydratedData;

export function Default() {
  const processCounts = {
    all: 153,
    relevant: 0,
    draft: 0,
    applications: 9,
    saved: 0,
    archived: 0,
  };

  const analytics = {
    click: (event, productName, data) => {
      console.log('analytics.click', event, productName, data);
    },
    view: (event, productName, data) => {
      console.log('analytics.view', event, productName, data);
    },
  };

  return (
    <>
      <div style={{ width: '100%', height: '7rem', backgroundColor: '#b2e1ff', position: 'sticky', top: 0, left: 0, zIndex: 1000 }}>Scaler Header</div>
      <JobsPage
        processCounts={processCounts}
        userProfileData={userProfileData} 
        onUploadFile={async () => {
          await new Promise(resolve => setTimeout(resolve, 3000));
          return "https://d1t59tgpzgv8ca.cloudfront.net/public_assets/assets/000/073/337/original/dummy-pdf_2.pdf?1765973287";
        }}
        country="IN"
        openMockInterviewModal={() => {}}
        openResume={() => {}}
        analytics={analytics}
      />
    </>
  
  );
}
