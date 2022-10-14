import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface productPropType {
  products: Product[] | null;
}

const initilalState: productPropType = {
  products: null,
};

const productSlice = createSlice({
  name: "date",
  initialState: initilalState,
  reducers: {
    setInitialProduct: (
      state: productPropType,
      action: PayloadAction<Product[]>
    ) => {
      state.products = action.payload;
    }
  },
});
export const { setInitialProduct } = productSlice.actions;

export default productSlice.reducer;
