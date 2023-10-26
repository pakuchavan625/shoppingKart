
import { Button, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { ArrowLeft, } from 'react-bootstrap-icons';
import Footer from '../component/Footer';



const Success = () => {
  
  return (
    <> 
      <Container>
        <Link to='/' data-toggle="tooltip" data-placement="top" title="Go back to Home page">
        <Button variant="primary"> <ArrowLeft /></Button>
        </Link>
        </Container>
        <Footer/>
    </>
  
  )
}

export default Success