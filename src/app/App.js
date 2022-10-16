import './App.css';
import React from "react";
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
import { Alert } from '../components/Alert';
import User from '../features/user/User';
//import ErrorPage from './components/ErrorPage';

function App() {
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
          <Alert message={'This is sample alert.'} />
          <div className='container'>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="user" element={<User />} />
              <Route path="about" element={<About />} />
            </Routes>
          </div>
        </BrowserRouter>
      </RoleState>


    </div>
  );
}

export default App;
