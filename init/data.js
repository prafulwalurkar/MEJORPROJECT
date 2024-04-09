const samplelisting = new Schema({
    title: {
        type : String,
        required : true,
    },
    descrption: String,
    image: {
        type : String,
        default:"https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-980x653.jpg"
        set: (v) => 
        v ==="" ? "https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-980x653.jpg"
        : v,
    },
    price: Number,
    location: String,
    country: String,
});


module.exports = {data: samplelisting};
