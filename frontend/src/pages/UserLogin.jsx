import { useContext, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import {UserDataContext} from '../context/UserContext'
import axios from 'axios'

const UserLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const {setUser} = useContext(UserDataContext)

  const submitHandler = async (e) => {
    e.preventDefault()
    const userData = { email, password }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData)

    if(response.status === 200){
      const data = await response.data
      setUser(data.user)
      localStorage.setItem('token', data.token)
      navigate('/home')
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
        <p className="mt-3 text-center">New here? <Link to='/signup' className="text-blue-600">Create New Account</Link></p>
      </div>
      <div>
        <Link to='/captain-login' className="flex align-center justify-center bg-[#10b461] text-white font-medium w-full p-3 mt-3 rounded">Captain Login</Link>
      </div>
    </div>
  )
}

export default UserLogin