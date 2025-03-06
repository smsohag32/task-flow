import { apiSlice } from "../slices/apiSlice";

const taskApi = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
      getAllTasks: builder.query({
         query: () => ({
            url: "/tasks/all",
         }),
         providesTags: ["tasks"],
      }),
      getTaskById: builder.query({
         query: (id) => ({
            url: `/task/${id}`,
         }),
         providesTags: (result, error, id) => [{ type: "tasks", id }],
      }),
      createTask: builder.mutation({
         query: (newTask) => ({
            url: "/task",
            method: "POST",
            body: newTask,
         }),
         invalidatesTags: ["tasks"],
      }),
      updateTask: builder.mutation({
         query: ({ id, updatedData }) => ({
            url: `/task/${id}`,
            method: "PUT",
            body: updatedData,
         }),
         invalidatesTags: (result, error, { id }) => [{ type: "tasks", id }],
      }),
      changeTaskStatus: builder.mutation({
         query: ({ id, status }) => ({
            url: `/task/${id}/status`,
            method: "PATCH",
            body: { status },
         }),
         invalidatesTags: (result, error, { id }) => [{ type: "tasks", id }],
      }),
      deleteTask: builder.mutation({
         query: (id) => ({
            url: `/task/${id}`,
            method: "DELETE",
         }),
         invalidatesTags: (result, error, id) => [{ type: "tasks", id }],
      }),
   }),
});

export const {
   useGetAllTasksQuery,
   useGetTaskByIdQuery,
   useCreateTaskMutation,
   useUpdateTaskMutation,
   useChangeTaskStatusMutation,
   useDeleteTaskMutation,
} = taskApi;
