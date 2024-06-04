

import { apiSlice } from "../../api/apiSlice"

export const bookingsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getLesseeReservations: builder.query({
      query: () => '/reservation/get-lessee',
    }),

    getLessorReservations: builder.query({
      query: () => '/reservation/get-lessor'
    }),

    handleReservation: builder.mutation({
      query: () => ({
        url: `/get/:${reservationID}`,
        method: 'GET'
      })
    })
  })
})

export const {
  useGetLesseeReservationsQuery,
  useGetLessorReservationsQuery,
  useHandleReservationMutation,
    

} = bookingsApiSlice