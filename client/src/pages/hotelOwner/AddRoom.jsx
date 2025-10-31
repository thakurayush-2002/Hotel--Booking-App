import React, { useState } from 'react'
import Title from '../../components/Title';
import { assets } from '../../assets/assets';

const AddRoom = () => {
  const[images,setImages]=useState({
    1:null,
    2:null,
    3:null,
    4:null
  });
  const[inputs,setInputs]=useState({
     roomType:"",
     pricePerNight:0,
     amenities:{
      "Free WiFi": false,
      "Free Breakfast":false,
      "Room Service":false,
      "Mountain View":false,
      "Pool Access":false
     }
  });

  return (
    <form>
      <Title align= "left" font= "outfit"
      title= "Add Room"
      subTitle= "Fill in the details carefully and accurate room details, pricing and amenities, to enhance the user booking experience." />
      {/* {Upload Area for Images} */}
      <p className='text-gray-800 mt-10'>Images</p>
      <div className="grid grid-cols-2 sm:flex gap-4 flex-wrap my-2 ">
        {Object.keys(images).map((key)=>(
          <label htmlFor= {`roomImage${key}`} key={key}>
            <img className='max-h-13 cursor-pointer opacity-80'
            src= {images[key] ? URL.createObjectURL(images[key]) : assets.uploadArea} alt="" />

            <input type="file"
            accept='image/*'
            id={`roomImage${key}`}
            hidden
            onChange={e=> setImages ({...images,[key] : e.target.files[0]})} />
          </label>
        ))}
      </div>

      <div className="flex max-sm:flex-col w-full mt-4 sm:gap-4">
        <div className="flex-1 max-w-48">
          <p className='text-gray-880 mt-4'>Room Type</p>
          <select className='border opacity-70 border-gray-300 mt-1 rounded p-2 w-full'
          value={inputs.roomType}
          onChange={e=> setInputs({...inputs,roomType : e.target.value})}>
            <option value="">Select Room Type</option>
            <option value="Single Bad">Single Bad</option>
            <option value="Double Bad">Double Bad</option>
            <option value="Luxury Room">Luxury Room</option>
            <option value="Family Suite">Family Suite</option>
          </select>
        </div>
        <div className="">
          <p className='mt-4 text-gray-800'>
            Price<span className='text-sm'>/night</span>
          </p>
          <input type="number" placeholder='0' 
          className='border border-gray-300 mt-1 rounded p-2 w-24'
          value={inputs.pricePerNight}
          onChange={e=>setInputs ({...inputs,pricePerNight : e.target.value})}/>  
         
        </div>
      </div>

      <p className='mt-4 text-gray-800'>Amenities</p>
      <div className="flex flex-col flex-wrap mt-1 gap-1 text-gray-400 max-w-sm">
        {Object.keys(inputs.amenities).map((amenity,index)=>(
          <div className=""key={index}>
            <input type="checkbox"
             id={`amenities${index + 1}`} 
             checked={inputs.amenities[amenity]} 
             onChange={() => setInputs({...inputs, amenities: {...inputs.amenities, [amenity]: !inputs.amenities[amenity]

             }})}/>

             <label htmlFor={`amenities${index + 1}`}> {amenity}</label>

          </div>
        ))}
      </div>
      <button className='bg-primary px-8 py-2 mt-8 text-white rounded cursor-pointer'>
        Add Room
      </button>
    </form>
  )
}

export default AddRoom
