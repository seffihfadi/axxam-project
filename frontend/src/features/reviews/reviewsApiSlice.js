import { apiSlice } from "../../api/apiSlice"

export const reviewsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({

    getReviews: builder.query({
      query: (announcementID) => `/review/get-reviews/${announcementID}`,
    }),
    
  })
})

export const {

    useGetReviewsQuery,
    

} = reviewsApiSlice