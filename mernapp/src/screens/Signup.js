import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./signup.css";
export default function Signup() {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    geolocation: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/createuser", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
          location: credentials.geolocation
        })
      });

      const json = await response.json();
      console.log(json);

      if (!json.success) {
        alert("Enter valid details");
      } else {
        alert("Signup successful!");
        // Optionally, redirect to login or another page
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("Something went wrong! Please try again.");
    }
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={credentials.name}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={credentials.email}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={credentials.password}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="geolocation">Location</label>
          <input
            type="text"
            className="form-control"
            name="geolocation"
            value={credentials.geolocation}
            onChange={onChange}
            required
          />
        </div>
        <button type="submit" className="m-3 btn btn-success">Submit</button>
        <Link to='/login' className='m-3 btn btn-danger'>Already a User</Link>
      </form>
    </div>
  );
}

// import React,{useState} from 'react'
// import { Link } from 'react-router-dom'
// export default function Signup() {
//   const [credentials, setcredentials] = useState({name:"",email:"",password:"",geolocation:""})
//   const handleSubmit=async(e)=>{
//       e.preventDefault();
//       const response =await fetch("https://localhost:5000/api/createuser",{
//         method:'POST',
//         headers:{
//           'Content-Type':'application/json'
//         },
//         body:JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password,location:credentials.geolocation})
//       });
//       const json = await response.json()
//       console.log(json);

//       if (!json.success){
//         alert("enter valid")
//       }

//   }
//   const onchange=(event)=>{
//     setcredentials({...credentials,[event.target.name]:event.target.value})
//   }
//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//   <div className="form-group">
//     <label htmlFor="name">Name</label>
//     <input type="text" className="form-control" name="name" value={credentials.name} onChange={onchange}/>
//   </div>
//   <div className="form-group">
//     <label htmlFor="email">Email</label>
//     <input type="text" className="form-control" name='email' value={credentials.email} onChange={onchange}/>
//   </div>
//   <div className="form-group">
//     <label htmlFor="password">Password</label>
//     <input type="text" className="form-control" name='password' value={credentials.password} onChange={onchange}/>
//   </div>
//   <div className="form-group">
//     <label htmlFor="geolocation">Location</label>
//     <input type="text" className="form-control" name='geolocation' value={credentials.geolocation} onChange={onchange}/>
//   </div>
//   <button type="submit" className=" m-3 btn btn-success">Submit</button>
//   <Link to = '/login' className='m-3 btn btn-danger'>Already a User</Link>
// </form>
//     </div>
//   )
// }
