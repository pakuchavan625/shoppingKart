import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'react-bootstrap-icons';
import Footer from '../component/Footer';


const Success = () => {
  return (
    <>
    <div className="celebration-container">
      <h1>Congratulations! Payment Successful</h1>
      <div className="confetti"></div>
      <span role="img" aria-label="Party Popper" className="emoji">
        🎉
      </span>
    </div>
       
        <Link to='/home' data-toggle="tooltip" data-placement="top" title="Go back to Home page">
        <Button variant="primary"> <ArrowLeft /></Button>
        </Link>
        <Footer/>
    </>
  
  )
}

export default Success