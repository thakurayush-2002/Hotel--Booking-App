const mongoose = require("mongoose");

const connectDB = async()=>{
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/hotel-booking`)
        console.log("DB connected✅")
        
    }
    
    catch (error){
         console.log(error.message)
    }
}
module.exports = connectDB;