import React from 'react';
import { useSelector } from 'react-redux';
import { Popover } from 'antd';

import { getResumeHighlightImage } from '../../utils/resumeHightlightUtils';

import styles from './ResumeHighlightPreview.module.scss';

const SampleResumePreview = () => {
  const basicQuestions = useSelector(
    (state) => state.scalantResumeBuilder.formStore.forms.basicQuestions
  );

  const program = useSelector(
    (state) => state.scalantResumeBuilder.resumeBuilder.program
  );

  const { imageLink, recommendation } = getResumeHighlightImage(
    basicQuestions?.currentJobRole,
    program
  );

  const popoverContent = (
    <div style={{ width: '25rem' }}>
      <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>
        Recommendation
      </div>
      <div>{recommendation}</div>
    </div>
  );

  return (
    <div className={styles.container} style={{ position: 'relative' }}>
      <img
        className={styles.previewImage}
        src={imageLink}
        alt="resume-highlight"
      />
      {recommendation && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <Popover
            content={popoverContent}
            placement="right"
            open={true}
            trigger="hover"
            arrow={{ pointAtCenter: true }}
            autoAdjustOverflow={false}
          >
            <div style={{ width: 0, height: 0 }} />
          </Popover>
        </div>
      )}
    </div>
  );
};

export default SampleResumePreview;
