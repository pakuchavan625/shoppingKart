import React, { useContext } from 'react'
import { Button, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'react-bootstrap-icons';
import Footer from '../component/Footer';
import { CartContext } from '../CartContext';



const Success = () => {
  const {translate} = useContext(CartContext)
  return (
    <>
    <div className="celebration-container">
      <h1>{translate("paymentSuccess")}</h1>
      <div className="confetti"></div>
      <span role="img" aria-label="Party Popper" className="emoji">
        🎉
      </span>
    </div>
       <Container>
        <Link to='/home' data-toggle="tooltip" data-placement="top" title="Go back to Home page">
        <Button variant="primary"> <ArrowLeft /></Button>
        </Link>
        </Container>
        <Footer/>
    </>
  
  )
}

export default Success