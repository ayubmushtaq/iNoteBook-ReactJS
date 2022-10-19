import './App.css';
import React, { useState } from "react";
import {
  // createBrowserRouter,
  //createRoutesFromElements,
  Route,
  //RouterProvider,
  Routes,
  BrowserRouter
} from "react-router-dom";
import Home from '../components/Home';
import About from '../components/About';
import Navbar from '../components/Navbar';
import RoleState from '../context/Role/RoleState';
import Alert from '../common/alerts/Alert';
import User from '../features/user/User';
import Login from '../features/login/Login';
import Signup from '../features/signup/Signup';
import ErrorPage from './ErrorPage';
//import ErrorPage from './components/ErrorPage';

function App() {
  const [alert, setAlert] = useState(null);
 
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }
  // const router1 = createBrowserRouter(
  //   createRoutesFromElements(
  //     <Route path="/" element={<Navbar />}>
  //       <Route index element={<Home />} />
  //       <Route path="/about" element={<About />} />
  //     </Route>
  //   )
  // );
  // const router2 = createBrowserRouter([
  //   {
  //     path: "/",
  //     element: <Navbar />,
  //     children: [
  //       {
  //         element: <Home />,
  //         index: true
  //       },
  //       {
  //         path: "about",
  //         element: <About />,
  //       },
  //     ],
  //   },
  // ]);

  // const router3 = createBrowserRouter([
  //   {
  //     path: "/",
  //     element: <Navbar />,
  //     children: [
  //       { index: true, element: <Home /> },
  //       {
  //         path: "about",
  //         element: <About />,
  //       },
  //       /* existing code */
  //     ],
  //   },
  // ]);

  // const router = createBrowserRouter(
  //   createRoutesFromElements(
  //     <Route
  //       path="/"
  //       element={<Navbar />}
  //       errorElement={<ErrorPage />}
  //     >
  //       <Route errorElement={<ErrorPage />}>
  //         <Route index element={<Home />} />
  //         <Route
  //           path="about"
  //           element={<About />}
  //         />
  //       </Route>
  //     </Route>
  //   )
  // );
  return (
    <div className="App">
      {/* <RouterProvider router={router} /> */}
      <RoleState>
        <BrowserRouter>
          <Navbar />
          <Alert alert={alert} />
          <div className='container'>
            <Routes>
              <Route path="/" element={<Home showAlert={showAlert} />} />
              <Route path="user" element={<User showAlert={showAlert} />} />
              <Route path="about" element={<About showAlert={showAlert} />} />
              <Route path="login" element={<Login showAlert={showAlert} />} />
              <Route path="signup" element={<Signup showAlert={showAlert} />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </div>
        </BrowserRouter>
      </RoleState>


    </div>
  );
}

export default App;
