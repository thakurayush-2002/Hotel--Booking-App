import React, { useState } from 'react'
import { assets, facilityIcons, roomsDummyData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import StarRating from '../components/StarRating'


const CheckBox = ({label,selected = false, onChange = ()=>{}})=>{
    return(
        <label className="flex gap-3 items-center mt-2 cursor-pointer text-sm ">
            <input type="checkbox"
            checked = {selected}
            onChange = {(e)=>onChange(e.target.checked,label)} />
            <span className='font-light select-none'>{label}</span>
        </label>
    )
}

const RadioButton = ({label,selected = false, onChange = ()=>{}})=>{
    return(
        <label className="flex gap-3 items-center mt-2 cursor-pointer text-sm ">
            <input type="radio"
            checked = {selected}
            name='sortOption'
            onChange = {()=>onChange(label)} />
            <span className='font-light select-none'>{label}</span>
        </label>
    )
}




const AllRooms = () => {

    const navigate = useNavigate();
    const[openFilters,setOpenFilters] = useState(false);

    const  roomTypes =[
        "Single Bad",
        "Double Bad",
        "Luxury Room",
        "Family Suite"
    ];
     const priceRanges =[
        "0 to 500",
        "500 to 1000",
        "1000 to 2000",
        "2000 to 3000"
    ];
     const  sortOptions =[
        "Price Low to High",
        "Price High to Low",
        "Newest first",
        
    ];


  return (
    <div className='flex flex-col-reverse lg:flex-row items-start justify-between pt-28 px-4 md:pt-35 md:px-16 lg:px-24 xl:px-32'>
      <div className="">
                  <div className="flex flex-col items-start text-left">
        <h1 className="text-4xl font-playfair md:text-[40px]">Hotel Rooms</h1>
        <p className='text-sm md:text-base max-w-174 text-gray-500/90 mt-2'> Take advantage of our limited-time offers and special packages to enhance your stay and create unforgettable memories.</p>
      </div>
      
      {roomsDummyData.map((room)=>(
        <div key={room._id}
         className="flex flex-col md:flex-row items-start gap-6 py-10 border-b border-gray-300 last:pb-30 last:border-0">
            <img
            onClick={()=>{navigate(`/rooms/${room._id}`); scrollTo(0,0)}} 
            src= {room.images[0]} alt="Hotel-rooms" 
            title='View Room Details'
            className='max-h-65 md:w-1/2 rounded-xl shadow-lg object-cover cursor-pointer' />
            <div className="md:w-1/2 flex flex-col gap-2">
            <p className='text-gray-500'>{room.hotel.city}</p>
            <p 
            onClick={()=>{navigate(`/rooms/${room._id}`); scrollTo(0,0)}} 
            className='text-gray-800 text-3xl cursor-pointer font-playfair'>{room.hotel.name}</p>
            <div className="flex items-center">
                <StarRating/>
                <p className='ml-2' > 200 + reviews</p>
            </div>
            <div className="flex items-center gap-1 text-gray-500 text-sm mt-2">
                <img src= {assets.locationIcon} alt="location-icon"/> 
                <span>{room.hotel.address}</span> 
            </div>
            {/* {room amenities} */}
               <div className="flex flex-wrap items-center mt-3 mb-6 gap-4">
                       {room.amenities.map((item,index)=>(
                        <div className="gap-2 items-center flex px-3 py-2 rounded-lg bg-[#F5F5FF]/70">
                            <img src= {facilityIcons[item]} alt="item"  className='w-5 h-5'/>
                            <p className='text-xs'>{item}</p>
                        </div>
                       ))}
               </div>
               {/* {Room price par night} */}
               <p className='text-gray-700 text-xl font-medium'>
                {room.pricePerNight}/night
               </p>
            </div>
        </div>
      )
    )};
      </div>
      {/* {Filters} */}
      <div className="bg-white w-80 border border-gray-300 text-gray-600 max-lg:mt-8 min-lg:mt-16">
        <div className={`flex items-center justify-between px-5 py-2.5 border-gray-300 ${openFilters ? 'border-b' : ''}`}>

            <p className='text-gray-800 text-base font-medium'>FILTERS</p>
            <div className="cursor-pointer text-xs">
                <span
                onClick={()=>setOpenFilters(!openFilters)}
                 className='lg:hidden'>{openFilters ? "HIDE" : "SHOW"}</span>
                <span className='hidden lg:block'>CLEAR</span>
            </div>
        </div>
           <div className={`${openFilters ? 'h-auto' :"h-0  lg:h-auto"} overflow-hidden transition-all duration-700`}>
            <div className="px-5 pt-5">
                <p className='font-medium pb-2 text-gray-800'>Popular filters</p>
                {roomTypes.map((room,index)=>(
                    <CheckBox key={index} label={room}/>
                ))}
            </div>
        
            <div className="px-5 pt-5">
                <p className='font-medium pb-2 text-gray-800'>Price Range</p>
                {priceRanges.map((range,index)=>(
                    <CheckBox key={index} label={`$ ${range}`}/>
                ))}
            </div>

            <div className="px-5 pt-5 pb-7">
                <p className='font-medium pb-2 text-gray-800'>Sort By</p>
                {sortOptions.map((option,index)=>(
                    <RadioButton key={index} label={option}/>
                ))}
            </div>
           </div>
      </div>
    </div>
  )
}

export default AllRooms

