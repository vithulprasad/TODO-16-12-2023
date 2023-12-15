import axios from 'axios'
import React, { useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import { user } from '../API/apis'

function Register() {
  const [uName,setUname]=useState("")
    const navigate = useNavigate()
    const passwordRef = useRef()
    const PhoneRef = useRef()
    const emailRef = useRef()
    console.log(uName,'dshfousidhfuo');
    const handleSubmit =(e)=>{
     e.preventDefault()
     if(passwordRef.current.value ===""  || passwordRef.current.value ===null){
        toast.error("please add password")
     }else if(PhoneRef.current.value===""  || passwordRef.current.value ===null){
        toast.error("please add phone number")
     }else if(emailRef.current.value ===""  || passwordRef.current.value ===null){
        toast.error("please add email")
     }else if(uName ===""  || uName ===null){
        toast.error("please add name")
     }else{
     
        const submit = async()=>{
            const data = {
                password:passwordRef.current.value,
                phone:PhoneRef.current.value,
                email:emailRef.current.value,
                name:uName
            }
            console.log(data);
            await axios.post(`${user}register`,{data})
            .then((value)=>{
                if(value.data.success===true){
                    toast.success("registration has been successfull")
                    navigate('/login')
                }else{
                    toast.error(`${value.data.message}`)

                }
              
            })
            .catch((err)=>{
                toast.error(`${err.message} something went wrong`)
            })
            
        }
        submit()
     }
    

    }
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="flex w-[350px] flex-col justify-center px-6 py-12 lg:px-8 shadow-lg h-[600px] border">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Register Your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
          <div>
              <label
                for="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  value={uName}
                  onChange={(e)=>{setUname(e.target.value)}}
                  required
                  className="p-3 first-letter:block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                for="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  ref={emailRef}
                  required
                  className="p-3 first-letter:block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                for="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Phone Number
              </label>
              <div className="mt-2">
                <input
                  id="phone"
                  name="phone"
                  type="number"
                  ref={PhoneRef}
                  required
                  className="p-3  block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  for="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm"></div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  ref={passwordRef}
                  autocomplete="current-password"
                  required
                  className="p-3  block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

             <Link to='/login'className="text-blue-500 underline">Login</Link>
        </div>
      </div>
    </div>
  )
}

export default Register
