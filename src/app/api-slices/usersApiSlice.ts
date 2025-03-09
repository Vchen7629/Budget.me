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
        AddNewIncomeSource: builder.mutation<any[], { incomeValue: string, description: string, date: string } >({
            query: ({ incomeValue, description, date}) => {
                const formData = new FormData()
                formData.append('date', date)
                formData.append('description', description)
                formData.append('amount', incomeValue)
                formData.append('required', "-1")

                return {
                    url: '/addEntry',
                    method: 'POST',
                    body: formData,
                    formData: true,
                }
            },
            invalidatesTags: [
                { type: 'User', id: "LIST" }
            ]
        }),
        AddNewExpense: builder.mutation<any[], { spendingValue: string, description: string, date: string }>({
            query: ({ spendingValue, description, date }) => {
                const formData = new FormData()
                formData.append('date', date)
                formData.append('description', description)
                formData.append('amount', spendingValue)
                formData.append('required', "1")
                
                return {
                    url: `/addEntry`,
                    method: 'POST',
                    body: formData,
                    formData: true,
                };
            },
        }),
        DeleteEntry: builder.mutation<any[], string>({
            query: (data) => ({
                url: '/removeEntry',
                method: 'DELETE',
                body: data,
            })
        })
    }),
})

export const { 
    useSendUsernameMutation,
    useGetUserDataQuery,
    useAddNewIncomeSourceMutation,
    useAddNewExpenseMutation,
    useDeleteEntryMutation
} = usersApiSlice
