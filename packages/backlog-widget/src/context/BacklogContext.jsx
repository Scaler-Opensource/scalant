import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useEffect,
} from 'react';

// Initial state
const initialState = {
  backlog: null,
  scheduledDays: null,
  backlogItems: null,
  loading: false,
  error: null,
  baseUrl: typeof window !== 'undefined' ? window.location.origin : '',
};

// Action types
const ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  SET_BACKLOG: 'SET_BACKLOG',
  SET_SCHEDULED_DAYS: 'SET_SCHEDULED_DAYS',
  SET_BACKLOG_ITEMS: 'SET_BACKLOG_ITEMS',
  SET_BASE_URL: 'SET_BASE_URL',
};

// Reducer
const backlogReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload };
    case ACTIONS.SET_ERROR:
      return { ...state, error: action.payload };
    case ACTIONS.SET_BACKLOG:
      return { ...state, backlog: action.payload };
    case ACTIONS.SET_SCHEDULED_DAYS:
      return { ...state, scheduledDays: action.payload };
    case ACTIONS.SET_BACKLOG_ITEMS:
      return { ...state, backlogItems: action.payload };
    case ACTIONS.SET_BASE_URL:
      return { ...state, baseUrl: action.payload };
    default:
      return state;
  }
};

// API functions
const apiCall = async (url, options = {}) => {
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // Add CSRF token if available
  if (typeof window !== 'undefined') {
    const csrfMeta = document.querySelector('meta[name="csrf-token"]');
    if (csrfMeta) {
      headers['X-CSRF-Token'] = csrfMeta.content;
    }
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

// Create context
const BacklogContext = createContext();

// Provider component
export const BacklogProvider = ({ children, baseUrl: initialBaseUrl }) => {
  const [state, dispatch] = useReducer(backlogReducer, {
    ...initialState,
    baseUrl: initialBaseUrl || initialState.baseUrl,
  });

  // Set base URL
  const setBaseUrl = useCallback(
    (url) => {
      if (url !== state.baseUrl) {
        dispatch({ type: ACTIONS.SET_BASE_URL, payload: url });
      }
    },
    [state.baseUrl]
  );

  // Get backlog data
  const getBacklog = useCallback(async () => {
    try {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true });
      dispatch({ type: ACTIONS.SET_ERROR, payload: null });

      const data = await apiCall(`${state.baseUrl}/api/v3/mentee/backlog`);
      dispatch({ type: ACTIONS.SET_BACKLOG, payload: data });
      return data;
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
      throw error;
    } finally {
      dispatch({ type: ACTIONS.SET_LOADING, payload: false });
    }
  }, [state.baseUrl]);

  // Create schedule
  const createSchedule = useCallback(
    async (payload) => {
      try {
        dispatch({ type: ACTIONS.SET_LOADING, payload: true });
        dispatch({ type: ACTIONS.SET_ERROR, payload: null });

        const data = await apiCall(`${state.baseUrl}/api/v3/mentee/backlog`, {
          method: 'POST',
          body: JSON.stringify(payload),
        });
        console.log('hfuhfufhufhuehufe', data);
        return data;
      } catch (error) {
        dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
        throw error;
      } finally {
        dispatch({ type: ACTIONS.SET_LOADING, payload: false });
      }
    },
    [state.baseUrl]
  );

  // Get initial data
  const getInitialData = useCallback(async () => {
    try {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true });
      dispatch({ type: ACTIONS.SET_ERROR, payload: null });

      const data = await apiCall(
        `${state.baseUrl}/academy/mentee-dashboard/initial-load-data/`
      );
      return data;
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
      throw error;
    } finally {
      dispatch({ type: ACTIONS.SET_LOADING, payload: false });
    }
  }, [state.baseUrl]);

  // Get scheduled days
  const getScheduledDays = useCallback(
    async (moduleId) => {
      try {
        dispatch({ type: ACTIONS.SET_LOADING, payload: true });
        dispatch({ type: ACTIONS.SET_ERROR, payload: null });

        const data = await apiCall(
          `${state.baseUrl}/api/v3/mentee/scheduled-days/${moduleId}`
        );
        dispatch({ type: ACTIONS.SET_SCHEDULED_DAYS, payload: data });
        return data;
      } catch (error) {
        dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
        throw error;
      } finally {
        dispatch({ type: ACTIONS.SET_LOADING, payload: false });
      }
    },
    [state.baseUrl]
  );

  // Submit plan
  const submitPlan = useCallback(
    async (planData) => {
      try {
        dispatch({ type: ACTIONS.SET_LOADING, payload: true });
        dispatch({ type: ACTIONS.SET_ERROR, payload: null });

        const data = await apiCall(
          `${state.baseUrl}/api/v3/mentee/submit-plan`,
          {
            method: 'POST',
            body: JSON.stringify(planData),
          }
        );
        return data;
      } catch (error) {
        dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
        throw error;
      } finally {
        dispatch({ type: ACTIONS.SET_LOADING, payload: false });
      }
    },
    [state.baseUrl]
  );

  // Get backlog items
  const getBacklogItems = useCallback(
    async (moduleId) => {
      try {
        dispatch({ type: ACTIONS.SET_LOADING, payload: true });
        dispatch({ type: ACTIONS.SET_ERROR, payload: null });

        const data = await apiCall(
          `${state.baseUrl}/api/v3/mentee/backlog-items/${moduleId}`
        );
        dispatch({ type: ACTIONS.SET_BACKLOG_ITEMS, payload: data });
        return data;
      } catch (error) {
        dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
        throw error;
      } finally {
        dispatch({ type: ACTIONS.SET_LOADING, payload: false });
      }
    },
    [state.baseUrl]
  );

  // Context value
  const value = {
    ...state,
    setBaseUrl,
    getBacklog,
    createSchedule,
    getInitialData,
    getScheduledDays,
    submitPlan,
    getBacklogItems,
  };

  return (
    <BacklogContext.Provider value={value}>{children}</BacklogContext.Provider>
  );
};

// Custom hooks
export const useBacklog = () => {
  const context = useContext(BacklogContext);
  if (!context) {
    throw new Error('useBacklog must be used within a BacklogProvider');
  }
  return context;
};

export const useGetBacklogQuery = () => {
  const { backlog, loading, error, getBacklog } = useBacklog();

  useEffect(() => {
    if (!backlog) {
      getBacklog();
    }
  }, [backlog, getBacklog]);

  const refetch = useCallback(() => {
    getBacklog();
  }, [getBacklog]);

  return { data: backlog, isLoading: loading, error, refetch };
};

export const useCreateScheduleMutation = () => {
  const { createSchedule, loading, error } = useBacklog();

  return [createSchedule, { isLoading: loading, error }];
};

export const useGetInitialDataQuery = () => {
  const { getInitialData, loading, error } = useBacklog();

  return { refetch: getInitialData, isLoading: loading, error };
};

export default BacklogContext;
