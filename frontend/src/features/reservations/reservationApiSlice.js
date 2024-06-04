

import { apiSlice } from "../../api/apiSlice"

export const bookingsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getLesseeReservations: builder.query({
      query: () => '/reservation/get-lessee',
      providesTags: ['LesseeRes']
    }),

    getLessorReservations: builder.query({
      query: () => '/reservation/get-lessor',
      providesTags: ['LessorRes']
    }),

    handleReservation: builder.mutation({
      query: ({decision, reservationID}) => ({
        url: `/reservation/handle/${reservationID}`,
        method: 'PATCH',
        body: {decision}
      }),
      invalidatesTags: ['LessorRes', 'LesseeRes']
    }),
    handleCancel: builder.mutation({
      query: (reservationID) => ({
        url: `/reservation/cancel/${reservationID}`,
        method: 'PATCH',
      }),
      invalidatesTags: ['LessorRes', 'LesseeRes']
    }),
  })
})

export const {
  useGetLesseeReservationsQuery,
  useGetLessorReservationsQuery,
  useHandleReservationMutation,
  useHandleCancelMutation
    

} = bookingsApiSlice