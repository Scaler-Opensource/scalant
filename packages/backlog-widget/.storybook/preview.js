import React from 'react';
import { BacklogProvider } from '../src/context';

const withBacklogProvider = (Story) => {
  return React.createElement(BacklogProvider, null, React.createElement(Story));
};

// ✅ ESM-compatible export
export const decorators = [withBacklogProvider];

export const parameters = {
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/i,
    },
  },
  docs: {
    canvas: {
      sourceState: 'shown',
    },
  },
  backgrounds: {
    default: 'light',
    values: [
      {
        name: 'light',
        value: '#ffffff',
      },
      {
        name: 'dark',
        value: '#333333',
      },
      {
        name: 'gray',
        value: '#f5f5f5',
      },
    ],
  },
  viewport: {
    defaultViewport: 'responsive',
  },
  actions: { argTypesRegex: '^on[A-Z].*' },
  layout: 'centered',
};
