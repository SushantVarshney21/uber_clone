import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext'

const CaptainProtectWrapper = ({children}) => {
    const navigate = useNavigate()
    const token = localStorage.getItem('token')

    const [loading, setLoading] = useState(true)
    
    const {setCaptain} = useContext(CaptainDataContext)

    useEffect(()=>{
      if (!token) {
        navigate('/captain-login')
    }
    },[token])

    axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`,{
        headers: { Authorization: `Bearer ${token}` }
    })
     .then((response) => {
        setCaptain(response.data.captain)
        setLoading(false)
    })
    .catch((error) => {
        localStorage.removeItem('token')
        navigate('/captain-login')
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

export default CaptainProtectWrapper