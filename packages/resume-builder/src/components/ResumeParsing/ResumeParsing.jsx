import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector, batch } from 'react-redux';
import PageHeader from '../PageHeader';
// import { Button } from 'antd';
import UploadPrompt from './UploadPrompt';
import Loading from './Loading';
import ErrorState from './ErrorState';
import SuccessState from './SuccessState';
import { nextStep, setResumeData } from '../../store/resumeBuilderSlice';
import {
  setParsingLoading,
  setParsingError,
  resetParsing,
  setParsingPercent,
} from '../../store/resumeParsingSlice';
import { useParseResumeMutation } from '../../services/resumeBuilderApi';

const ResumeParsing = ({ onUploadFile, onFileUploaded }) => {
  const dispatch = useDispatch();
  const [fileName, setFileName] = useState('resume.pdf');
  const timeoutRef = useRef(null);
  const doneRef = useRef(false);

  const resumeData = useSelector(
    (s) => s.scalantResumeBuilder?.resumeBuilder?.resumeData
  );
  const parsingStatus = useSelector(
    (s) => s.scalantResumeBuilder?.resumeParsing?.status
  );
  const parsingPercent = useSelector(
    (s) => s.scalantResumeBuilder?.resumeParsing?.percent
  );
  const parsedData = useSelector(
    (s) => s.scalantResumeBuilder?.resumeParsing?.parsedData
  );

  console.log('resumeData', resumeData);

  const [parseResume] = useParseResumeMutation();

  const onChooseDifferentFile = () => {
    dispatch(resetParsing());
  };

  const onSelectFile = async (e) => {
    dispatch(setParsingPercent(0));
    const file = e?.target?.files?.[0];
    console.log(file);
    if (!file) return;
    setFileName(file.name);
    dispatch(setParsingLoading(10));

    try {
      if (onUploadFile) {
        const url = await onUploadFile(file);
        console.log('url', url);
        onFileUploaded?.(url);

        // Kick off parse via API
        const resumeId = resumeData?.resume_details?.id;
        console.log('resumeId', resumeId);
        if (!resumeId) throw new Error('Missing resume id');

        dispatch(setParsingLoading(40));

        // Start 60s timeout waiting for websocket to flip to success
        if (timeoutRef.current) globalThis.clearTimeout(timeoutRef.current);
        doneRef.current = false;
        timeoutRef.current = globalThis.setTimeout(() => {
          // If still not success, show error
          if (!doneRef.current) {
            dispatch(setParsingError('Parsing timed out. Please try again.'));
          }
        }, 60000);

        await parseResume({ resumeId, resourceLink: url }).unwrap();

        dispatch(setParsingLoading(60));
      } else {
        throw new Error('Upload file function not provided');
      }
    } catch (error) {
      console.log('Failed to start parsing.', error);
      dispatch(setParsingError('Failed to start parsing.'));
    }
  };

  const onSkip = useCallback(() => {
    dispatch(nextStep());
  }, [dispatch]);

  // React to parsing status updates that may come from websocket
  useEffect(() => {
    if (parsingStatus === 'success') {
      doneRef.current = true;
      if (timeoutRef.current) {
        globalThis.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    } else if (parsingStatus === 'error') {
      doneRef.current = false;
      if (timeoutRef.current) {
        globalThis.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    } else if (parsingStatus === 'loading') {
      doneRef.current = false;
    }
  }, [parsingStatus, parsingPercent]);

  useEffect(
    () => () => {
      if (timeoutRef.current) globalThis.clearTimeout(timeoutRef.current);
    },
    []
  );

  return (
    <div>
      <PageHeader
        title={
          parsingStatus === 'success'
            ? 'Your resume is ready'
            : 'Profile Autofill'
        }
        subtitle={
          parsingStatus === 'success'
            ? "All set! We've filled in your details – feel free to tweak anything you'd like in the next page"
            : 'Save time. Upload your existing resume and we will auto-fill all of your details'
        }
      />

      {(!parsingStatus || parsingStatus === 'idle') && (
        <UploadPrompt onSkip={onSkip} onSelectFile={onSelectFile} />
      )}
      {parsingStatus === 'loading' && (
        <Loading
          fileName={fileName}
          percent={parsingPercent || 40}
          onChooseDifferentFile={onChooseDifferentFile}
        />
      )}
      {parsingStatus === 'error' && (
        <ErrorState
          fileName={fileName}
          onRetry={() => dispatch(resetParsing())}
          onSkip={onSkip}
        />
      )}
      {parsingStatus === 'success' && (
        <SuccessState
          fileName={fileName}
          onSave={() => {
            batch(() => {
              dispatch(setResumeData(parsedData));
              dispatch(nextStep());
            });
          }}
          onTryDifferent={() => dispatch(resetParsing())}
        />
      )}
    </div>
  );
};

export default ResumeParsing;
