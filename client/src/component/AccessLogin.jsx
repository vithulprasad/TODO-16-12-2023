import axios from 'axios'
import React, { useEffect } from 'react'
import { user } from '../API/apis'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { setUser } from '../Redux/slices/user'



function AccessLogin() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(()=>{
        const token = localStorage.getItem('token')
               if(token){
            const check = async()=>{
                await axios.get(`${user}access`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization':`${token}`
                    }
                   
                })  
                .then((value)=>{
                    if(value.data.success===false){
                      navigate('/login')  
                    }else{
                         const data = {
                            name:value.data.user.name,
                            token:token,
                            email:value.data.user.email,
                            phone:value.data.user.phone
                         }
                        dispatch(setUser(data))
                    }
                })
                .catch(()=>{
                    navigate('/login') 
                    toast.error('something went wrong with access') 
                })
               }  
               check()
        }else{
            navigate('/login')
        }
    
    })
  return (
    <div>
      
    </div>
  )
}

export default AccessLogin

