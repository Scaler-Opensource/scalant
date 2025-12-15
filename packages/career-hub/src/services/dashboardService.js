import { careerHubApi } from './baseService';

const dashboardService = careerHubApi.injectEndpoints({
  endpoints: () => ({}),
});

export default dashboardService;
