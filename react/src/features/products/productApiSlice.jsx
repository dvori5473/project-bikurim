import apiSlice from "../../app/apiSlice";


const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getProducts: build.query({
            query: () => ({
                url: '/api/product'
            }),
            providesTags: ["products"]
        }),
        addProduct: build.mutation({
            query: (product) => ({
                url: 'api/product',
                method: "POST",
                body: product
            }),
            invalidatesTags: ["products"]
        }),
        updateProduct: build.mutation({
            query: (product) => ({
                url: 'api/product',
                method: "PUT",
                body: product
            }),
            invalidatesTags: ["products"]
        }),
        deleteProductItem: build.mutation({
            query: ({ _id }) => ({
                url: '/api/product',
                method: "DELETE",
                body: { _id: _id }
            }),
            invalidatesTags: ["products"]
        }),
        getProductbyId: build.query({
            query: (id) => ({
                url: `/api/product/${id}`
            }),
        }),
    }),
})
export const { useGetProductsQuery, useAddProductMutation, useDeleteProductItemMutation,useUpdateProductMutation,useGetProductbyIdQuery } = productApiSlice