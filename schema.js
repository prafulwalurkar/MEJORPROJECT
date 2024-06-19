const Joi = require("joi");


module.exports.listingschema = Joi.object({
    listing: Joi.object({
        title: Joi.string().require(),
        discription: Joi.string().require(),
        location: Joi.string().require(),
        country: Joi.string().require(),
        price: Joi.number().require().min(0),
        image: Joi.string().allow("",null),
    }).require(),
    });    