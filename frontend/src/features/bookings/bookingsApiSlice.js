import { apiSlice } from "../../api/apiSlice"

export const bookingsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({

    getAnnouncements: builder.query({
      query: () => '/announcement/search',
      providesTags: ['Saved']
    }),
    getProperty: builder.query({
      query: (announcementID) => `/announcement/get/${announcementID}`,
      providesTags: ['Saved']
    }),

    saveProperty: builder.mutation({
      // query: (announcementID) => `/announcement/save/${announcementID}`,
      query: (announcementID) => ({
        url: `/announcement/save/${announcementID}`,
        method: 'GET',
      }),
      invalidatesTags: ['Saved']
    }),

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
    useCreateCheckoutSessionMutation,
    useSavePropertyMutation
    

} = bookingsApiSlice