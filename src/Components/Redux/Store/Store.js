import { configureStore } from '@reduxjs/toolkit'
import AccountSlice from './AccoutSlice';
import ProductSlice from './Product/ProductSlice';

const Store =  configureStore({
  reducer: {
    account: AccountSlice,
    product: ProductSlice,
  }
});



export default Store;