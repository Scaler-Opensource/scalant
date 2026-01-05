import PDFPreview from './PdfPreview';
import React from 'react';

export default {
  title: 'PDFPreview',
  component: PDFPreview,
};

// Dummy PDF link - using a sample PDF from Mozilla
const dummyPdfLink =
  'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf';

export const Default = () => (
  <PDFPreview
    pdfLink={dummyPdfLink}
    selectedResume="Sample Resume"
    isLoading={false}
    isFetching={false}
    isError={false}
  />
);

export const Loading = () => (
  <PDFPreview
    pdfLink={dummyPdfLink}
    selectedResume="Sample Resume"
    isLoading={true}
    isFetching={false}
    isError={false}
  />
);

export const Refreshing = () => (
  <PDFPreview
    pdfLink={dummyPdfLink}
    selectedResume="Sample Resume"
    isLoading={false}
    isFetching={true}
    isError={false}
  />
);

export const Error = () => (
  <PDFPreview
    pdfLink={dummyPdfLink}
    selectedResume="Sample Resume"
    isLoading={false}
    isFetching={false}
    isError={true}
  />
);

export const Invalid = () => (
  <PDFPreview
    pdfLink="https://www.google.com"
    selectedResume="Sample Resume"
    isLoading={false}
    isFetching={false}
    isError={false}
  />
);

export const InvalidWithDelay = () => {
  const [pdfLink, setPdfLink] = React.useState('https://www.google.com');
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setPdfLink(dummyPdfLink);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <PDFPreview
      pdfLink={pdfLink}
      selectedResume="Sample Resume"
      isLoading={false}
      isFetching={false}
      isError={false}
    />
  );
};
