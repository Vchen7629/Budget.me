import { apiSlice } from "../api/apiSlice"
import Papa from 'papaparse';


export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        sendUsername: builder.mutation<string, { username: string}>({
            query: initialUserData => ({
                url: '/username',
                method: 'POST',
                body: initialUserData,
            }),
            invalidatesTags: [
                { type: 'User', id: "LIST" }
            ]
        }),
        GetUserData: builder.query<any[], any[]>({
            query: () => ({
                url: `/viewData`,
                method: "GET",
                responseHandler: response => response.text(),
            }),
            transformResponse: (responseData: string[]) => {
                return Papa.parse(responseData as any, {
                    header: true,
                    skipEmptyLines: true,
                    dynamicTyping: true,
                    transformHeader: (header) => header.trim(),
                    transform: (value) => {
                        return typeof value === 'string' ? value.trim() : value;
                    }
                }).data
            },
        })
    }),
})

export const { 
    useSendUsernameMutation,
    useGetUserDataQuery
} = usersApiSlice
