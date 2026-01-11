import React from 'react';
import CareerHub from './CareerHub';

export default {
  title: 'Pages/CareerHub',
  component: CareerHub,
};

export const Default = () => (
  <CareerHub 
    basename="" 
    skipProvider={true} 
    skipRouter={true} 
  />
);

Default.storyName = 'Career Hub with Navigation';

