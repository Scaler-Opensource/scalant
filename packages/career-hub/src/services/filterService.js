import { careerHubApi } from './baseService';

const filterService = careerHubApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get companies
    getCompanies: builder.query({
      query: (keyword) => ({
        url: '/job-tracker/filters/',
        params: {
          query_type: 'companies',
          q: keyword,
        },
      }),
      transformResponse: (response) => {
        const companies = (response.data || []).map((entity) => ({
          id: entity.id,
          value: entity.attributes.name,
        }));
        return companies;
      },
      providesTags: ['FilterOptions'],
    }),
    // Get titles
    getTitles: builder.query({
      query: (keyword) => ({
        url: '/job-tracker/filters/',
        params: {
          query_type: 'title',
          q: keyword,
        },
      }),
      transformResponse: (response) => {
        const titles = (response.data || []).map((entity) => ({
          id: entity.id,
          value: entity.attributes.title || entity.attributes.name,
        }));

        let filteredOptions = {};
        titles.forEach((title) => {
          filteredOptions[title.value] = title.value;
        });

        return Object.keys(filteredOptions).map((key) => ({
          key,
          value: filteredOptions[key],
        }));
      },
      providesTags: ['FilterOptions'],
    }),
    // Get experience skills
    getExperienceSkills: builder.query({
      query: (keyword) => ({
        url: '/user/skills/all',
        params: {
          prefix_q: keyword,
        },
      }),
      transformResponse: (response) => {
        const skills = (response.all_skills || []).map((item) => ({
          skill_id: item.skill_id,
          key: item.key,
          skill_type: item.skill_type,
        }));

        return skills
          .filter((item) => item.key && item.skill_id && item.skill_type)
          .map((item) => ({
            key: item.skill_id,
            value: item.key,
            type: item.skill_type,
          }));
      },
      providesTags: ['FilterOptions'],
    }),
  }),
});

export const {
  useGetCompaniesQuery,
  useGetTitlesQuery,
  useGetExperienceSkillsQuery,
} = filterService;

export default filterService;
