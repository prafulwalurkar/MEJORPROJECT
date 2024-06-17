const mongoose = require("mongoose");
const review = require("./review");
 const Schema = mongoose.Schema;
 

 const listingschema = new Schema({
     title : {
         type : String,
         require : true,
     },
     description : String,
     image : {
         type : String,
         set: (v) =>  v === "" ? "https://media.istockphoto.com/id/184103864/photo/clouds-on-sky.jpg?s=1024x1024&w=is&k=20&c=n09_q789C4LPvey3op74SGkt3-OgmR8r-giT5jiEWeA=":v
          },
     price : Number,
     location : String,
     country : String,
     reviews:[
        {
        type: Schema.Types.ObjectId,
        ref:"review",
     }
    ]
 });

const Listing = mongoose.model("Listing",listingschema);
module.exports = Listing;
