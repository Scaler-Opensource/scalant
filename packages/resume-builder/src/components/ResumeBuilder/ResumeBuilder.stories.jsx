import ResumeBuilder from './ResumeBuilder';
import resumeData from '../../dummyData/resumeData.json';
import resumeData1 from '../../dummyData/resumeData1.json';
import reviewData from '../../dummyData/reviewData.json';
import { setReviewData, setIsLoading } from '../../index';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

export default {
  title: 'ResumeBuilder',
  component: ResumeBuilder,
};

const dummyResumeList = [
  { id: 1, name: 'Resume 1', default: true },
  { id: 2, name: 'Resume 2', default: false },
  { id: 3, name: 'Resume 3', default: false },
];

export const OnboardingFlow = () => <ResumeBuilder isOnboarding={true} />;
export const ResumeFlow = () => <ResumeBuilder isOnboarding={false} />;

export const WithReviewData = () => {
  const TIMEOUT_FOR_REVIEW_DATA = 3000;
  const dispatch = useDispatch();

  // useEffect(() => {
  //   setTimeout(() => {
  //     dispatch(setReviewData(reviewData));
  //     if (reviewData.evaluation_state === 'ongoing') {
  //       dispatch(setIsLoading(true));
  //     } else {
  //       dispatch(setIsLoading(false));
  //     }
  //   }, TIMEOUT_FOR_REVIEW_DATA);
  // }, []);

  return (
    <div>
      <ResumeBuilder
        isOnboarding={true}
        resumeData={resumeData}
        resumeList={dummyResumeList}
        courseProduct={'academy'}
        onResumeClick={(id) => {
          console.log('Resume with id', id, 'clicked');
        }}
        onAddResumeClick={() => {
          console.log('Add Resume clicked');
        }}
        onManageResumesClick={() => {
          console.log('Manage Resumes clicked');
        }}
        onEditClick={() => {
          console.log('Edit clicked');
        }}
        onDeleteClick={() => {
          console.log('Delete clicked');
        }}
        baseUrl="https://cf1d948b-f96c-4781-8235-53d3293f0a70.mock.pstmn.io"
        onReviewResumeClick={() => {
          console.log('Review Resume clicked');
        }}
      />
    </div>
  );
};

export const WithDummyData = () => {
  const [useResumeData1, setUseResumeData1] = useState(false);
  const [currentResumeData, setCurrentResumeData] = useState(
    useResumeData1 ? resumeData1 : resumeData
  );

  useEffect(() => {
    // When toggling between datasets, reset to the selected dataset
    setCurrentResumeData(useResumeData1 ? resumeData1 : resumeData);
  }, [useResumeData1]);

  return (
    <div>
      <button
        onClick={() => setUseResumeData1(!useResumeData1)}
        style={{ marginBottom: '20px', padding: '8px 16px' }}
      >
        Switch to {useResumeData1 ? 'Resume Data' : 'Resume Data 1'}
      </button>
      <ResumeBuilder
        isOnboarding={true}
        resumeData={currentResumeData}
        resumeList={dummyResumeList}
        courseProduct={'devops'}
        enableResumeParsing={true}
        onContinue={() => {
          // Simulate the same data but a new object reference on continue
          setCurrentResumeData((prev) => ({ ...prev }));
        }}
        onResumeClick={(id) => {
          console.log('Resume with id', id, 'clicked');
        }}
        onAddResumeClick={() => {
          console.log('Add Resume clicked');
        }}
        onManageResumesClick={() => {
          console.log('Manage Resumes clicked');
        }}
        onUploadFile={async () =>
          'https://moonshot-assets.s3.us-west-2.amazonaws.com/generated/b6eb137bbbebeeee91ddd1f21cb48c7abfdea733429eed4d6794c11f5275c97f?AWSAccessKeyId=ASIAY7MGLG6ZLWUG3IK6&Expires=1758706988&Signature=uYwa4d32XM1DbgZPfAj3gJr2%2BCM%3D&x-amz-security-token=IQoJb3JpZ2luX2VjENH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIBkkDWXOsrVYz2piBc%2BV0Kx%2B4%2BUbOAo1nAJC2rFFcYqGAiEAzQfqnnLtu9PoBhoB8K%2BCG0aaw8eZcixjIJ%2Bw1gWb4kkq9wMIWhADGgw2MTcxNDY0MzE0MTAiDEa1dsaJMDUizC2GLSrUAxSe4anKdSU0jR8JadLySK9lBlMADzOH1GuIdoDQFykeU504OoYuPBa5wxzsnPdf2E1fGaWoQDgf6ehOH6k%2BzeSZmpZXJRfxIh0lyLR5%2Fiph7JT0BAV96l1kdP4nqH%2FQQh%2FHHl%2FXQdd8y6RVKYSw0Uf0v2oWDrrcfYasV8LoGVfNZ3pz8RmP0PzIvZwGztcWg4iytyOfDwtjgA6xTnJwL9S22FwFBhRqrwtrlPpog3j1jqu30K0DV4FNs9QL5pJjJOxLHDc7H%2BOG90P0%2Ff9ysrx0cawUi7mBfBVZM7yE8ogkv2QICtmEUWtTXE05YWue141LttHHxQ5g7tXB5VIB%2BRuP4c88HACuIQ75y8khW8CVV4eiwKzAAJXy33oVP1kgIE%2F7PG6tj8GvELCUu2NA2zp0s3sgAX7x7P5QNgdCGor9zeuVhZjFkIuB6z5D2sM9ISrL3FoXEAwia0i2Y03BINAF0IoiGS8ptDMBsCMm1%2BjzR%2BV22ILSzxTzgLPOAqUih%2FZdTOJaUJzMii%2BCy9zVH%2BT3zQmcVuga4hhg3SJYwQujemY3dNmkdqwEcY7kK5Bt5TDHajWrS%2FVh8oS8Oz8esZ9sX2goiM45thw2fRS%2BH8Zxr8PcFzDx2c7GBjqlATm934OX%2FZYz2qlNm%2F30zz8mhWT6iEnu1rgc1EHqoofeo3e0CaNEwO3ukonOMUX9q6qBXvpK97zvNrcUTcgfdXunbGV%2FqrzZAYCwCK2C0Wjg0TjhwkfQd%2BHAR3Ajd1ajPATjCTuk4bteHu%2BKJnrxYeIFzaHhBzxr5WvCrTA7jWVib%2Fp37D63ejJcT4nMxSqzESRQcx3atjsEk5LxrcQ0lGRpy%2FikOg%3D%3D'
        }
        onEditClick={() => {
          console.log('Edit clicked');
        }}
        onDeleteClick={() => {
          console.log('Delete clicked');
        }}
        baseUrl="https://cf1d948b-f96c-4781-8235-53d3293f0a70.mock.pstmn.io"
        onReviewResumeClick={() => {
          console.log('Review Resume clicked');
        }}
        onResumeBuilderPageView={(stepKey) => {
          console.log('Resume Builder Page View', stepKey);
        }}
        onFormCompletion={(formKey) => {
          console.log('Form Completion', formKey);
        }}
        onAllFormsComplete={() => {
          console.log('All Forms Complete');
        }}
      />
    </div>
  );
};

export const WithDummyData1 = () => (
  <ResumeBuilder
    isOnboarding={true}
    resumeData={resumeData1}
    resumeList={dummyResumeList}
    courseProduct={'academy'}
    onResumeClick={(id) => {
      console.log('Resume with id', id, 'clicked');
    }}
    onAddResumeClick={() => {
      console.log('Add Resume clicked');
    }}
    onManageResumesClick={() => {
      console.log('Manage Resumes clicked');
    }}
    onEditClick={() => {
      console.log('Edit clicked');
    }}
    onDeleteClick={() => {
      console.log('Delete clicked');
    }}
    baseUrl="https://cf1d948b-f96c-4781-8235-53d3293f0a70.mock.pstmn.io"
    onReviewResumeClick={() => {
      console.log('Review Resume clicked');
    }}
  />
);
