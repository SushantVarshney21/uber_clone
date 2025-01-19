// import React from 'react'

import { useContext, useEffect, useRef, useState } from "react"
import {useGSAP} from '@gsap/react'
import { gsap } from "gsap"
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from "../components/LocationSearchPanel"
import VehiclePanel from "../components/VehiclePanel"
import ConfirmRide from "../components/ConfirmRide"
import LookingForDriver from "../components/LookingForDriver"
import WaitingForDriver from "../components/WaitingForDriver"
import axios from 'axios'
import { SocketContext} from "../context/SocketContext"
import {UserDataContext} from '../context/UserContext'
import { useNavigate } from "react-router-dom"
import LiveTracking from "../components/LiveTracking"



const Home = () => {
  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [openPanel, setOpenPanel] = useState(false)
  const [vehiclePanel, setVehiclePanel] = useState(false)
  const [confirmRidePanel, setConfirmRidePanel] = useState(false)
  const [vehicleFound, setVehicleFound] = useState(false)
  const [waitingForDriver, setWaitingForDriver] = useState(false)
  const [pickupSuggestions, setPickupSuggestions] = useState([])
  const [destinationSuggestions, setDestinationSuggestions] = useState([])
  const [activeField, setActiveField] = useState(null)
  const [fare, setFare] = useState({})
  const [vehicleType, setVehicleType] = useState(null)
  const [ride, setRide] = useState(null)

  

  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)
  const vehiclePanelRef = useRef(null)
  const confirmRidePanelRef = useRef(null)
  const vehicleFoundRef = useRef(null)
  const waitingForDriverRef = useRef(null)

  const navigate = useNavigate()

  const {socket } = useContext(SocketContext)
  const { user } = useContext(UserDataContext)

  useEffect(() => {
    socket.emit("join",{userType:"user", userId:user._id})
  }, [user])


  socket.on('ride-confirmed', ride => {
    setVehicleFound(false)
    setWaitingForDriver(true)
    setRide(ride)
})


socket.on('ride-started', ride => {
  setWaitingForDriver(false)
  navigate('/riding',{ state: { ride } })
})


  const handlePickupChange = async (e) => {
    setPickup(e.target.value)
    try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
            params: { input: e.target.value },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }

        })
        setPickupSuggestions(response.data)
    } catch {
        // handle error
        console.error('Error fetching suggestions')
    }
}

const handleDestinationChange = async (e) => {
    setDestination(e.target.value)
    try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
            params: { input: e.target.value },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        setDestinationSuggestions(response.data)
    } catch {
        // handle error
        console.error('Error fetching suggestions')
    }
}

  useGSAP(function(){
    if(openPanel){
      gsap.to(panelRef.current, {
        height: '70%',
        duration: 0.5,
        padding: 24
      })
      gsap.to(panelCloseRef.current, {
        opacity: 1,
        duration: 0.5
      })
    }else{
      gsap.to(panelRef.current, {
        height: '0',
        duration: 0.5,
        padding:0
      })
      gsap.to(panelCloseRef.current, {
        opacity:0,
        duration: 0.5
      })
    }
   
  },[openPanel])

  useGSAP(function(){
    if(vehiclePanel){
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(0)',
        duration: 0.5,
      })
    }else{
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(100%)',
        duration: 0.5,
      })
    }
  },[vehiclePanel])

  useGSAP(function(){
    if(confirmRidePanel){
      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(0)',
        duration: 0.5,
      })
    }else{
      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(100%)',
        duration: 0.5,
      })
    }
  },[confirmRidePanel])

  useGSAP(function(){
    if(vehicleFound){
      gsap.to(vehicleFoundRef.current, {
        transform: 'translateY(0)',
        duration: 0.5,
      })
    }else{
      gsap.to(vehicleFoundRef.current, {
        transform: 'translateY(100%)',
        duration: 0.5,
      })
    }
  },[vehicleFound])

  useGSAP(function(){
    if(waitingForDriver){
      gsap.to(waitingForDriverRef.current, {
        transform: 'translateY(0)',
        duration: 0.5,
      })
    }else{
      gsap.to(waitingForDriverRef.current, {
        transform: 'translateY(100%)',
        duration: 0.5,
      })
    }
  },[waitingForDriver])

  

  const submitHandler = (e) => {
    e.preventDefault()
    console.log(pickup, destination)
  }

  async function findTrip() {
    setVehiclePanel(true)
    setOpenPanel(false)

    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
        params: { pickup, destination },
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
    setFare(response.data)
}


async function createRide() {
  const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
      pickup,
      destination,
      vehicleType
  }, {
      headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
      }
  })
console.log(response.data)

}




  
  return (
   <div className="relative h-screen w-screen overflow-hidden" >
      <img className="w-28 absolute top-5 left-4" src="https://cdn-assets-us.frontify.com/s3/frontify-enterprise-files-us/eyJwYXRoIjoicG9zdG1hdGVzXC9hY2NvdW50c1wvODRcLzQwMDA1MTRcL3Byb2plY3RzXC8yN1wvYXNzZXRzXC9lZFwvNTUwOVwvNmNmOGVmM2YzMjFkMTA3YThmZGVjNjY1NjJlMmVmMzctMTYyMDM3Nzc0OC5haSJ9:postmates:9KZWqmYNXpeGs6pQy4UCsx5EL3qq29lhFS6e4ZVfQrs?width=800" alt="" />
    <div className="h-screen w-screen">
      <img className="h-full w-full object-cover" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaoGMfZRZ63jDs0hetE46_RArwSddRa9eUgIp9OccJ9RZs-XeLNXne_Ou6wfVw2if4jEY&usqp=CAU"/>
      {/* <LiveTracking/> */}
    </div>
    
    <div className="flex flex-col justify-end absolute bottom-0  h-screen">
      <div className="bg-white p-5 h-[30%] relative">
        <h5 ref={panelCloseRef} className="absolute top-5 right-5 text-2xl opacity-0" onClick={()=>{setOpenPanel(false)}}>
        <i className="ri-arrow-down-wide-line"></i>
        </h5>
      <h4 className="text-2xl font-semibold">Find a trip</h4>

      <form onSubmit={(e)=>{submitHandler(e)}} >
        <div className="absolute bg-gray-900 w-1 h-16 top-[43%] left-8 "></div>
        <input 
        className="bg-gray-100  w-full px-10 py-2 text-base mt-5" 
        type="text"
        value={pickup}
        onChange={handlePickupChange}
        onClick={()=>{
          setOpenPanel(true)
          setActiveField('pickup')
        }}
        placeholder="Add a Pick-up location"
         />
        <input 
        className="bg-gray-100  w-full px-10 py-2 text-base mt-5" 
        type="text" 
        value={destination}
        onChange={handleDestinationChange}
        onClick={()=>{
          setOpenPanel(true)
          setActiveField('destination')
        }}
        placeholder="Enter your destination" 
        />
      </form>

      <button
                        onClick={findTrip}
                        className='bg-black text-white px-4 py-2 rounded-lg mt-3 w-full'>
                        Find Trip
                    </button>

      </div>

      <div className="bg-white h-0 w-full" ref = {panelRef}>
          <LocationSearchPanel  suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
                        setOpenPanel={setOpenPanel}
                        setVehiclePanel={setVehiclePanel}
                        setPickup={setPickup}
                        setDestination={setDestination}
                        activeField={activeField}/>
      </div>

    </div>

    <div ref={vehiclePanelRef} className="fixed bottom-0 z-10 px-3 py-10 pt-12 bg-white w-full translate-y-full" >
     <VehiclePanel setVehicleType={setVehicleType} fare={fare} setConfirmRidePanel={setConfirmRidePanel} setVehiclePanel={setVehiclePanel}/>
    </div>

    <div ref={confirmRidePanelRef} className="fixed bottom-0 z-10 px-3  pt-12 bg-white w-full translate-y-full" >
      <ConfirmRide setConfirmRidePanel={setConfirmRidePanel} 
      setVehicleFound={setVehicleFound}
      fare={fare}
      vehicleType={vehicleType}
      pickup={pickup}
      destination={destination}
      createRide={createRide}
      />
      
    </div>

    <div ref={vehicleFoundRef} className="fixed bottom-0 z-10 px-3 py-6 pt-12 bg-white w-full translate-y-full" >
      <LookingForDriver 
      setVehicleFound={setVehicleFound}
      vehicleType={vehicleType}
      pickup={pickup}
      destination={destination}
      fare={fare}
      />
    </div>

    <div ref={waitingForDriverRef} className="fixed bottom-0 z-10 px-3 py-6 pt-12 bg-white w-full translate-y-full" >
      <WaitingForDriver ride={ride} setWaitingForDriver={setWaitingForDriver}/>
    </div>

   </div>
  )
}

export default Home