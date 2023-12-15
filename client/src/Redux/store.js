import {configureStore}from '@reduxjs/toolkit'
import {combineReducers}from 'redux'
import user from './slices/user'
import setTodo from './slices/setTodo'


const rootReducer =combineReducers({
    user:user,
    todo:setTodo
})

const store = configureStore({
    reducer:rootReducer
})
export default store