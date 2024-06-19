const Joi = require("joi");
const review = require("./models/review");


module.exports.listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().require(),
        discription: Joi.string().require(),
        location: Joi.string().require(),
        country: Joi.string().require(),
        price: Joi.number().require().min(0),
        image: Joi.string().allow("",null),
    }).require(),
    });  
    
module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().require().min(1).max(5),
        comment: Joi.string().require()
    }).require()
});