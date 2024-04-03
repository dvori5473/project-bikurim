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

//export const {}=productSlice.actions
export default productSlice.reducer