import React, { useContext } from 'react'
import { Button, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'react-bootstrap-icons';
import { CartContext } from '../CartContext';


const PageNotFound = () => {
  const {translate} = useContext(CartContext)
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  
  
  return (
    <>
    
   
    <Container>
    <div style={{marginTop:'160px'}}>
    {isLoggedIn ? translate('pageNotFound') : <Container>First login and then enjoying the shopping cart</Container>}
    </div>
        <Link to='/' data-toggle="tooltip" data-placement="top" title="Go back to Home page">
        <Button variant="primary"> <ArrowLeft /></Button>
        </Link>
    </Container>
    </>
  )
}

export default PageNotFound