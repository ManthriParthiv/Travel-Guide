import './App.css';
import Home from './screens/Home';
import Login from './screens/Login';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Signup from './screens/Signup';
import Hotelbooking from './screens/Hotelbooking';
import Aboutus from './screens/Aboutus';
import ContactUs from './screens/Contact Us';
import Travelbooking from './screens/Travelbooking';
import Nearby from './screens/Nearby';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
        console.log(response);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Helmet>
        {/* Bootstrap Icons CDN */}
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" />
        
        {/* You can add other meta tags here too */}
        <meta name="description" content="Travel Planner - Your ultimate travel planning application" />
      </Helmet>
      
      <Router>
        <div>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/signup' element={<Signup />} />
            <Route exact path='/hotelbooking' element={<Hotelbooking />} />
            <Route exact path='/aboutus' element={<Aboutus />} />
            <Route exact path='/contactus' element={<ContactUs />} />
            <Route exact path='/travelbooking' element={<Travelbooking />} />
            <Route exact path='/Nearby' element={<Nearby />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;