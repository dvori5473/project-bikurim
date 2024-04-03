import apiSlice from "../../app/apiSlice";


const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getAllUsers: build.query({
            query: () => ({
                url: '/api/user'
            }),
            providesTags: ["users"]
        }),
        // deleteProductItem: build.mutation({
        //     query: ({ id }) => ({
        //         url: '/api/product',
        //         method: "DELETE",
        //         body: { id: id }
        //     }),
        //     invalidatesTags: ["products"]
        // })
        updateUser: build.mutation({
            query: (user) => ({
                url: '/api/user',
                method: "PUT",
                body: user
            })
            //invalidatesTags: ["users"]
        }),
        updateBasket: build.mutation({
            query: (basket) => ({
                url: '/api/user/updateBasket',
                method: "PUT",
                body: basket
            })
            //invalidatesTags: ["users"]
        }),
        addDefaultAddress: build.mutation({
            query: (Address) => ({
                url: '/api/user/addDefaultAddress',
                method: "PUT",
                body: Address
            })
            //invalidatesTags: ["users"]
        })
        ,
        cleaningBasket: build.mutation({
            query: ({_id}) => ({
                url: '/api/user/cleaningBasket',
                method: "PUT",
                body:{_id}
            })
            //invalidatesTags: ["users"]
        })
        
    }),
})
export const {useUpdateBasketMutation,useUpdateUserMutation,useAddDefaultAddressMutation,useCleaningBasketMutation,useGetAllUsersQuery } = userApiSlice