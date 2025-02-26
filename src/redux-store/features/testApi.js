import { apiSlice } from "../slice/apiSlice";

const testApi = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
      getTest: builder.query({
         query: () => ({
            url: `/product`,
         }),
         providesTags: ["dsr"],
      }),
   }),
});

export const { useGetTestQuery } = testApi;
