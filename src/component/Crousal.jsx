import React, { useContext } from 'react'
import { Container } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import { useLocation } from 'react-router-dom';
import { CartContext } from '../CartContext';




const Crousal = () => {
  const cart = useContext(CartContext)
    const location = useLocation();
    // Define an array of allowed routes
    const allowedRoutes = ['/home'];
if (allowedRoutes.includes(location.pathname)){
  return (
    <>
    <Container style={{zIndex:1, marginTop:'160px'}}>
    <p style={{marginTop:'10px'}}> {cart.translate('wellComeMessage')}</p>
    <Carousel data-bs-theme="dark"  >

      <Carousel.Item>
        <img
          className="d-block w-100"
          src='https://res-3.cloudinary.com/grover/image/upload/v1668184020/qvnkafbfg5pjl5ayhcm2.png'
          alt="First slide"
          width="1200"  
          height="100" 
          style={{objectFit:'cover'}}
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src='https://cdn.sitzdesign.de/media/58/73/8d/1660725741/Ecksofa.jpg'
          alt="Second slide"
          width="1200"  
          height="100" 
          style={{objectFit:'cover'}}
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://live-production.wcms.abc-cdn.net.au/a06f2a469324e0f1239a420d1bdad9ae?impolicy=wcms_crop_resize&cropH=2813&cropW=5000&xPos=0&yPos=262&width=862&height=485"
          alt="Third slide"
          width="1200"  
          height="100" 
          style={{objectFit:'cover'}}
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src='https://time.com/shopping/static/4b898ae4f25a884b0c221e22b2da507c/57e17/best-sunglasses-for-women.jpg'
          alt="Fourth slide"
          width="1200"  
          height="100" 
          style={{objectFit:'cover'}}
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://www.cycle.eco/_vercel/image?url=/hero_home.webp&w=640&q=100"
          alt="Fift slide"
          width="1200"  
          height="100" 
          style={{objectFit:'cover'}}
        />
      </Carousel.Item>
    </Carousel>
    </Container>
    </>
  )
    }
}

export default Crousal