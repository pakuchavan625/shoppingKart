import React, { useContext }  from "react";
import { Row, Col } from "react-bootstrap";
import { Facebook, Twitter, Youtube } from "react-bootstrap-icons";
import Contactus from "./Contactus";
import { CartContext } from "../CartContext";



const Footer = () => {
  const cart = useContext(CartContext)

  if(window.location.pathname !== '/success'){
    return (
        <div className="footer">
          <Row xs={1} md={3} className="g-4 mb-4">
            <Col lg={4} align="center">
              <div className="follow">
                <header className="footer-header">{cart.translate("follow")}</header>
                <div className="icons">
                  <Facebook />
                  <Twitter />
                  <Youtube />
                </div>
              </div>
              <div className="address">
              <header className="footer-header">{cart.translate("address")}</header>
              <p>82178 Franz mack strass 3a Munich Germany</p>
              </div>
              <div className="contacts">
                <h6>Contacts</h6>
                <p>Email: shopkart@gmail.com</p>
                <p>phone: +49 176524679</p>
                <p>Fax: +1 (0) 000 0000 002</p>
              </div>
            </Col>
            <Col lg={3} align="center" >
              <header className="footer-header">{cart.translate("openingHours")}</header>
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
         <header className="footer-header">{cart.translate("getInTouch")}</header>
          <Contactus/>
        </div>
            </Col>
        
          </Row>
        </div>
      );
  }
  
};

export default Footer;
