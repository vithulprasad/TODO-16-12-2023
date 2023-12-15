import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast'
import axios from "axios";
import {user} from "../API/apis";

function Login() {
  const emailORpassRef = useRef()
  const passwordRef = useRef()
  const navigate = useNavigate()

  const handleSubmit=(e)=>{
    e.preventDefault()
    const data = {
      emailOrPass : emailORpassRef.current.value,
      password :passwordRef.current.value
    }
    if(emailORpassRef.current.value === "" || emailORpassRef.current.value === null ){
      toast.error("email field is empty")
    }else if(passwordRef.current.value === "" || passwordRef.current.value === null ){
      toast.error("password  field is empty")
    }else{
      const submit = async()=>{
        await axios.post(`${user}login`,{data})
        .then((value)=>{
          if(value.data.success === true ){
              toast.success(`welcome ${value.data.user}`)
              localStorage.setItem('token',value.data.token)
              navigate('/')    
          }else{
            toast.error(`${value.data.message}`)
          }
        })
      }
      submit()
    }
  }
  return (
    
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="flex  flex-col justify-center px-6 py-12 lg:px-8 shadow-lg h-[400px] border">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
            <div>
              <label
                for="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email or userName
              </label>
              <div className="mt-2">
                <input
                ref={emailORpassRef}
                  id="email"
                  name="email"
                  type="string"
                  required
                  className="p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                  ref={passwordRef}
                  id="password"
                  name="password"
                  type="password"
                  autocomplete="current-password"
                  required
                  className="p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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

         
          <Link to='/register' className="text-blue-500 underline">Register</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
