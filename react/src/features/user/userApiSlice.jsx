import apiSlice from "../../app/apiSlice";


const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getAllUsers: build.query({
            query: () => ({
                url: '/api/user'
            }),
            providesTags: ["users"]
        }),
        updateUser: build.mutation({
            query: (user) => ({
                url: '/api/user',
                method: "PUT",
                body: user
            })
        }),
        updateBasket: build.mutation({
            query: (basket) => ({
                url: '/api/user/updateBasket',
                method: "PUT",
                body: basket
            })
        }),
        addDefaultAddress: build.mutation({
            query: (Address) => ({
                url: '/api/user/addDefaultAddress',
                method: "PUT",
                body: Address
            })
        })
        ,
        cleaningBasket: build.mutation({
            query: ({_id}) => ({
                url: '/api/user/cleaningBasket',
                method: "PUT",
                body:{_id}
            })
        })
        
    }),
})
export const {useUpdateBasketMutation,useUpdateUserMutation,useAddDefaultAddressMutation,useCleaningBasketMutation,useGetAllUsersQuery } = userApiSlice