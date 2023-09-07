import React, { useContext } from 'react'
import { Button, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'react-bootstrap-icons';
import { CartContext } from '../CartContext';


const PageNotFound = () => {
  const {translate} = useContext(CartContext)
  return (
    <>
   
    <Container>
    <div style={{marginTop:'160px'}}>
    {translate('pageNotFound')}
    </div>
        <Link to='/home' data-toggle="tooltip" data-placement="top" title="Go back to Home page">
        <Button variant="primary"> <ArrowLeft /></Button>
        </Link>
    </Container>
    </>
  )
}

export default PageNotFound