import {createSlice} from '@reduxjs/toolkit'


const user = createSlice({
    name:"user",
    initialState:{
        name:null,
        token:null,
        email:null,
        phone:null
    },
    reducers:{
        setUser:(state,action)=>{
            const newItem = action.payload
            state.name = newItem.name
            state.token = newItem.token
            state.email = newItem.email
            state.phone = newItem.phone
        },
        removeUser:(state)=>{
            state.name = null
            state.token = null
            state.email = null
            state.phone = null
        }
    }
})

export const {setUser, removeUser} = user.actions
export default user.reducer