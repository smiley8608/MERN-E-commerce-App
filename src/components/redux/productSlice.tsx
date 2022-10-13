import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface productPropType {
  product: Product[] | null;
}

const initilalState: productPropType = {
  product: null,
};

const productSlice = createSlice({
  name: "date",
  initialState: initilalState,
  reducers: {
    setInitialProduct: (
      state: productPropType,
      action: PayloadAction<Product[]>
    ) => {
      state.product = action.payload;
    }
  },
});
export const { setInitialProduct } = productSlice.actions;

export default productSlice.reducer;
