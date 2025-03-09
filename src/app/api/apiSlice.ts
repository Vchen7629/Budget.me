import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://127.0.0.1:5000',
    credentials: 'include',
})

export const apiSlice = createApi({
    baseQuery: baseQuery,
    tagTypes: ['User'],
    endpoints: () => ({})
})

