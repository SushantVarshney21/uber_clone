import { Link , useLocation} from "react-router-dom"
import { SocketContext } from '../context/SocketContext'
import { useNavigate } from 'react-router-dom'
import { useContext } from "react"

const Riding = () => {
    const location = useLocation()
    const { ride } = location.state || {}
    const { socket } = useContext(SocketContext)
    const navigate = useNavigate()

    socket.on("ride-ended", () => {
        navigate('/home')
    })
  return (
    <div className="h-screen">
        <Link to='/home' className="fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full">
            <i className="text-lg font-medium ri-home-5-line"></i>
        </Link>
        <div className="h-1/2 w-screen">
      <img className="h-full w-full object-cover" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaoGMfZRZ63jDs0hetE46_RArwSddRa9eUgIp9OccJ9RZs-XeLNXne_Ou6wfVw2if4jEY&usqp=CAU"/>
    </div>
    <div className="h-1/2 p-4">
    <div className='gap-4 flex flex-col items-center justify-between'>
    <div className="w-full flex items-center justify-between">
       <img className='h-16' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1712027307/assets/42/eb85c3-e2dc-4e95-a70d-22ee4f08015f/original/Screenshot-2024-04-01-at-9.08.07p.m..png" alt="" />
        <div className="text-right">
            <h2 className="text-lg font-medium">{ride?.captain.fullname.firstname + " " + ride?.captain.fullname.lastname}</h2>
            <h4 className="text-xl font-semibold">{ride?.captain.vehicle.plate}</h4>
            <p className="text-sm text-gray-600">Maruti Suzuki Alto </p>
        </div>
    </div>
       <div className='w-full mt-5'>
           <div className='flex item-center gap-5 p-3 border-b-2'>
               <i className=" text-2xl ri-map-pin-fill"></i>
               <div>
                   <h3 className='text-lg font-medium'>562/11-A</h3>
                   <p className='text-sm -mt-1 text-grap=y-600'>{ride?.destination}</p>
               </div>
           </div>

           <div className='flex item-center gap-5 p-3'>
           <i className="text-2xl ri-secure-payment-fill"></i>
               <div>
                   <h3 className='text-lg font-medium'>₹{ride?.fare}</h3>
                   <p className='text-sm -mt-1 text-grap=y-600'>Cash</p>
               </div>
           </div>
       </div>
 </div>
        <button className='w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg'>Make a Payment</button>
    </div>
    </div>
  )
}

export default Riding