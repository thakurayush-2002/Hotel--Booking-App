const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
        _id:{type:String, require:true},
        username:{type:String, require:true},
        email:{type:String, require:true, unique:true},
        image:{type:String, require:true},
        role:{type:String, enum:["user","hotelOwner"], default:"user"},
        recentSearchedCities:[{type:String, require:true}],
},{timestamps:true}
);

const userModel = mongoose.models.user || mongoose.model("user",userSchema)

module.exports = userModel;