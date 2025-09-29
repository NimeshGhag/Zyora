import {createSlice} from '@reduxjs/toolkit'

const initialState ={
    user :null,
}
export const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers:{
       loaduser :(state,action)=>{
        state.user = action.payload
       } ,
       logOutUser :(state,action)=>{
        state.user = null;
       }
    }
})

export default userSlice.reducer
export const {loaduser,logOutUser} = userSlice.actions
