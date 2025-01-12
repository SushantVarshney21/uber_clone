// import React from 'react'

import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios'
import { UserDataContext } from "../context/UserContext"

const UserSignup = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { setUser} = useContext(UserDataContext)


  const navigate = useNavigate()

  const submitHandler = async(e) => {
    e.preventDefault()
    const userData = {
      fullname: {
        firstname: firstName,
        lastname: lastName
      },
      email,
      password,
    }

    const reponse = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, userData)
    if (reponse.status === 201) {
      const data = await reponse.data
      setUser(data.user)
      localStorage.setItem('token', data.token)
      navigate('/home')
1    }
    
    setFirstName('')
    setLastName('')
    setEmail('')
    setPassword('')
  }
  return (
    <div className=" p-5 flex flex-col justify-between h-screen">
    <div>
    <img className="w-20 mb-4" src="https://cdn-assets-us.frontify.com/s3/frontify-enterprise-files-us/eyJwYXRoIjoicG9zdG1hdGVzXC9hY2NvdW50c1wvODRcLzQwMDA1MTRcL3Byb2plY3RzXC8yN1wvYXNzZXRzXC9lZFwvNTUwOVwvNmNmOGVmM2YzMjFkMTA3YThmZGVjNjY1NjJlMmVmMzctMTYyMDM3Nzc0OC5haSJ9:postmates:9KZWqmYNXpeGs6pQy4UCsx5EL3qq29lhFS6e4ZVfQrs?width=800" alt="" />
      <form onSubmit={(e) => submitHandler(e)}>
      <h3 className="text-base font-medium mb-3">Whats your Full Name</h3>
        <div className="flex justify-between space-x-3 ">
        <input
         className="bg-gray-100 border w-full p-3 mb-4 text-base placeholder[text-sm]" 
         type="text" 
         value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
         placeholder="First name" 
         required
         />
         <input
         className="bg-gray-100 border w-full p-3 mb-4 text-base placeholder[text-sm]" 
         type="text" 
         value={lastName}
          onChange={(e) => setLastName(e.target.value)}
         placeholder="Last name" 
         required
         />
        </div>

        <h3 className="text-base font-medium mb-3">Whats your Email</h3>
        <input  
        className="bg-gray-100 border w-full p-3 mb-4 text-base placeholder[text-sm]" 
        type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
         placeholder="Enter Email" 
          required
         />
        
        <h3 className="text-base font-medium mb-3">Password</h3>
        <input  
        className="bg-gray-100 border w-full p-3 mb-4 text-base placeholder[text-sm]" 
        type="password"
         value={password}
          onChange={(e) => setPassword(e.target.value)}
         placeholder="Enter Password" 
          required
         />

        <button className="bg-black text-white font-medium w-full p-3 mt-3 rounded">SignUp</button>
      </form>
      <p className="mt-3 text-center">Already have a account? <Link to='/login' className="text-blue-600">Login here</Link></p>
    </div>
    <div>
      <p className="text-[12px] ">By privideng, youconsent to get calls, whatsup or sms atsaffiliates to the number provided.</p>
    </div>
  </div>
  )
}

export default UserSignup