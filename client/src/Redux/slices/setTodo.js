import {createSlice} from '@reduxjs/toolkit'


const todo = createSlice({
    name:"todo",
    initialState:[],
    reducers:{
        addTodo:(state,action)=>{
            const newItem = action.payload
            let data = {
                task:newItem.task,
                id:newItem.id
            }
            state.push(data)

            return state
            
        },
        editTodo: (state, action) => {
            const newItem = action.payload;
            const updatedState = state.map((item) => {
              if (item.id === newItem.id) {
                return { ...item, task: newItem.task };
              }
              return item;
            });
          
            return updatedState;
          },
          
        removeTodo :(state, action) => {
            const newItemId = action.payload;
            const newState = state.filter(item => item.id !== newItemId);
            return newState;
          },
          removeComplete:(state)=>{
            state=[]
            return state 
          }
          
    }
})

export const {addTodo, editTodo,removeTodo,removeComplete} = todo.actions
export default todo.reducer