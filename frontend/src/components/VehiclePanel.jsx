
const VehiclePanel = (props) => {
  return (
    <div>
        <h5  className="flex items-center justify-center text-2xl" onClick={()=>{props.setVehiclePanel(false)}}>
        <i className="ri-arrow-down-wide-line"></i>
        </h5>
      <h2 className="text-2xl font-semibold mb-3">Choose a vehicle</h2>
      <div onClick={()=>{
        props.setConfirmRidePanel(true)
        props.setVehiclePanel(false)
      }} className="w-full flex justify-between items-center p-3 mb-3  active:border-2 border-black rounded-xl">
        <img className="h-14" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1712027307/assets/42/eb85c3-e2dc-4e95-a70d-22ee4f08015f/original/Screenshot-2024-04-01-at-9.08.07p.m..png"/>
        <div className="ml-3 w-1/2">
          <h4 className="font-medium text-base">UberGo <span><i className="ri-user-3-fill"/>4</span></h4>
          <h5 className="font-medium text-sm">2 mins away</h5>
          <p className="font-normal text-xs text-gray-700">Affordable, compact rides</p>
        </div>
        <h2 className="text-xl font-semibold"><i className="ri-money-rupee-circle-fill"></i>193.20</h2>
      </div>

      <div className="w-full flex justify-between items-center p-3 mb-3  active:border-2 border-black rounded-xl">
        <img className="h-14" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png"/>
        <div className="ml-3 w-1/2">
          <h4 className="font-medium text-base">Moto <span><i className="ri-user-3-fill"/>1</span></h4>
          <h5 className="font-medium text-sm">3 mins away</h5>
          <p className="font-normal text-xs text-gray-700">Affordable, motorcycle rides</p>
        </div>
        <h2 className="text-xl font-semibold"><i className="ri-money-rupee-circle-fill"></i>65</h2>
      </div>

      <div className="w-full flex justify-between items-center p-3 mb-3  active:border-2 border-black rounded-xl">
        <img className="h-14" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsFabRnJZ8deGXJSKA1QjN45920WytRrdFsA&s"/>
        <div className="ml-3 w-1/2">
          <h4 className="font-medium text-base">UberAuto <span><i className="ri-user-3-fill"/>3</span></h4>
          <h5 className="font-medium text-sm">3 mins away</h5>
          <p className="font-normal text-xs text-gray-700">Affordable, auto rides</p>
        </div>
        <h2 className="text-xl font-semibold"><i className="ri-money-rupee-circle-fill"></i>118.21</h2>
      </div>
    </div>
  )
}

export default VehiclePanel