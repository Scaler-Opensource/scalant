import React from 'react';
import { BacklogProvider } from '../../context';

const BacklogWidgetProvider = ({ children, baseUrl }) => {
  return <BacklogProvider baseUrl={baseUrl}>{children}</BacklogProvider>;
};

export default BacklogWidgetProvider;
