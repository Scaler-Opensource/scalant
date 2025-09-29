import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector, batch } from 'react-redux';
import PageHeader from '../PageHeader';
// import { Button } from 'antd';
import UploadPrompt from './UploadPrompt';
import Loading from './Loading';
import ErrorState from './ErrorState';
import SuccessState from './SuccessState';
import { nextStep } from '../../store/resumeBuilderSlice';
import {
  setParsingLoading,
  setParsingError,
  resetParsing,
  setParsingPercent,
  // setParsingSuccess,
  // setParsedData,
} from '../../store/resumeParsingSlice';
import { useParseResumeMutation } from '../../services/resumeBuilderApi';
// import resumeParseData from '../../dummyData/resumeParseData.json';
import { PARSING_STATUS } from '../../utils/constants';

// Constants controlling parsing progress and timeout behavior
const TOTAL_TIMEOUT_MS = 60000; // 60 seconds
const PROGRESS_TICK_MS = 500; // UI update tick
const MAX_PRE_SUCCESS_PERCENT = 99; // don't reach 100 until success
const MIN_PROGRESS_PERCENT = 1; // ensure non-zero when ticking

const ResumeParsing = ({
  onUploadFile,
  onFileUploaded,
  onRetry,
  onContinue,
  onSkip,
}) => {
  const dispatch = useDispatch();
  const [fileName, setFileName] = useState('resume.pdf');
  const timeoutRef = useRef(null);
  const progressIntervalRef = useRef(null);
  const progressStartTsRef = useRef(null);
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

  const [parseResume] = useParseResumeMutation();

  // ----- Helpers: timeout and progress management -----
  const clearTimeoutTimer = useCallback(() => {
    if (timeoutRef.current) {
      globalThis.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const stopProgress = useCallback(() => {
    if (progressIntervalRef.current) {
      globalThis.clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
  }, []);

  const calculatePercent = useCallback((startTs) => {
    const elapsedMs = Date.now() - (startTs || Date.now());
    const ratio = Math.min(
      elapsedMs / TOTAL_TIMEOUT_MS,
      MAX_PRE_SUCCESS_PERCENT / 100
    );
    const percent = Math.max(MIN_PROGRESS_PERCENT, Math.floor(ratio * 100));
    return percent;
  }, []);

  const startProgress = useCallback(() => {
    stopProgress();
    progressStartTsRef.current = Date.now();
    progressIntervalRef.current = globalThis.setInterval(() => {
      if (doneRef.current) return;
      const percent = calculatePercent(progressStartTsRef.current);
      dispatch(setParsingPercent(percent));
    }, PROGRESS_TICK_MS);
  }, [calculatePercent, dispatch, stopProgress]);

  const startTimeout = useCallback(() => {
    clearTimeoutTimer();
    doneRef.current = false;
    timeoutRef.current = globalThis.setTimeout(() => {
      if (!doneRef.current) {
        dispatch(setParsingError('Parsing timed out. Please try again.'));
      }
    }, TOTAL_TIMEOUT_MS);
  }, [clearTimeoutTimer, dispatch]);

  const handleRetry = useCallback(() => {
    dispatch(resetParsing());
    onRetry?.();
  }, [dispatch, onRetry]);

  const handleSelectFile = async (e) => {
    const file = e?.target?.files?.[0];

    if (!file) return;
    setFileName(file.name);

    try {
      if (onUploadFile) {
        const url = await onUploadFile(file);

        onFileUploaded?.(url);

        // Kick off parse via API
        const resumeId = resumeData?.resume_details?.id;

        if (!resumeId) throw new Error('Missing resume id');

        // globalThis.setTimeout(() => {
        //   dispatch(setParsingSuccess());
        //   dispatch(setParsedData(resumeParseData));
        // }, 3000);

        // Mark as loading and start progress/timeout machinery
        dispatch(setParsingLoading());
        dispatch(setParsingPercent(0));
        startTimeout();
        startProgress();
        await parseResume({ resumeId, resourceLink: url }).unwrap();
      } else {
        throw new Error('Upload file function not provided');
      }
    } catch {
      dispatch(setParsingError('Failed to start parsing.'));
    }
  };

  const handleSkip = useCallback(() => {
    dispatch(nextStep());
    onSkip?.();
  }, [dispatch, onSkip]);

  const handleSave = useCallback(() => {
    batch(() => {
      // dispatch(setResumeData(parsedData));
      dispatch(nextStep());
    });
    onContinue?.();
  }, [dispatch, onContinue]);

  // React to parsing status updates that may come from websocket
  useEffect(() => {
    if (parsingStatus === PARSING_STATUS.SUCCESS) {
      doneRef.current = true;
      clearTimeoutTimer();
      stopProgress();
      // Snap to 100 on success
      if (typeof parsingPercent !== 'number' || parsingPercent < 100) {
        dispatch(setParsingPercent(100));
      }
    } else if (parsingStatus === PARSING_STATUS.ERROR) {
      doneRef.current = false;
      clearTimeoutTimer();
      stopProgress();
    } else if (parsingStatus === PARSING_STATUS.LOADING) {
      doneRef.current = false;
    }
  }, [
    clearTimeoutTimer,
    dispatch,
    parsingStatus,
    parsingPercent,
    stopProgress,
  ]);

  useEffect(
    () => () => {
      clearTimeoutTimer();
      stopProgress();
    },
    [clearTimeoutTimer, stopProgress]
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

      {(!parsingStatus || parsingStatus === PARSING_STATUS.IDLE) && (
        <UploadPrompt onSkip={handleSkip} onSelectFile={handleSelectFile} />
      )}
      {parsingStatus === PARSING_STATUS.LOADING && (
        <Loading fileName={fileName} percent={parsingPercent} />
      )}
      {parsingStatus === PARSING_STATUS.ERROR && (
        <ErrorState
          fileName={fileName}
          onRetry={handleRetry}
          onSkip={handleSkip}
        />
      )}
      {parsingStatus === PARSING_STATUS.SUCCESS && (
        <SuccessState fileName={fileName} onSave={handleSave} />
      )}
    </div>
  );
};

export default ResumeParsing;
