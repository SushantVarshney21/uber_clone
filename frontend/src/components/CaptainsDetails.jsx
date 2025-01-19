import { useContext } from "react"
import {CaptainDataContext} from "../context/CaptainContext"
const CaptainsDetails = () => {
  const {captain} = useContext(CaptainDataContext)
  return (
    <div>
            <div className='flex justify-between items-center p-2'>
          <div>
            <img className='w-12 h-12 object-cover rounded-full' src="https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D" alt="" />
            <h4 className='text-lg font-medium capitalize'>{captain.fullname.firstname + " " + captain.fullname.lastname}</h4>
          </div>
          <div>
            <h4 className='text-xl font-medium'>₹295.21</h4>
            <p className='text-sm text-gray-600'>Earned</p>
          </div>
        </div>
        <div className='flex items-start justify-center gap-5 bg-gray-100 p-4 rounded-xl mt-5 '>
          <div className='text-center'> 
            <i className='mb-3 text-2xl font-thin ri-timer-2-line'></i>
            <h5 className='text-lg font-medium'>10.2</h5>
            <p className='text-sm text-gray-600'>Hours online</p>
          </div>
          <div className='text-center'>
          <i className='mb-3 text-2xl font-thin ri-speed-up-line'></i>
          <h5 className='text-lg font-medium'>10.2</h5>
            <p className='text-sm text-gray-600'>Hours online</p>
          </div>
          <div className='text-center'>
          <i className='mb-3 text-2xl font-thin ri-booklet-line'></i>
          <h5 className='text-lg font-medium'>10.2</h5>
            <p className='text-sm text-gray-600'>Hours online</p>
          </div>
        </div>
    </div>
  )
}

export default CaptainsDetails