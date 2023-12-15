import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeUser } from '../Redux/slices/user'
import { useNavigate } from 'react-router-dom'


function NavBarOne() {
  const navigate = useNavigate()
  const dispatch=useDispatch()
  const data =useSelector((value)=>{
    return value.user
  })
  const handleLogout=()=>{
    localStorage.removeItem("token")
    dispatch(removeUser())
    navigate('/login')
  }
  return (
    <div className=' w-screen h-20 bg-red-200 shadow-lg flex justify-around items-center'>
      <h1 className='text-2xl font-mono font-bold'>{data.name}</h1>
      <button onClick={()=>{handleLogout()}} type="button" className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Logout</button>
    </div>
  )
}

export default NavBarOne
