const mongoose = require('mongoose');
const express = require('express');
const app = express();

const mongoURL = 'mongodb+srv://manthriparthiv08:manthriparthiv039@clusterproject.l1sp5.mongodb.net/project?retryWrites=true&w=majority&appName=ClusterProject';

// Connect to MongoDB
mongoose.connect(mongoURL)
  .then(async () => {
    console.log('Connection successful');

    // Fetch data from the "sample" collection using async/await
    try {
      const fetched_data = mongoose.connection.db.collection("sample");
      const data = await fetched_data.find().toArray();

      if (data.length === 0) {
        console.log('No data found in the "sample" collection');
      } else {
        console.log('Data available at db.js');
      }
    } catch (err) {
      console.error('Error fetching data:', err);  // Explicit error logging
    }
  })
  .catch((err) => {
    console.error('Connection failed:', err);
  });

// const mongoose = require('mongoose');
// const express = require('express');
// const mongoURL='mongodb+srv://manthriparthiv08:manthriparthiv039@clusterproject.l1sp5.mongodb.net/project?retryWrites=true&w=majority&appName=ClusterProject'
// mongoose.connect(mongoURL).then(()=>{
//     console.log('connection successfull');
//     const fetched_data = mongoose.connection.db.collection("sample");
//     fetched_data.find({}).toArray(function(err,data){
//         if(err) console.log(err);
//         else console.log(data);
//     })
// }).catch((err)=>console.log('no connection'));
// const mongoDB= async()=>{
//     await mongoose.connect(mongoURL,{useNewUrlParser:true},(err,result)=>{
//         if(err) console.log("---",err)
//         else{
//             console.log("connected")
//     }
//     });
// }

