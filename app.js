const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");//method override
const ejsMate =require("ejs-mate");//layout for css like nav bar
const warpAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema , reviewSchema } = require("./schema.js");

const Review =require("./models/review.js");


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
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

app.get("/",(req,res)=>{
    res.send("Hi I am root");
});


const validatedListing = (req, res, next)=> {
    let { error } = listingschema.validate(require.body);
    if(error){
        let errMsg =error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else{
        next();
    }
};


const validatedReview = (req, res, next)=> {
    let { error } = reviewSchema.validate(require.body);
    if(error){
        let errMsg =error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else{
        next();
    }
};
//Index Route
app.get("/listings",warpAsync(async(req,res) =>{
    const allListings = await Listing.find({});
    res.render("./listings/index.ejs", {allListings});
}));

//New Route
app.get("/listings/new",async(req, res)=>{
    res.render("./listings/new.ejs");
});

//show routing
app.get("/listings/:id", warpAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate("reviews");
    res.render("./listings/show.ejs", { listing });

}));

//Create Route

app.post("/listings", validatedListing ,warpAsync(async (req, res, next)=>{
    if(!req.body.listing){
        throw new ExpressError(400, "send valid data listing");
    }
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("./listings");
    
})
);

//Edit Route

app.get("/listings/:id/edit", warpAsync(async(req,res)=>{
    let { id }=req.params;
    const listing = await Listing.findById(id);
    res.render("./listings/edit.ejs", {listing});

}));

//Update Route

app.put("/listings/:id", warpAsync(async (req,res)=> {
    if(!req.body.listing){
        throw new ExpressError(400, "send valid data listing");
    }
    let { id }=req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect("./listings/edit.ejs");

}));

//Delete Route

app.delete("/listings/:id", warpAsync(async(req, res)=>{
    let {id}= req.params;
    let deletedListing =await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");

}));

// //REVIEW
// //POST ROUTE

app.post("/listings/:id/reviews", validatedReview,
    warpAsync(async (req, res)=>{
    let listing =await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();

    res.redirect('/listings/${listing._id}');
    
})
);

app.all("*",(req, res, next)=>{
    next(new ExpressError(400, "Page not Found"));
});

app.use((err, req, res, next)=> {
    let {statusCode=500, message="something went wrong"} = err;
    res.status(statusCode).render("error.ejs", {message});
   // res.status(statusCode).send(message);
});

app.listen(8080, ()=>{
    console.log("server is listening to port 8080");
});