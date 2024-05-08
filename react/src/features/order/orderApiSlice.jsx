
import apiSlice from "../../app/apiSlice";


const orderApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        addOrder: build.mutation({
            query: (data) => ({
                url: '/api/order',
                method: "POST",
                body: data
            }),
        }),
        updateOrder: build.mutation({
            query: (data) => ({
                url: '/api/order',
                method: "PUT",
                body: data
            }),
        }),
        getAllOrders: build.query({
            query: () => ({
                url: '/api/order',
            }),
            providesTags: ["orders"]
        }),
        getOrderbyId: build.query({
            query: (id) => ({
                url: `/api/order/${id}`
            }),
        }),
    }),
})
export const { useAddOrderMutation,useGetOrderbyIdQuery,useGetAllOrdersQuery,useUpdateOrderMutation } = orderApiSlice