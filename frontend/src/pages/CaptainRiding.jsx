import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useRef, useState } from "react"
import { Link ,useLocation} from "react-router-dom"
import FinishRide from "../components/FinishRide"

const CaptainRiding = () => {
  const [finishRidePanel, setFinishRidePanel] = useState(false)

  const finishRidePanelRef = useRef(null)

  const location = useLocation()
    const rideData = location.state?.ride

  useGSAP(function(){
    if(finishRidePanel){
      gsap.to(finishRidePanelRef.current, {
        transform: 'translateY(0)',
        duration: 0.5,
      })
    }else{
      gsap.to(finishRidePanelRef.current, {
        transform: 'translateY(100%)',
        duration: 0.5,
      })
    }
  },[finishRidePanel])
  return (
    <div className="h-screen">
    <div className='p-3 fixed flex items-center justify-between w-screen'>
    <img className="w-24" src="https://cdn-assets-us.frontify.com/s3/frontify-enterprise-files-us/eyJwYXRoIjoicG9zdG1hdGVzXC9hY2NvdW50c1wvODRcLzQwMDA1MTRcL3Byb2plY3RzXC8yN1wvYXNzZXRzXC9lZFwvNTUwOVwvNmNmOGVmM2YzMjFkMTA3YThmZGVjNjY1NjJlMmVmMzctMTYyMDM3Nzc0OC5haSJ9:postmates:9KZWqmYNXpeGs6pQy4UCsx5EL3qq29lhFS6e4ZVfQrs?width=800" alt="" />
     <Link to='/captain-logout' className=" h-10 w-10 bg-white flex items-center justify-center rounded-full">
         <i className="text-lg font-medium ri-logout-box-r-line"></i>
     </Link>
    </div>
 
     <div className="h-4/5 w-screen">
       <img className="h-full w-full object-cover" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaoGMfZRZ63jDs0hetE46_RArwSddRa9eUgIp9OccJ9RZs-XeLNXne_Ou6wfVw2if4jEY&usqp=CAU"/>
     </div>
 
     <div className="h-1/5 p-4 bg-yellow-400 flex items-center justify-between relative " onClick={()=>{setFinishRidePanel(true)}}>
        <h5  className="absolute text-2xl top-0 w-[90%] text-center"  >
            <i className="ri-arrow-up-wide-line"></i>
        </h5>
        <h4 className="text-xl font-semibold">2 KM Away</h4>
        <button className='bg-green-600 text-white font-semibold p-3 px-10 rounded-lg text-center'>Complete Ride</button>
     </div>

     <div ref={finishRidePanelRef}  className="fixed bottom-0 z-10 px-3 py-10 pt-12 bg-white w-full translate-y-full" >
        <FinishRide ride={rideData} setFinishRidePanel={setFinishRidePanel} />
    </div>
 
    
 </div>
  )
}

export default CaptainRiding