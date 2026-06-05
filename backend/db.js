require('dotenv').config();
const mongoose = require('mongoose');

const mongoURL = process.env.MONGO_URI;

if (!mongoURL) {
  console.warn("⚠️ Warning: MONGO_URI is not defined in the environment. MongoDB connection bypassed.");
} else {
  console.log("Connecting to MongoDB...");
  mongoose.connect(mongoURL)
    .then(async () => {
      console.log('✅ Connected to MongoDB Atlas successfully');
      try {
        const fetched_data = mongoose.connection.db.collection("sample");
        const data = await fetched_data.find().toArray();
        if (data.length === 0) {
          console.log('No data found in the "sample" collection');
        } else {
          console.log('Data available at db.js');
        }
      } catch (err) {
        console.error('Error fetching data from "sample" collection:', err.message);
      }
    })
    .catch((err) => {
      console.error('❌ MongoDB Connection failed:', err.message);
      console.log('Backend server will continue running in weather-only mode.');
    });
}



