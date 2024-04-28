import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:4000/api',
    credentials: 'include',
})

export const apiSlice = createApi({
  baseQuery: baseQuery,
  // tagTypes: ['Submissions'],
  endpoints: builder => ({})
})


