import './App.css';
import Home from './screens/Home';
import Login from './screens/Login';
import axios from 'axios';
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
    // Your effect logic here
    const fetchData = async () => {
      try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
        console.log(response);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []); // Fetch data when the component mounts

  return (
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
  );
}

export default App; // Only one default export

// import './App.css';
// import Home from './screens/Home';
// import axios from 'axios';
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route
// } from "react-router-dom";
// import Login from './screens/Login';
// import Signup from './screens/Signup';
// import Hotelbooking from './screens/Hotelbooking';
// import { useEffect } from 'react';
// function App() {
//   useEffect(()=>{
//     axios
//     .get("https://jsonplaceholder.typicode.com/posts")
//     .then((res)=>{
//       console.log(res)
//     })
//   },[]);
//   return (
//     <Router>
//       <div>
//         <Routes>
//           <Route exact path='/' element={<Home/>}/>
//           <Route exact path='/login' element={<Login/>}/>
//           <Route exact path='/signup' element={<Signup/>}/>
//           <Route exact path='/hotelbooking' element={<Hotelbooking/>}/>
//         </Routes>
//       </div>
//     </Router>
//   );
// }
// export default App;
