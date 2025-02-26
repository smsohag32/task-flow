import { getCookie } from "@/utils/helper";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQueryWithAuth = async (args, api, extraOptions) => {
   const baseQuery = fetchBaseQuery({
      baseUrl: import.meta.env.VITE_BASE_URL,
      prepareHeaders: (headers) => {
         const token = getCookie("access_token");
         if (token) {
            headers.set("Authorization", `Bearer ${token}`);
         }
         return headers;
      },
   });
   let result = await baseQuery(args, api, extraOptions);
   if (result.error && (result.error.status === 401 || result.error.status === 403)) {
      window.location.href = "/auth/login";
   }
   return result;
};

export const apiSlice = createApi({
   reducerPath: "api",
   baseQuery: baseQueryWithAuth,
   tagTypes: ["task", "user"],
   endpoints: () => ({}),
});
