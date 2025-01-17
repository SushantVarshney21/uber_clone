// import React from 'react'

import axios from "axios"
import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { CaptainDataContext } from "../context/CaptainContext"

const CaptainLogin = () => {
   const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const {setCaptain} = useContext(CaptainDataContext)
  
    const submitHandler = async(e) => {
      e.preventDefault()
    const captainData = { email, password }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captainData)

    if(response.status === 200){
      const data = await response.data
      setCaptain(data.captain)
      localStorage.setItem('token', data.token)
      navigate('/captain-home')
    }

    setEmail('')
    setPassword('')
    }
  return (
    <div className=" p-5 flex flex-col justify-between h-screen">
      <div>
      <img className="w-20 mb-4" src="https://cdn-assets-us.frontify.com/s3/frontify-enterprise-files-us/eyJwYXRoIjoicG9zdG1hdGVzXC9hY2NvdW50c1wvODRcLzQwMDA1MTRcL3Byb2plY3RzXC8yN1wvYXNzZXRzXC9lZFwvNTUwOVwvNmNmOGVmM2YzMjFkMTA3YThmZGVjNjY1NjJlMmVmMzctMTYyMDM3Nzc0OC5haSJ9:postmates:9KZWqmYNXpeGs6pQy4UCsx5EL3qq29lhFS6e4ZVfQrs?width=800" alt="" />
        <form onSubmit={(e)=>{submitHandler(e)}} >
          <h3 className="text-lg font-medium mb-3">Whats your email</h3>
          <input
           className="bg-gray-100 border w-full p-3 mb-3 text-lg placeholder[text-sm]" 
           value={email}
            onChange={(e) => setEmail(e.target.value)}
           type="email" 
           placeholder="Enter Email" 
           required
           />

          <h3 className="text-lg font-medium mb-3">Password</h3>
          <input  
          className="bg-gray-100 border w-full p-3 mb-3 text-lg placeholder[text-sm]" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
           placeholder="Enter Password" 
            required
           />

          <button className="bg-black text-white font-medium w-full p-3 mt-3 rounded">Login</button>
        </form>
        <p className="mt-3 text-center">Join a fleet? <Link to='/captain-signup' className="text-blue-600">Register as a captain</Link></p>
      </div>
      <div>
        <Link to='/login' className="flex align-center justify-center bg-[#d5622d] text-white font-medium w-full p-3 mt-3 rounded">User Login</Link>
      </div>
    </div>
  )
}

export default CaptainLogin