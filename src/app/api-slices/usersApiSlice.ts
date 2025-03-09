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
        GetUserData: builder.query<any[], void>({
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
        }),
        AddNewIncomeSource: builder.mutation<any[], any[] >({
            query: () => ({
                url: '/addSingle',
                method: 'POST',
                body: {
                    initialUserData
                },
            }),
            invalidatesTags: [
                { type: 'User', id: "LIST" }
            ]
        }),
        AddNewExpense: builder.mutation<any[], { spendingValue: string, description: string, date: string }>({
            query: ({ spendingValue, description, date }) => ({
                url: `/addSingle`,
                method: 'POST',
                body: {
                    spendingValue,
                    description,
                    date,
                    required: "1"
                },
            }),
        })
    }),
})

export const { 
    useSendUsernameMutation,
    useGetUserDataQuery,
    useAddNewIncomeSourceMutation,
    useAddNewExpenseMutation
} = usersApiSlice
