import { apiSlice } from "../slice/apiSlice";

const taskApi = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
      getTest: builder.query({
         query: () => ({
            url: `/product`,
         }),
         providesTags: ["dsr"],
      }),
   }),
});

export const { useGetTestQuery } = taskApi;
