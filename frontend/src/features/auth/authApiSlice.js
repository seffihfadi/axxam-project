import { apiSlice } from "../api/apiSlice"

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getUser: builder.query({
      query: () => '/user/get-user',
    }),
    signin: builder.mutation({
      query: credentials => ({
        url: '/user/signin',
        method: 'POST',
        body: { ...credentials }
      })
    }),
    signout: builder.mutation({
      query: () => ({
        url: '/user/signout'
      }),
    }),
  })
})

export const {
    useGetUserQuery,
    useSigninMutation,
    useSignoutMutation
} = authApiSlice