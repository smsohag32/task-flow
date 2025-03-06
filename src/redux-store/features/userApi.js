import { apiSlice } from "../slices/apiSlice";

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
      registerUser: builder.mutation({
         query: (data) => ({
            url: `/register`,
            method: "POST",
            body: data,
         }),
         invalidatesTags: ["user"],
      }),
   }),
});

export const { useChangePassMutation, useRegisterUserMutation } = userApi;
