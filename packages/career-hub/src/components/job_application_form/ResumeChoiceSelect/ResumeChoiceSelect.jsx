import React, { useEffect } from 'react';
import { Flex, Radio, Skeleton, Typography } from 'antd';
import { Document, Page, pdfjs } from 'react-pdf';
// import {
//   DownOutlined,
//   ExclamationCircleTwoTone,
//   UpOutlined,
// } from '@ant-design/icons';
import { toDDMMYY } from '../../../utils/date';
import { useApplicationFormContext } from '../../../contexts';
import {
  useGetResumeLinkQuery,
  useGetResumesEligibilityQuery,
} from '../../../services/resumeService';
import styles from './ResumeChoiceSelect.module.scss';
import classNames from 'classnames';

// Set the worker source for PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function ResumeChoiceOptionLabel({ value }) {
  const { selectedResume, setSelectedResume } = useApplicationFormContext();
  const { resume_details } = value || {};
  const { id, name, modified_at } = resume_details || {};
  // const [isCollapsed, setIsCollapsed] = useState(true);

  const handleChange = () => {
    setSelectedResume(id);
  };

  // const handleCollapse = () => {
  //   setIsCollapsed(!isCollapsed);
  // };

  return (
    <Radio
      onChange={handleChange}
      checked={selectedResume === id}
      className={classNames(styles.resumeChoiceOptionLabel, {
        [styles.resumeChoiceOptionLabelChecked]: selectedResume === id,
      })}
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
        {/* <Card size="small" rootClassName={styles.resumeChoiceOptionLabelCard}>
          <Flex gap={8} className={styles.resumeChoiceOptionLabelCardHeader}>
            <ExclamationCircleTwoTone twoToneColor="#FAAD14" />
            <Typography.Text>Improvements to be made (2)</Typography.Text>
            <Button
              type="link"
              className={styles.resumeChoiceOptionLabelEditButton}
            >
              Edit
            </Button>
            <Button
              type="text"
              className={styles.resumeChoiceOptionLabelCollapseButton}
              onClick={handleCollapse}
            >
              {isCollapsed ? <DownOutlined /> : <UpOutlined />}
            </Button>
          </Flex>
          {!isCollapsed && (
            <ul className={styles.resumeChoiceOptionLabelImprovementsList}>
              <li>Missing skills to be added: SQL (+1yr exp) </li>
              <li>
                Missing project: Tech stack used to build and test product
              </li>
            </ul>
          )}
        </Card> */}
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
      (value) => value?.resume_details?.default
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
      </Flex>
      <Flex className={styles.resumePreviewContainer} flex={1}>
        <ResumePreview />
      </Flex>
    </Flex>
  );
}

export default ResumeChoiceSelect;
