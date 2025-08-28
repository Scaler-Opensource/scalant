import React from 'react';
import { Flex } from 'antd';
import styles from './SectionFeedback.module.scss';
import { ExclamationCircleFilled } from '@ant-design/icons';

const SectionFeedback = ({
  icon = (
    <ExclamationCircleFilled style={{ color: '#faad14', fontSize: '1.6rem' }} />
  ),
  feedbackData = [],
}) => {
  return (
    <>
      {feedbackData.length > 0 ? (
        <Flex
          align="flex-start"
          justify="flex-start"
          gap={8}
          className={styles.sectionFeedback}
        >
          {icon}
          <Flex vertical>
            <div>
              <div className={styles.feedbackText}>Section Feedback</div>
              <ul className={styles.feedbackDescription}>
                {feedbackData.map((feedback, index) => (
                  <li key={index}>{feedback}</li>
                ))}
              </ul>
            </div>
          </Flex>
        </Flex>
      ) : null}
    </>
  );
};

export default SectionFeedback;
