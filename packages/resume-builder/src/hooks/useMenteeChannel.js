import { useEffect, useRef } from 'react';
import { createConsumer } from '@rails/actioncable';
import { useGetCurrentUserSlugQuery } from '../services/resumeBuilderApi';

const useMenteeChannel = (onReceiveData, enabled = true) => {
  const consumerRef = useRef(null);
  const subscriptionRef = useRef(null);

  // Always fetch user slug from backend API (don't skip) so it's ready when needed
  // The websocket connection will only be established when enabled=true
  const { data: userSlugData, isLoading: isLoadingSlug, error: slugError } = useGetCurrentUserSlugQuery();

  useEffect(() => {
    // Only connect websocket when enabled, but slug is always fetched
    if (!enabled) {
      // Clean up websocket if disabled
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe();
        subscriptionRef.current = null;
      }
      if (consumerRef.current) {
        consumerRef.current.disconnect();
        consumerRef.current = null;
      }
      return;
    }
    
    if (isLoadingSlug) return; // Wait for slug to be fetched
    if (slugError) {
      console.error('[useMenteeChannel] Error fetching user slug:', slugError);
      return;
    }
    if (!userSlugData?.slug) {
      console.warn('[useMenteeChannel] User slug not available:', userSlugData);
      return; // Don't connect if slug is not available
    }

    const userSlug = userSlugData.slug;
    console.log('[useMenteeChannel] Connecting to websocket with slug:', userSlug);

    // Create consumer with user slug as token (ActionCable expects user slug as token)
    // Use relative URL for production compatibility (works with both http and https)
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const host = window.location.host;
    const url = `${protocol}//${host}/cable?token=${userSlug}`;
    console.log('[useMenteeChannel] Websocket URL:', url);
    
    try {
      consumerRef.current = createConsumer(url);

      // Subscribe to MenteeChannel
      subscriptionRef.current = consumerRef.current.subscriptions.create('MenteeChannel', {
        connected() {
          console.log('[useMenteeChannel] Websocket connected successfully');
        },
        disconnected() {
          console.warn('[useMenteeChannel] Websocket disconnected');
        },
        rejected() {
          console.error('[useMenteeChannel] Websocket connection rejected');
        },
        received(data) {
          console.log('[useMenteeChannel] Received data:', data);
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
    } catch (error) {
      console.error('[useMenteeChannel] Error creating websocket connection:', error);
    }

    return () => {
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe();
        subscriptionRef.current = null;
      }
      if (consumerRef.current) {
        consumerRef.current.disconnect();
        consumerRef.current = null;
      }
    };
  }, [onReceiveData, enabled, isLoadingSlug, userSlugData, slugError]);

  return subscriptionRef.current;
};

export default useMenteeChannel;