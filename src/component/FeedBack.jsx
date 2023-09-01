import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'react-bootstrap-icons';

const FeedBack = () => {
  return (
    <>
        <h1 style={{marginTop:'165px'}}>Thank you for your message.Our team get back to you soon!</h1>
        <Link to='/home' data-toggle="tooltip" data-placement="top" title="Go back to Home page">
        <Button variant="primary"> <ArrowLeft /></Button>
        </Link>
    </>
  )
}

export default FeedBack