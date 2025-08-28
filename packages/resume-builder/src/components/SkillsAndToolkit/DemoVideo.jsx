import React, { useRef, useEffect } from 'react';

import styles from './SkillsAndToolkit.module.scss';

const DEMO_VIDEO_URL =
  'https://ib-assessment-tests.s3.us-west-2.amazonaws.com/guide_videos/Skills+and+Tech+Stack.mp4'; // Replace with any dummy video URL

const DemoVideo = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, []);

  return (
    <video
      ref={videoRef}
      src={DEMO_VIDEO_URL}
      width="100%"
      controls
      autoPlay
      className={styles.demoVideo}
      poster="https://dummyimage.com/600x340/000/fff&text=WHY+DO+WE+HAVE+LIMITED+NUMBER+OF+SKILLS?"
    />
  );
};

export default DemoVideo;
