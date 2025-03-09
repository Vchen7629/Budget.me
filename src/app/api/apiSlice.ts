import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials } from '../api-slices/userSlice.ts'

const baseQuery = fetchBaseQuery({
    //baseUrl: 'https://api.atlaxiom.com:8443',
    baseUrl: 'http://127.0.0.1:5000',
    credentials: 'include',
    prepareHeaders: (headers, { getState }: any) => {
        const token = getState().auth.token 

        if (token) {
            headers.set("authorization", `Bearer ${token}`)
        }

        return headers
    }
})

export const apiSlice = createApi({
    baseQuery: baseQuery,
    tagTypes: ['User'],
    endpoints: () => ({})
})

