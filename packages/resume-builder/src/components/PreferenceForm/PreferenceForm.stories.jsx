import { useState } from 'react';

import PreferenceForm from './PreferenceForm';
import resumeData from '../../dummyData/resumeData.json';
import resumeData1 from '../../dummyData/resumeData1.json';

export default {
  title: 'PreferenceForm',
  component: PreferenceForm,
};

export const WithDummyData = () => {
  const [useResumeData1, setUseResumeData1] = useState(false);
  
  return (
    <div>
      <button 
        onClick={() => setUseResumeData1(!useResumeData1)}
        style={{ marginBottom: '20px', padding: '8px 16px' }}
      >
        Switch to {useResumeData1 ? 'Resume Data' : 'Resume Data 1'}
      </button>
      <PreferenceForm
        resumeData={useResumeData1 ? resumeData1 : resumeData}
        onBackButtonClick={() => {
          console.log('Back button clicked');
        }}
        courseProduct={'academy'}
        isLoading={false}
      />
    </div>
  );
};

export const WithDummyData1 = () => (
  <PreferenceForm
    resumeData={resumeData1}
    courseProduct={'academy'}
    onBackButtonClick={() => {
      console.log('Back button clicked');
    }}
    isLoading={false}
  />
);
