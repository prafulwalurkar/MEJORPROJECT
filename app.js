const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("../models/listing.js");



const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main().then(()=>{
    console.log("Connect to DB");
}).catch((err)=>{
    console.log(err123);
});


async function main(){
    await mongoose.connect(MONGO_URL);
}

app.get("/",(req,res)=>{
    res.send("Hi I am root");
});


app.get("/testListing", async(req, res)=> {
    let sampleListing = new Listing({
        title : "My villa ",
        discription : "by the beach",
        price : 1200,
        location : "goa",
        country : "india",
    });
    await sampleListing.save();
    console.log("sample was save");
    res.send("sucessful testing");
});

app.listen(8080, ()=>{
    console.log("server is listening to port 8080");
});