import { apiSlice } from "../../api/apiSlice"

export const bookingsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({

    getAnnouncements: builder.query({
      query: () => '/announcement/search',
    }),
    getProperty: builder.query({
      query: (announcementID) => `/announcement/get/${announcementID}`,
    }),
    // reservation/create-checkout-session/
    createCheckoutSession: builder.mutation({
      query: ({reservationDetails, announcementID}) => ({
        url: `reservation/create-checkout-session/${announcementID}`,
        method: 'POST',
        body: reservationDetails
      })
    })
  })
})

export const {

    useGetAnnouncementsQuery,
    useGetPropertyQuery,
    useCreateCheckoutSessionMutation
    

} = bookingsApiSlice