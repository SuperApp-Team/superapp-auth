// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import Register from './Register'
// import Form from './Form'
// import Loginsignup from '../Loginsignup/Loginsignup'
// import Login from './Login'
// import { BrowserRouter } from 'react-router-dom'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <BrowserRouter>
//         <Login/>
//         </BrowserRouter>

//       </div>
//     </>
//   )
// }

// export default App
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>

    <ToastContainer/> 
    </>
  );
}
