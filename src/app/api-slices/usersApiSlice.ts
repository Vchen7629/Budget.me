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
        GetUserData: builder.query<any | null, string>({
            query: () => ({
                url: `/viewdata`,
                method: "GET",
            }),
            transformResponse: (responseData) => {
                return responseData;
            },
        })
    }),
})

export const { 
    useSendUsernameMutation
} = usersApiSlice
