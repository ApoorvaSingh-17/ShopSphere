import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: [],
        quantity: 0,
        total: 0,
    },
    reducers: {
        addProduct: (state, action) => {
           
            //  state.quantity += 1;
            //  state.products.push(action.payload);
            //  state.total += action.payload.price * action.payload.quantity;
            
           
            const product = action.payload;
            const existingProductIndex = state.products.findIndex(
              item => item._id === product._id && item.size === product.size
            );
      
            if (existingProductIndex >= 0) {
              state.products[existingProductIndex].quantity += product.quantity;
            } else {
              state.products.push({ ...product, quantity: product.quantity });
              state.quantity += 1;
            }
            state.total += product.price * product.quantity;
        },

        addProd: (state, action) => {
          const product = state.products.find((item) => item._id === action.payload._id
          &&
          item.size === action.payload.size);
          if(product) {
              product.quantity += 1;
              state.total += action.payload.price;
            } 
          },

          removeProduct: (state, action) => {
            const idToRemove = action.payload;
            const productIndex = state.products.findIndex(
              product => product._id === idToRemove || product.size === action.payload.size
            );
      
            if (productIndex >= 0) {
              const product = state.products[productIndex];
              state.total -= product.price * product.quantity;
              state.products.splice(productIndex, 1);
              state.quantity -= 1;
            }
          },

        removeProd: (state, action) => {
          const product = state.products.find((item) => item._id === action.payload._id && 
          item.size === action.payload.size);
          if(product) {
            if(product.quantity > 1) {
              product.quantity -= 1;
              state.total -= action.payload.price;
            } else {
              state.products = state.products.filter((item) => (item._id !== action.payload._id || 
                item.size !== action.payload.size));
              state.total -= action.payload.price;
            }
          }
        },   
    },
});

export const { addProduct, addProd, removeProduct, removeProd } = cartSlice.actions;
export default cartSlice.reducer;