import { useEffect, useRef } from 'react';
import { createConsumer } from '@rails/actioncable';
import { useGetCurrentUserSlugQuery } from '../services/resumeBuilderApi';

const useMenteeChannel = (onReceiveData, enabled = true) => {
  const consumerRef = useRef(null);
  const subscriptionRef = useRef(null);

  // Fetch user slug from backend API for websocket authentication
  const { data: userSlugData, isLoading: isLoadingSlug } = useGetCurrentUserSlugQuery(undefined, {
    skip: !enabled, // Only fetch when enabled
  });

  useEffect(() => {
    if (!enabled) return;
    if (isLoadingSlug) return; // Wait for slug to be fetched
    if (!userSlugData?.slug) return; // Don't connect if slug is not available

    const userSlug = userSlugData.slug;

    // Create consumer with user slug as token (ActionCable expects user slug as token)
    // Use relative URL for production compatibility (works with both http and https)
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const host = window.location.host;
    const url = `${protocol}//${host}/cable?token=${userSlug}`;
    consumerRef.current = createConsumer(url);

    // Subscribe to MenteeChannel
    subscriptionRef.current = consumerRef.current.subscriptions.create('MenteeChannel', {
      received(data) {
        // Handle live_update_data events
        if (data._type === 'live_update_data') {
          onReceiveData(data.data);
        }
        // Handle ai_resume_parser_data events
        else if (data._type === 'ai_resume_parser_data') {
          onReceiveData(data.data);
        }
      },
    });

    return () => {
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe();
      }
      if (consumerRef.current) {
        consumerRef.current.disconnect();
      }
    };
  }, [onReceiveData, enabled, isLoadingSlug, userSlugData]);

  return subscriptionRef.current;
};

export default useMenteeChannel;