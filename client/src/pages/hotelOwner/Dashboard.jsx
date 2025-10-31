import React from 'react'
import Title from '../../components/Title'
import { assets, dashboardDummyData } from '../../assets/assets'
import { useState } from 'react'

const Dashboard = () => {

        const [dashboardData,setDashboardData] = useState(dashboardDummyData)

  return (
    <div>
        <Title
        title='Dashboard'
        align="left"
        font= "outfit"
        subTitle= "Monitor your room listings, track bookings and analyze revenue-all in one place. Stay update with real-time insights to ensure smooth operations.  " />
        <div className="flex gap-4 my-8">
            {/* {Total-Bookings} */}
            <div className="bg-primary/3 border border-primary/10 rounded flex p-4 pr-8">
            <img
            className='max-sm:hidden h-10 ' 
            src= {assets.totalBookingIcon} alt="" />
            <div className="flex flex-col sm:ml-4 font-medium">
                <p className='text-lg text-blue-500'>Total Bookings</p>
                <p className='text-neutral-400 text-base'>{dashboardData.totalBookings}</p>
            </div>
            </div>
            {/* {Total-Revenue} */}
            <div className="bg-primary/3 border border-primary/10 rounded flex p-4 pr-8">
            <img
            className='max-sm:hidden h-10 ' 
            src= {assets.totalRevenueIcon} alt="" />
            <div className="flex flex-col sm:ml-4 font-medium">
                <p className='text-lg text-blue-500'>Total Revenue</p>
                <p className='text-neutral-400 text-base'>$ {dashboardData.totalRevenue}</p>
            </div>
            </div>

        </div>
        {/* {Recent Bookings} */}
        <h2 className='text-xl text-blue-950/70 font-medium mb-5 '
        >Recent Bookings</h2>
        <div className="w-full max-w-3xl text-left border border-gray-300 rounded-lg max-h-80 overflow-y-scroll">
         <table className='w-full '>
             <thead className='bg-gray-50'>
               <tr>
                  <th className='py-3 px-4  text-gray-800 font-medium '>User Name</th>
                  <th className='py-3 px-4 text-gray-800 font-medium max-sm:hidden'>Room Name</th>
                  <th className='py-3 px-4 text-gray-800 font-medium text-center '>Total Amount</th>
                  <th className='py-3 px-4 text-gray-800 font-medium text-center'>Payment Status</th>
               </tr>
                </thead>

                <tbody className='text-sm'>
                  {dashboardData.bookings.map((item,index)=>(
                    <tr key={index}>
                        <td className='py-3 px-4 text-gray-700 border-t border-gray-300'>
                            {item.user.username}
                        </td>
                        <td className='py-3 px-4 text-gray-700 border-t max-sm:hidden border-gray-300'>
                            {item.room.roomType}
                        </td>
                        <td className='py-3 text-center px-4 text-gray-700 border-t border-gray-300'>
                            $ {item.totalPrice}
                        </td>
                        <td className='py-3 px-4 text-gray-700 border-t border-gray-300 flex'>
                            <button className= {`py-1 px-3  text-sm rounded-full mx-auto
                                ${item.isPaid ? "bg-green-200 text-green-600" : "bg-amber-200 text-yellow-600"}`}>
                                    {item.isPaid ? "Completed" : "Pending"}
                                </button>
                           
                        </td>
                    </tr>
                  ))}
                </tbody>
            </table>
        </div>
      
    </div>
  )
}

export default Dashboard
