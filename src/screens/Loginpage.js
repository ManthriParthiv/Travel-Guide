import { useState } from 'react';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Login.css'

export default function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate(); // Hook to navigate after login

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/loginuser", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password
        })
      });
      const json = await response.json();
      console.log(json);
      if (!json.success) {
        alert("Invalid credentials, please try again.");
      } else {
        alert("Login successful!");
        // Optionally, redirect the user to a dashboard or another page
        navigate('/'); // Change to your desired route after login
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Something went wrong! Please try again.");
    }
  };
  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };
  return (
    <div className="login-background">
      <form onSubmit={handleSubmit}>
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
        <button type="submit" className="m-3 btn btn-success">Submit</button>
        <Link to='/signup' className='m-3 btn btn-danger'>New User? Sign Up Here</Link>
      </form>
    </div>
  );
}

