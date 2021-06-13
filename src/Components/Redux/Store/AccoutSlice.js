import { createSlice } from '@reduxjs/toolkit';

export const AccountSlice = createSlice({
  name: 'account',
  initialState: {
    fristName: '',
    lastName: '',
    email: '',
    date: '',
    city: '',
    Mobile: '',
    password: '',
    confirmPassword: '',
    response: ""
  },
  reducers: {
  inputData: (state, action) =>{
    return {...state, ...action.payload}
  }
  }
})

export const { register, inputData } = AccountSlice.actions;
export default AccountSlice.reducer;