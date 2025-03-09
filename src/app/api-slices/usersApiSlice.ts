import { apiSlice } from "../api/apiSlice"

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
        GetUserData: builder.query<any | null, void>({
            query: () => ({
                url: `/viewData`,
                method: "GET",
            }),
            transformResponse: (responseData) => {
                return responseData;
            },
        })
    }),
})

export const { 
    useSendUsernameMutation,
    useGetUserDataQuery
} = usersApiSlice
