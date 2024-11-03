const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedhelpers');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
    console.log("Database connection");
});

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 30; i++) {
        const random20 = Math.floor(Math.random() * 30);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '662df6a06aebf10d3b60276e',
            location: `${cities[random20].city},${cities[random20].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Mother Nature',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random20].longitude,
                    cities[random20].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dwkfsiqwz/image/upload/v1715062772/YelpCamp/yooalqjkbnn5uveq7lk1.jpg',
                    filename: 'YelpCamp/wdslwg6jov318pz6nggec'
                }
            ]
        });
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});
