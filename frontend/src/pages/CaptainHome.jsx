import {Link} from 'react-router-dom'
import CaptainsDetails from '../components/CaptainsDetails'
import RidePopUp from '../components/RidePopUp'
import { useContext, useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ConfirmRidePopUp from '../components/ConfirmRidePopUp'
import {SocketContext} from '../context/SocketContext'
import {CaptainDataContext} from '../context/CaptainContext'
import axios from 'axios'

const CaptainHome = () => {

  const [ridePopUpPanel, setRidePopUpPanel] = useState(false)
  const [confirmRidePopUpPanel, setConfirmRidePopUpPanel] = useState(false)
  const [ride, setRide] = useState(null)

  const ridePopUpPanelRef = useRef(null)
  const confirmRidePopUpPanelRef = useRef(null)

  const {captain} = useContext(CaptainDataContext)
  const {socket} = useContext(SocketContext)


  socket.on('new-ride', (data) => {
    setRide(data)
    setRidePopUpPanel(true)
})

async function confirmRide() {

  const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {

      rideId: ride._id,
      captainId: captain._id,


  }, {
      headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
      }
  })

  setRidePopUpPanel(false)
  setConfirmRidePopUpPanel(true)

}

useEffect(() => {
  socket.emit('join', {
      userId: captain._id,
      userType: 'captain'
  })


  const updateLocation = () => {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(position => {

              socket.emit('update-location-captain', {
                  userId: captain._id,
                  location: {
                      ltd: position.coords.latitude,
                      lng: position.coords.longitude
                  }
              })
          })

          console.log(captain.location)
      }
  }

  const locationInterval = setInterval(updateLocation, 10000)
  updateLocation()

  // return () => clearInterval(l2ocationInterval)
}, [])

  useGSAP(function(){
    if(ridePopUpPanel){
      gsap.to(ridePopUpPanelRef.current, {
        transform: 'translateY(0)',
        duration: 0.5,
      })
    }else{
      gsap.to(ridePopUpPanelRef.current, {
        transform: 'translateY(100%)',
        duration: 0.5,
      })
    }
  },[ridePopUpPanel])

  useGSAP(function(){
    if(confirmRidePopUpPanel){
      gsap.to(confirmRidePopUpPanelRef.current, {
        transform: 'translateY(0)',
        duration: 0.5,
      })
    }else{
      gsap.to(confirmRidePopUpPanelRef.current, {
        transform: 'translateY(100%)',
        duration: 0.5,
      })
    }
  },[confirmRidePopUpPanel])
  return (
    <div className="h-screen">
   <div className='p-3 fixed flex items-center justify-between w-screen'>
   <img className="w-24" src="https://cdn-assets-us.frontify.com/s3/frontify-enterprise-files-us/eyJwYXRoIjoicG9zdG1hdGVzXC9hY2NvdW50c1wvODRcLzQwMDA1MTRcL3Byb2plY3RzXC8yN1wvYXNzZXRzXC9lZFwvNTUwOVwvNmNmOGVmM2YzMjFkMTA3YThmZGVjNjY1NjJlMmVmMzctMTYyMDM3Nzc0OC5haSJ9:postmates:9KZWqmYNXpeGs6pQy4UCsx5EL3qq29lhFS6e4ZVfQrs?width=800" alt="" />
    <Link to='/captain-logout' className=" h-10 w-10 bg-white flex items-center justify-center rounded-full">
        <i className="text-lg font-medium ri-logout-box-r-line"></i>
    </Link>
   </div>

    <div className="h-3/5 w-screen">
      <img className="h-full w-full object-cover" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaoGMfZRZ63jDs0hetE46_RArwSddRa9eUgIp9OccJ9RZs-XeLNXne_Ou6wfVw2if4jEY&usqp=CAU"/>
    </div>

    <div className="h-2/5 p-4">
        <CaptainsDetails/>
    </div>

    <div ref={ridePopUpPanelRef}  className="fixed bottom-0 z-10 px-3 py-10 pt-12 bg-white w-full translate-y-full" >
        <RidePopUp confirmRide={confirmRide} ride={ride} setRidePopUpPanel={setRidePopUpPanel} setConfirmRidePopUpPanel={setConfirmRidePopUpPanel} />
    </div>

    <div ref={confirmRidePopUpPanelRef}  className="fixed bottom-0 z-10 px-3 py-10 pt-12 bg-white w-full h-screen translate-y-full" >
        <ConfirmRidePopUp ride={ride} setRidePopUpPanel={setRidePopUpPanel} setConfirmRidePopUpPanel={setConfirmRidePopUpPanel} />
    </div>
</div>
  )
}

export default CaptainHome