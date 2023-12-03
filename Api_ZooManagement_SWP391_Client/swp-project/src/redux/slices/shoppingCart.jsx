import { createSlice } from "@reduxjs/toolkit";


const initialState = [];

const shoppingSlice = createSlice({
  name: "shopping",
  initialState,
  reducers:
   {setShoppingCart: (state, action) => {
    return action.payload;
  },
    addItem(state, action) {
      const { ticketId, type, price, imageSrc } = action.payload;
      const existingItemIndex = state.findIndex((item) => item.id === ticketId);

      console.log(action.payload);
      if (existingItemIndex !== -1) {
        state[existingItemIndex].quantity += 1;
      } else {
        state.push({
          id : ticketId,
          name: type,
          price: price,
          imageSrc,
          quantity: 1, 
          day: '',
        });
      }
    },
    
    removeItem() {},
    updateDay(state, action) {
      const { day } = action.payload;
      
  state.forEach((product) => {
    product.day = day;
  });
    },
    updateShoppingCart(state, action) {
      const { id, newQuantity } = action.payload;
      const productToUpdate = state.find((product) => product.id === id);

      if (productToUpdate) {
        productToUpdate.quantity = newQuantity;
        productToUpdate.totalPrice = productToUpdate.price * newQuantity;
      }
    },
    editItem() {},
    countTotal(state) {
      let totalQuantity = 0;
      state.forEach((product) => {
        totalQuantity += product.quantity;
      });
      return totalQuantity;
    },
  },
});

export const { addItem, updateShoppingCart, countTotal, removeItem, setShoppingCart,updateDay } = shoppingSlice.actions;
export default shoppingSlice.reducer;

