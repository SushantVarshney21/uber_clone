
const ConfirmRide = (props) => {
  return (
    <div>
         <h5  className="flex items-center justify-center text-2xl" onClick={()=>{props.setConfirmRidePanel(false)}}>
        <i className="ri-arrow-down-wide-line"></i>
        </h5>
      <h3 className="text-2xl font-semibold mb-3">Confirm your ride</h3>
      <div className='gap-4 flex flex-col items-center justify-between'>
            <img className='h-24' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1712027307/assets/42/eb85c3-e2dc-4e95-a70d-22ee4f08015f/original/Screenshot-2024-04-01-at-9.08.07p.m..png" alt="" />
            <div className='w-full mt-5'>
                <div className='flex item-center gap-5 p-3 border-b-2'>
                <i className="text-2xl ri-map-pin-user-fill"></i>
                    <div>
                        <h3 className='text-lg font-medium'>565/14-D</h3>
                        <p className='text-sm -mt-1 text-grap=y-600'>Mangal kalash, Atrauli</p>
                    </div>
                </div>

                <div className='flex item-center gap-5 p-3 border-b-2'>
                    <i className=" text-2xl ri-map-pin-fill"></i>
                    <div>
                        <h3 className='text-lg font-medium'>562/11-A</h3>
                        <p className='text-sm -mt-1 text-grap=y-600'>Ganga ji, Narora</p>
                    </div>
                </div>

                <div className='flex item-center gap-5 p-3'>
                <i className="text-2xl ri-secure-payment-fill"></i>
                    <div>
                        <h3 className='text-lg font-medium'><i className="ri-money-rupee-circle-line"></i>193.20</h3>
                        <p className='text-sm -mt-1 text-grap=y-600'>Cash</p>
                    </div>
                </div>
            </div>
            <button onClick={()=> {
                props.setVehicleFound(true)
                props.setConfirmRidePanel(false)
            }} className='w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg'>Confirm</button>
      </div>

    </div>
  )
}

export default ConfirmRide