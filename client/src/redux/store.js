import { configureStore } from '@reduxjs/toolkit'
import UserSlice from './UserSlice';
import productSlice from './ProductSlice';
import OrderSlice from './OrderSlice';



export const store = configureStore({
  reducer: {
    user: UserSlice,
    product: productSlice,
    order: OrderSlice
  },
});