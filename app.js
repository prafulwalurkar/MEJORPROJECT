const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("../listing.js");



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


app.get("/testListing", (req, res)=> {

})

app.listen(8080, ()=>{
    console.log("server is listening to port 8080");
});