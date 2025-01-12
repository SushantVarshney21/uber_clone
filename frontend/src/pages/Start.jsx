// import React from 'react'

import { Link } from "react-router-dom"

const Start = () => {
  return (
    <div>
        <div className="bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1557404763-69708cd8b9ce?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dHJhZmZpYyUyMGxpZ2h0fGVufDB8fDB8fHww)] flex justify-between flex-col  h-screen w-full">
            <img className="w-24 ml-8 mt-2" src="https://cdn-assets-us.frontify.com/s3/frontify-enterprise-files-us/eyJwYXRoIjoicG9zdG1hdGVzXC9hY2NvdW50c1wvODRcLzQwMDA1MTRcL3Byb2plY3RzXC8yN1wvYXNzZXRzXC9lZFwvNTUwOVwvNmNmOGVmM2YzMjFkMTA3YThmZGVjNjY1NjJlMmVmMzctMTYyMDM3Nzc0OC5haSJ9:postmates:9KZWqmYNXpeGs6pQy4UCsx5EL3qq29lhFS6e4ZVfQrs?width=800" alt="" />
            <div className="bg-white w-full py-4 px-4 pb-8 ">
                <h2 className="text-3xl font-bold">Get Started With Uber</h2>
                <Link to='/login' className="flex item-center justify-center bg-black text-white rounded p-3 w-full mt-3 pointer">Continue</Link>
            </div>
        </div>
    </div>
  )
}

export default Start