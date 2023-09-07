import { useState } from "react";
import NavBar from "./component/NavBar";
import { BrowserRouter as Router, Routes, Route, Navigate  } from "react-router-dom";
import ProductStrore from "./pages/ProductStrore";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";
import { Container } from "react-bootstrap";
import CartProvider from "./CartContext";
import Login from "./component/Login";
import PageNotFound from "./component/PageNotFound";
import Crousal from "./component/Crousal";
import SignUp from "./component/SignUp";
import FeedBack from "./component/FeedBack";

// import './App.css'

function App() {
  const [count, setCount] = useState(100);
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  


  return (
    
    <>
    <CartProvider>
    <div style={{overflowX:'hidden'}}>
      <Router>
        <NavBar />
        <Crousal/> 
        <Routes>
        <Route
          exact path="/"
          element={isLoggedIn ? <Navigate to="/home" replace={true} /> : <Navigate to="/login" replace={true} />}
        />
          <Route  path="/home" element={<ProductStrore />} />
          <Route path='/login' element={<Login/>}/>
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
          <Route path='/register' element={<SignUp/>}/>
          <Route path='/feedback' element={<FeedBack/>}/>
          {/* fallback Rout */}
          <Route path='*' element={<PageNotFound/>}/>
        </Routes>
      </Router>
      </div>
    </CartProvider>
      
    </>
  );
}

export default App;
