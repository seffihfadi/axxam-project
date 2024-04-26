import { apiSlice } from "../../api/apiSlice"

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getUser: builder.query({
      query: () => '/user/get-user',
      providesTags: ['User'],
      refetchOnMount: true,
      refetchOnReconnect: true,
    }),
    sendOtp: builder.mutation({
      query: ({phone, type}) => ({
        url: `/user/${type}/send-otp`,
        method: 'POST',
        body: {phone, type}
      })
    }),
    verifyOtp: builder.mutation({
      query: ({phone, otp}) => ({
        url: `/user/verify-otp`,
        method: 'POST',
        body: {phone, otp}
      }),
      invalidatesTags: ['User']
    }),
    updateAdditional: builder.mutation({
      query: ({gender, livesIn, bio}) => ({
        url: '/user/update-additional',
        method: 'PATCH',
        body: {gender, livesIn, bio}
      })
    }),
    signup: builder.mutation({
      query: ({fullname, birthDate, image, phone}) => ({
        url: '/user/signup',
        method: 'PATCH',
        body: {fullname, birthDate, image, phone}
      }),
      invalidatesTags: ['User']
    }),
    signout: builder.mutation({
      query: () => ({
        url: '/user/signout'
      }),
      invalidatesTags: ['User']
    }),
    joinUs: builder.mutation({
      query: ({token, email}) => ({
        url: '/user/join-us',
        method: 'POST',
        body: {token, email}
      }),
    }),
  })
})

export const {

    useGetUserQuery,
    useSignoutMutation,
    useSignupMutation,
    useSendOtpMutation,
    useVerifyOtpMutation,
    useUpdateAdditionalMutation,
    useJoinUsMutation

} = authApiSlice