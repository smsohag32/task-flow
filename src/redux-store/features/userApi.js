import { apiSlice } from "../slice/apiSlice";

const userApi = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
      changePass: builder.mutation({
         query: (data) => ({
            url: `/users/change-password`,
            method: "PUT",
            body: data,
         }),
         invalidatesTags: ["user"],
      }),
   }),
});

export const { useChangePassMutation } = userApi;
