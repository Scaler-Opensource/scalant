import React, { useEffect } from 'react';
import classNames from 'classnames';
import { Flex, Radio, Skeleton, Typography } from 'antd';
import { Document, Page, pdfjs } from 'react-pdf';
import { toDDMMYY } from '../../../utils/date';
import { useApplicationFormContext } from '../../../contexts';
import {
  useGetResumeLinkQuery,
  useGetResumesEligibilityQuery,
} from '../../../services/resumeService';
import styles from './ResumeChoiceSelect.module.scss';
import BlockerPoints from './BlockerPoints';

// Set the worker source for PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function ResumeChoiceOptionLabel({ value }) {
  const { selectedResume, setSelectedResume } = useApplicationFormContext();
  const { resume_details, is_blocker } = value || {};
  const { id, name, modified_at } = resume_details || {};
  const isSelected = selectedResume === id && !is_blocker;

  const handleChange = () => {
    setSelectedResume(id);
  };

  return (
    <Radio
      onChange={handleChange}
      checked={isSelected}
      className={classNames(styles.resumeChoiceOptionLabel, {
        [styles.resumeChoiceOptionLabelChecked]: isSelected,
      })}
      disabled={is_blocker}
    >
      <Flex vertical gap={12} className={styles.resumeChoiceOptionLabelContent}>
        <Flex>
          <Flex vertical gap={4}>
            <Typography.Text className={styles.resumeChoiceOptionLabelName}>
              {name}
            </Typography.Text>
            <Typography.Text
              className={styles.resumeChoiceOptionLabelModifiedAt}
            >
              Last Modified: {toDDMMYY(modified_at, '/')}
            </Typography.Text>
          </Flex>
        </Flex>
        <BlockerPoints value={value} />
      </Flex>
    </Radio>
  );
}

function ResumePreview() {
  const { selectedResume } = useApplicationFormContext();
  const { data, isFetching } = useGetResumeLinkQuery(
    { resumeId: selectedResume },
    { skip: !selectedResume }
  );

  if (!data?.link || isFetching) {
    return <Skeleton active />;
  }

  return (
    <Document
      className={styles.resumePreview}
      file={data?.link}
      loading={<Skeleton active />}
    >
      <Page pageNumber={1} />
    </Document>
  );
}

function ResumeChoiceSelect() {
  const { setSelectedResume } = useApplicationFormContext();
  const { jobProfileId } = useApplicationFormContext();
  const { data, isLoading } = useGetResumesEligibilityQuery({ jobProfileId });

  useEffect(() => {
    if (!data) return;

    const defaultResumeId = Object.values(data).find(
      (value) => value?.resume_details?.default && !value?.is_blocker
    )?.resume_details?.id;

    setSelectedResume(defaultResumeId);
  }, [data, setSelectedResume]);

  if (isLoading || !data) {
    return <Skeleton active />;
  }

  return (
    <Flex className={styles.container}>
      <Flex flex={1} vertical gap={16}>
        {Object.entries(data).map(([key, value]) => {
          return <ResumeChoiceOptionLabel key={key} value={value} />;
        })}
        {/* {Object.keys(data).length < MAX_RESUMES && (
          <Button
            type="link"
            onClick={onAddResume}
            className={styles.createNewResumeButton}
          >
            <PlusOutlined />
            Create New Resume
          </Button>
        )} */}
      </Flex>
      <Flex className={styles.resumePreviewContainer} flex={1}>
        <ResumePreview />
      </Flex>
    </Flex>
  );
}

export default ResumeChoiceSelect;
