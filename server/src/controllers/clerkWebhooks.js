const { json } = require("express");
const userModel = require("../models/userModel");
const { Webhook } = require ("svix");
const { Message } = require("svix/dist/api/message");

const clerkWebhooks = async (req,res)=>{
  try{
    //Create a svix instance with clerk webhook secret.
    const whook = new Webhook (process.env.CLERK_WEBHOOK_SECRET)

    // Getting Headers 
    const headers ={
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };
    //verifying headers.
    await whook.verify(JSON.stringify(req.body),headers)

    // Getting Data from request body
    const {date,type} = req.body
    const userData = {
      _id:data.id,
      email: data.email_addresses[0].email_address,
      username: data.first_name + " " + data.last_name,
      image:date.image_url,

    };
    //switch cases for differernt events.
    switch(type){
      case "user.created":{
        await userModel.create(userData);
        break;
      }
      case "user.updated":{
        await userModel.findByIdAndUpdate(data.id,userData);
        break;
      }
      case "user.deleted":{
        await userModel.findByIdAndDelete(data.id);
        break;
      }
      default:
        break;
    }
    res.json({success: true, mimeessage:"Webhook Recieved"})
  }
  catch (error){
    console.log(error.message);
    res.JSON({success:false,message: error.message});
  }
}
module.exports = clerkWebhooks;