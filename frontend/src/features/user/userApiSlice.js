import { apiSlice } from "../../api/apiSlice"

export const useApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getUser : builder.query({
      query: () => '/get-user',
    }),
    getUserId: builder.query({
      query: (userID) => `user/get-user-by-id/${userID}`
    })
  })
})

export const {
  useGetUserQuery,
  useGetUserIdQuery,
} = useApiSlice