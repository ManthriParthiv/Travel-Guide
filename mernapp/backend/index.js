const express = require('express');
const app = express();
const port = 5000;
const mongoDB = require('./db');
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000"); // Use HTTP for local dev
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use("/api", require("./Routes/CreateUser"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
//previous code
// const express = require('express')
// const app = express()
// const port = 5000
// const mongoDB=require('./db')
// app.use((req,res,next)=>{
//   res.setHeader("Access-Control-Allow-Origin","https://localhost:3000");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin,X-Requested-With,Content-Type,Accept"
//   );
//   next();
// })
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })
// app.use(express.json())
// app.use("/api",require("./Routes/CreateUser"));
// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })