import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"


const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://server-knc7.onrender.com/",
        credentials: 'include',
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token
            if (token) {
                headers.set("authorization", `Bearer ${token}`)
            }
            return headers 
        }

        }),
    endpoints: () => ({})
})

export default apiSlice
