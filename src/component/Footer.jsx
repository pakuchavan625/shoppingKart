import React,{ useState }  from "react";
import { Container, Row, Col,Button, Form, FloatingLabel } from "react-bootstrap";
import { Facebook, Twitter, Youtube } from "react-bootstrap-icons";
import Contactus from "./Contactus";


const Footer = () => {

  if(window.location.pathname !== '/success'){
    return (
        <Container className="footer">
          <Row xs={1} md={3} className="g-4 mb-4">
            <Col lg={4} align="center">
              <div className="follow">
                <h6>Follow</h6>
                <div className="icons">
                  <Facebook />
                  <Twitter />
                  <Youtube />
                </div>
              </div>
              <div className="address">
              <h6>Address</h6>
              <p>82178 Franz mack strass 3a Munich Germany</p>
              </div>
              <div className="contacts">
                <h6>Contacts</h6>
                <p>Email: shopkart.gmail.com</p>
                <p>phone: +49 176524679</p>
                <p>Fax: +1 (0) 000 0000 002</p>
              </div>
            </Col>
            <Col lg={3} align="center" >
              <h6>Opening Hours</h6>
              <table>
                <tbody>
            <tr>
                <td>Monday</td>
                <td>9:00 AM - 6:00 PM</td>
            </tr>
            <tr>
                <td>Tuesday</td>
                <td>9:00 AM - 6:00 PM</td>
            </tr>
            <tr>
                <td>wednesday</td>
                <td>9:00 AM - 6:00 PM</td>
            </tr>
            <tr>
                <td>Thursday</td>
                <td>9:00 AM - 6:00 PM</td>
            </tr>
            <tr>
                <td>Friday</td>
                <td>9:00 AM - 6:00 PM</td>
            </tr>
            </tbody>
        </table>
            </Col>
            <Col  lg={5}>
            <div className="getIntuch">
         <h6 style={{textAlign:'center'}}>Get in touch</h6>
          <Contactus/>
        </div>
            </Col>
        
          </Row>
        </Container>
      );
  }
  
};

export default Footer;
