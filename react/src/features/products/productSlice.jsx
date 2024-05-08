import { createSlice } from "@reduxjs/toolkit";

const productInitState = {
    products: []
}
const productSlice = createSlice({
    name: "products",
    initialState: productInitState,
    reducers: {

    }
})

export default productSlice.reducer