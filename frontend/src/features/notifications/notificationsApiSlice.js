import { apiSlice } from "../../api/apiSlice"

export const notificationsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({

    getNotification: builder.query({
      query: () => '/notification/',
    }),
    markNotificationAsSeen: builder.mutation({
      query: ({note, from}) => ({
        url: `/notification/seen`,
        method: 'PATCH',
        body: {note, from}
      })
    })
  })
})

export const {
    useGetNotificationQuery,
    useMarkNotificationAsSeenMutation
  } = notificationsApiSlice