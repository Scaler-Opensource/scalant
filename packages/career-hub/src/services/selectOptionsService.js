import baseService from './baseService';

const selectOptionsService = baseService.injectEndpoints({
  endpoints: (builder) => ({
    getSelectOptions: builder.query({
      query: ({ fieldType, query }) => ({
        url: '/job-tracker/v1/custom-data',
        params: {
          field_type: fieldType,
          query,
        },
      }),
      transformResponse: (response, meta, arg) => {
        const entries = response?.[arg?.fieldType] || [];

        return (
          entries?.map((company) => ({
            text: company,
            value: company,
          })) || []
        );
      },
    }),
  }),
});

export const { useLazyGetSelectOptionsQuery } = selectOptionsService;
