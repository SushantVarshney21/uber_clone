import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from 'axios'

const ConfirmRidePopUp = (props) => {
  const [otp, setOtp] = useState('')

  const navigate = useNavigate()

  const submitHander = async (e) => {
    e.preventDefault()

    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`, {
        params: {
            rideId: props.ride._id,
            otp: otp
        },
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })

    if (response.status === 200) {
        props.setConfirmRidePopUpPanel(false)
        props.setRidePopUpPanel(false)
        navigate('/captain-riding',{ state: { ride: props.ride } })
    }


}
  return (
    <div>
    <h5  className="flex items-center justify-center text-2xl" onClick={()=>{props.setConfirmRidePopUpPanel(false)}} >
   <i className="ri-arrow-down-wide-line"></i>
   </h5>
 <h3 className="text-2xl font-semibold mb-3">Confirm this ride to start</h3>
 <div className="flex items-center justify-between mt-4 bg-yellow-400 rounded-lg p-3">
   <div className="flex items-center gap-3">
   <img className="h-14 w-14 rounded-full object-cover bg-gray-100" src="https://static.vecteezy.com/system/resources/previews/049/997/095/non_2x/handsome-young-man-with-confident-expression-in-white-shirt-with-isolated-on-transparent-background-cut-out-png.png" alt="" />
   <h2 className='text-lg font-medium capitalize'>{props.ride?.user.fullname.firstname + " " + props.ride?.user.fullname.lastname}</h2>
   </div>
   <h5 className="text-lg font-semibold">2.4 KM</h5>
 </div>
 <div className='gap-4 flex flex-col items-center justify-between'>
       <div className='w-full mt-5'>
           <div className='flex item-center gap-5 p-3 border-b-2'>
           <i className="text-2xl ri-map-pin-user-fill"></i>
               <div>
                   <h3 className='text-lg font-medium'>565/14-D</h3>
                   <p className='text-sm -mt-1 text-gray-600'>{props.ride?.pickup}</p>
               </div>
           </div>

           <div className='flex item-center gap-5 p-3 border-b-2'>
               <i className=" text-2xl ri-map-pin-fill"></i>
               <div>
                   <h3 className='text-lg font-medium'>562/11-A</h3>
                   <p className='text-sm -mt-1 text-gray-600'>{props.ride?.destination}</p>
               </div>
           </div>

           <div className='flex item-center gap-5 p-3'>
           <i className="text-2xl ri-secure-payment-fill"></i>
               <div>
               <h3 className='text-lg font-medium'>₹{props.ride?.fare} </h3>
                   <p className='text-sm -mt-1 text-grap=y-600'>Cash</p>
               </div>
           </div>
       </div>
       <div className="w-full mt-5">
       <form onSubmit={submitHander}>
                        <input value={otp} onChange={(e) => setOtp(e.target.value)} type="text" className='bg-[#eee] px-6 py-4 font-mono text-lg rounded-lg w-full mt-3' placeholder='Enter OTP' />

                        <button className='w-full mt-5 text-lg flex justify-center bg-green-600 text-white font-semibold p-3 rounded-lg'>Confirm</button>
          <button onClick={()=>{props.setConfirmRidePopUpPanel(false)}}  className='w-full mt-3 bg-red-700 text-white font-semibold p-3 rounded-lg' >Cancel</button>
          </form>
       </div>
 </div>

</div>
  )
}

export default ConfirmRidePopUp