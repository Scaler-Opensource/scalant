import { useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPageNumber } from '../store/filterSlice';

/**
 * Custom hook for infinite scroll functionality
 * Uses Intersection Observer to detect when user scrolls near the bottom
 * and automatically loads the next page
 *
 * @param {Object} options - Configuration options
 * @param {boolean} options.hasMore - Whether there are more pages to load
 * @param {boolean} options.isLoading - Whether initial loading is in progress
 * @param {boolean} options.isFetchingMore - Whether additional pages are being fetched
 * @param {number} options.rootMargin - Margin around root for intersection (default: '100px')
 * @param {number} options.threshold - Threshold for intersection (default: 0.1)
 * @returns {Object} - { sentinelRef } - Callback ref to attach to sentinel element
 */
const useInfiniteScroll = ({
  hasMore = true,
  isLoading = false,
  isFetchingMore = false,
  rootMargin = '100px',
  threshold = 0.1,
} = {}) => {
  const dispatch = useDispatch();
  const pageNumber = useSelector(
    (state) => state.scalantCareerHub?.filter?.page_number || 1
  );
  const sentinelRef = useRef(null);
  const observerRef = useRef(null);

  const handleLoadMore = useCallback(() => {
    if (!isLoading && !isFetchingMore && hasMore) {
      dispatch(setPageNumber(pageNumber + 1));
    }
  }, [dispatch, pageNumber, isLoading, isFetchingMore, hasMore]);

  // Setup/cleanup observer when sentinel element or conditions change
  useEffect(() => {
    const sentinel = sentinelRef.current;

    // Cleanup existing observer
    if (observerRef.current) {
      if (sentinel) {
        observerRef.current.unobserve(sentinel);
      }
      observerRef.current = null;
    }

    // Don't setup observer if conditions aren't met
    if (!sentinel || !hasMore || isLoading || isFetchingMore) {
      return;
    }

    // Create and setup new observer
    // eslint-disable-next-line no-undef
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          handleLoadMore();
        }
      },
      {
        root: null,
        rootMargin,
        threshold,
      }
    );

    observer.observe(sentinel);
    observerRef.current = observer;

    return () => {
      if (observerRef.current && sentinel) {
        observerRef.current.unobserve(sentinel);
        observerRef.current = null;
      }
    };
  }, [
    handleLoadMore,
    hasMore,
    isLoading,
    isFetchingMore,
    rootMargin,
    threshold,
  ]);

  // Callback ref that gets called when element is mounted/unmounted
  // This ensures we have a reference to the DOM element as soon as it's rendered
  const setSentinelRef = useCallback(
    (node) => {
      // Cleanup previous observer if element is being removed
      if (sentinelRef.current && observerRef.current) {
        observerRef.current.unobserve(sentinelRef.current);
        observerRef.current = null;
      }

      sentinelRef.current = node;

      // If node exists and conditions are met, setup observer immediately
      if (node && hasMore && !isLoading && !isFetchingMore) {
        // eslint-disable-next-line no-undef
        const observer = new IntersectionObserver(
          (entries) => {
            const [entry] = entries;
            if (entry.isIntersecting) {
              handleLoadMore();
            }
          },
          {
            root: null,
            rootMargin,
            threshold,
          }
        );

        observer.observe(node);
        observerRef.current = observer;
      }
    },
    [handleLoadMore, hasMore, isLoading, isFetchingMore, rootMargin, threshold]
  );

  return { sentinelRef: setSentinelRef };
};

export default useInfiniteScroll;
