import { apiSlice } from "../../api/apiSlice"

export const reviewsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({

    getReviews: builder.query({
      query: (announcementID) => `/review/get-reviews/${announcementID}`,
      providesTags: ['Revs']
    }),
    getAnnounementReviews: builder.query({
      query: (announcementID) => `/get-reviews/${announcementID}`,
      providesTags: ['Rev']
    }),
    addReview: builder.mutation({
      query: ({announcementID, comment, rating}) => ({
        url: `/review/add/${announcementID}`,
        method: 'POST',
        body: {comment, rating}
      }),
      invalidatesTags: ['Rev', 'Revs']
    }),
    updateReview: builder.mutation({
      query: ({reviewID, comment, rating}) => ({
        url: `/review/update/${reviewID}`,
        method: 'PATCH',
        body: {comment, rating}
      })
    }),
    deleteReview: builder.mutation({
      query: (reviewID) => ({
        url: `/review/delete/${reviewID}`,
        method: 'DELETE',
      }), 
      invalidatesTags: ['Rev', 'Revs']
    }),
  })
})

export const {
    useGetReviewsQuery,
    useGetAnnounementReviewsQuery,
    useAddReviewMutation,
    useUpdateReviewMutation,
    useDeleteReviewMutation
} = reviewsApiSlice