const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");



const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main().then(()=>{
    console.log("Connect to DB");
}).catch((err)=>{
    console.log(err123);
});


async function main(){
    await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"views"));
app.use(express.urlencoded({extended: true}));

app.get("/",(req,res)=>{
    res.send("Hi I am root");
});

// index routing
app.get("/listings",async(req,res) =>{
    const allListings = await Listing.find({});
    res.render("./listings/index.ejs", {allListings});
});

//show routing
app.get("/listings/:id", async (req, res) => {
    let (id) = req.params;
    const listing = await Listing.findById(id);
    res.render("./listings/show.ejs", { listing });

});


// app.get("/testListing", async(req, res)=> {
//     let sampleListing = new Listing({
//         title : "My villa ",
//         discription : "by the beach",
//         price : 1200,
//         location : "goa",
//         country : "india",
//     });
//     await sampleListing.save();
//     console.log("sample was save");
//     res.send("sucessful testing");
// });

app.listen(8080, ()=>{
    console.log("server is listening to port 8080");
});