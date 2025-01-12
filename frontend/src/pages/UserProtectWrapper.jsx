import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import { UserDataContext } from "../context/UserContext"

const UserProtectWrapper = ({children}) => {
    const navigate = useNavigate()
    const token = localStorage.getItem('token')

    const [loading, setLoading] = useState(true)

    const {setUser} = useContext(UserDataContext)


    useEffect(()=>{
      if (!token) {
        navigate('/login')
    }
    },[])

    axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`,{
      headers: { Authorization: `Bearer ${token}` }
    }).then((response) => {
        setUser(response.data.user)
        setLoading(false)
    }).catch((error) => {
        localStorage.removeItem('token')
        navigate('/login')
        console.log(error)
    })

    if(loading) {
        return <div>Loading...</div>
    }

   
  return (
    <>
    {children}
    </>
  )
}

export default UserProtectWrapper