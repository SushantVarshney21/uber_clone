
const LocationSearchPanel = (props) => {
    const locations = [
        'Flat No. 401, Shanti Niketan Apartments, Linking Road, Bandra West,Mumbai, Maharashtra - 400050.',
        'No. 12, 2nd Floor, Green View Complex, Whitefield Main Road, Bangalore, Karnataka - 560066.',
        '45, Park Street, Near St. Xavier’s College, Kolkata, West Bengal - 700016.',
        'C-25, Ground Floor, Connaught Place, New Delhi - 110001.'
    ]
  return (
    <div>
        {/* this is the sample dats */}
        {
            locations.map((location, index) => (
                <div onClick={()=>{
                    props.setVehiclePanel(true)
                    props.setOpenPanel(false)
                }} key={index} className="flex justify-start items-center gap-4 mt-4 border-2 border-white active:border-black rounded-xl p-2">
                    <h2 className="bg-gray-200 rounded-full h-12 w-24 flex items-center justify-center"><i className="ri-map-pin-fill text-2xl"></i></h2>
                    <h4 className="font-semibold">{location}</h4>
                </div>
            ))
        }        
    </div>
  )
}

export default LocationSearchPanel