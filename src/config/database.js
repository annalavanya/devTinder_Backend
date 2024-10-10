const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect('mongodb+srv://annalavanya2002:jQlm0ZytA72gIiNH@namastelavanya.80nfb.mongodb.net/devTinder');
}
module.exports = connectDB;
