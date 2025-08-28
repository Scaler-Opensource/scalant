import React, { useState, useEffect } from 'react';
import { Flex, Button, Empty, message } from 'antd';
import { Document, Page, pdfjs } from 'react-pdf';
import {
  LeftOutlined,
  RightOutlined,
  LoadingOutlined,
  FileTextTwoTone,
  DownloadOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import { downloadFile } from '../../utils/downloadUtils';
import ErrorBoundary from './ErrorBoundary';

import styles from './PdfPreview.module.scss';

// Set the worker source for PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const MESSAGES = {
  loading: {
    initial: 'Loading your resume preview...',
    refreshing: 'Refreshing your resume preview...',
  },
  error: {
    preview: 'Error loading resume preview',
  },
};

const MAX_RETRY_COUNT = 6;

const LoadingLayout = ({ message = MESSAGES.loading.initial }) => (
  <Flex
    vertical
    align="center"
    justify="center"
    className={styles.loadingContainer}
  >
    <LoadingOutlined className={styles.loader} />
    <span className={styles.loadingText}>{message}</span>
  </Flex>
);

const ErrorLayout = ({ onRetry }) => (
  <Flex
    vertical
    align="center"
    justify="center"
    className={styles.loadingContainer}
  >
    <Empty
      description={MESSAGES.error.preview}
      image={Empty.PRESENTED_IMAGE_SIMPLE}
    />
    <Button
      type="primary"
      icon={<ReloadOutlined />}
      onClick={onRetry}
      style={{ marginTop: '16px' }}
    >
      Retry Preview
    </Button>
  </Flex>
);

const PdfPreview = ({
  pdfLink,
  selectedResume,
  isLoading = false,
  isFetching = false,
  isError = false,
  onDownloadClick,
}) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    setRetryCount(0);
  }, [pdfLink]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const onDocumentLoadError = (error) => {
    if (retryCount < MAX_RETRY_COUNT) {
      // eslint-disable-next-line no-undef
      setTimeout(() => {
        setRetryCount(retryCount + 1);
      }, 1000);
    } else {
      // eslint-disable-next-line no-console, no-undef
      console.error('Error while loading pdf! ', error.message);
    }
  };

  const handleRetry = () => {
    setRetryCount(0);
  };

  const changePage = (offset) => {
    setPageNumber((prevPageNumber) => {
      const newPageNumber = prevPageNumber + offset;
      return Math.min(Math.max(1, newPageNumber), numPages);
    });
  };

  const previousPage = () => changePage(-1);
  const nextPage = () => changePage(1);

  const handleDownload = () => {
    try {
      downloadFile(pdfLink, `resume.pdf`);
      message.success('Resume will be downloaded in a moment');
      onDownloadClick?.();
    } catch {
      message.error('Failed to download resume. Please try again.');
    }
  };

  // Show error state if needed
  if (isError) {
    return <ErrorLayout onRetry={handleRetry} />;
  }

  // Show loading state for initial load or refetching
  if (isLoading || isFetching || !pdfLink) {
    return (
      <LoadingLayout
        message={
          isLoading ? MESSAGES.loading.initial : MESSAGES.loading.refreshing
        }
      />
    );
  }

  return (
    <Flex
      vertical
      align="stretch"
      justify="center"
      className={styles.container}
    >
      <Flex className={styles.header} align="center" justify="space-between">
        <h4 className={styles.title}>
          <FileTextTwoTone className={styles.icon} />
          {selectedResume}
        </h4>
        <Flex align="center">
          <Button
            type="text"
            icon={<LeftOutlined />}
            onClick={previousPage}
            disabled={pageNumber <= 1}
            className={styles.paginationArrow}
            size="small"
          />
          <span className={styles.paginationPageNumber}>{pageNumber}</span>
          <span className={styles.paginationSlash}>/</span>
          <span className={styles.paginationTotal}>{numPages || '--'}</span>
          <Button
            type="text"
            icon={<RightOutlined />}
            onClick={nextPage}
            disabled={pageNumber >= numPages}
            className={styles.paginationArrow}
            size="small"
          />
        </Flex>
        <Button type="primary" onClick={handleDownload}>
          <DownloadOutlined className={styles.downloadIcon} /> Download
        </Button>
      </Flex>
      <Flex align="center" justify="center">
        <ErrorBoundary className={styles.document}>
          <Document
            file={pdfLink}
            className={styles.document}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            loading={<LoadingLayout message="Loading PDF document..." />}
            error={
              retryCount >= MAX_RETRY_COUNT ? (
                <ErrorLayout onRetry={handleRetry} />
              ) : (
                <LoadingLayout message="Loading PDF document..." />
              )
            }
            key={retryCount} // Force re-render on retry
          >
            <Page
              pageNumber={pageNumber}
              className={styles.page}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          </Document>
        </ErrorBoundary>
      </Flex>
    </Flex>
  );
};

export default PdfPreview;
