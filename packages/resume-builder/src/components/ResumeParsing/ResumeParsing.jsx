import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import PageHeader from '../PageHeader';
// import { Button } from 'antd';
import UploadPrompt from './UploadPrompt';
import Loading from './Loading';
import ErrorState from './ErrorState';
import SuccessState from './SuccessState';
import { nextStep } from '../../store/resumeBuilderSlice';

const ResumeParsing = ({ onUploadFile, onFileUploaded }) => {
  const dispatch = useDispatch();
  const [state, setState] = useState('upload'); // upload | loading | error | success
  const [fileName, setFileName] = useState('resume.pdf');
  const [progress, setProgress] = useState(40);

  const simulateParse = () => {
    setState('loading');
    setProgress(40);
    // globalThis.setTimeout(() => setProgress(70), 700);
    // globalThis.setTimeout(() => setProgress(100), 1400);
    // globalThis.setTimeout(() => setState('success'), 1800);
  };

  const onChooseDifferentFile = () => {
    setState('upload');
  };

  const onSelectFile = async (e) => {
    const file = e?.target?.files?.[0];
    if (!file) return;
    setFileName(file.name);
    setState('loading');
    setProgress(40);

    try {
      if (onUploadFile) {
        const url = await onUploadFile(file);
        onFileUploaded?.(url);

        setProgress(100);
        setState('success');
      } else {
        throw new Error('Upload file function not provided');
      }
    } catch {
      setState('error');
    }
  };

  const onSkip = useCallback(() => {
    dispatch(nextStep());
  }, [dispatch]);

  return (
    <div>
      <PageHeader
        title={
          state === 'success' ? 'Your resume is ready' : 'Profile Autofill'
        }
        subtitle={
          state === 'success'
            ? "All set! We've filled in your details – feel free to tweak anything you'd like in the next page"
            : 'Save time. Upload your existing resume and we will auto-fill all of your details'
        }
      />

      {state === 'upload' && (
        <UploadPrompt onSkip={onSkip} onSelectFile={onSelectFile} />
      )}
      {state === 'loading' && (
        <Loading
          fileName={fileName}
          percent={progress}
          onChooseDifferentFile={onChooseDifferentFile}
        />
      )}
      {state === 'error' && (
        <ErrorState
          fileName={fileName}
          onRetry={() => simulateParse()}
          onSkip={() => setState('upload')}
        />
      )}
      {state === 'success' && (
        <SuccessState
          fileName={fileName}
          onSave={() => {}}
          onTryDifferent={() => setState('upload')}
        />
      )}
    </div>
  );
};

export default ResumeParsing;
