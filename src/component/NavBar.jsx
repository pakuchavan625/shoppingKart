import React, { useState, useContext } from "react";
import { Button, Navbar, Modal, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../CartContext";
import CartProducts from "./CartProducts";
import { Cart } from "react-bootstrap-icons";
import "../component/navbar.css";
import Crousal from "./Crousal";

const NavBar = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [logoutShow, setLogoutShow] = useState(false);

  const userName = JSON.parse(localStorage.getItem("userObj"));
  const extarctFirstName = userName.firstName;
  const firstLetter = extarctFirstName.split("")[0];
  const firstLetterCapital = firstLetter.toUpperCase();
  const extarctLastName = userName.lastName.split("")[0];
  const firstLetterLn = extarctLastName.split("")[0];
  const firstLetterCapitalLN = firstLetterLn.toUpperCase();

  const cart = useContext(CartContext);
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const productCount = cart.item.reduce(
    (sum, product) => sum + product.quantity,
    0
  );

  const handleOpenModal = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleOpenLogoutModal = () => {
    setLogoutShow(true);
  };

  const handleCloseLogoutModal = () => {
    setLogoutShow(false);
  };

  const checkout = async () => {
    try {
      const response = await fetch("http://localhost:3344/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items: cart.item }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();

      if (responseData.url) {
        window.location.assign(responseData.url); // Forwarding user to Stripe
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    cart.deleteFromCart();
    cart.logout();
    navigate("/login");
    setLogoutShow(false);
  };

  const languageOptions = {
    en: "En",
    de: "De",
  };

  const alternativeLanguage = cart.language === "en" ? "de" : "en";

  return (
    <>
      <Navbar
        expand="sm"
        className="mb-4 p-4 fixed-top"
        style={{ backgroundColor: "#495057", zIndex: 10 }}
      >
        <Container>
          <Navbar.Brand style={{ color: "white" }}>
            <Link to='/home'>
            <div className="logo"></div>
            </Link>
          
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end navbar-collaps">
            <Button className="mx-2" onClick={handleOpenModal}>
              {productCount}
              <Cart />
            </Button>
            {isLoggedIn ? (
              <>
                <div class="user-container">
                  <span className="username">{`${firstLetterCapital}${firstLetterCapitalLN}`}</span>
                  <div className="logout-box">
                    <Button size="sm" onClick={handleOpenLogoutModal}>
                      Logout
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              ""
            )}
            <div className="mx-2">
              <button
                onClick={() => cart.changeLanguage(alternativeLanguage)}
                className="language-button"
              >
                {languageOptions[cart.language]}
                <span className="alternative-language">
                  {languageOptions[alternativeLanguage]}
                </span>
              </button>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* well come text */}

      {/* MODAL OPENS */}
      {isLoggedIn ? (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Shopping cart details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {productCount > 0 ? (
              <>
                <p> Items in the cart :</p>
                {cart.item.map((currentItem, index) => {
                  return (
                    <CartProducts cartProuctDetail={currentItem} key={index} />
                  );
                })}
                <h1>Total : &#8364;{cart.getTotalCost()}</h1>
              </>
            ) : (
              <h4>
                There is no item in cart. Add item to cart and enjoy your
                shopping{" "}
              </h4>
            )}
          </Modal.Body>
          <Modal.Footer>
            {productCount > 0 ? (
              <>
                <Button variant="secondary" onClick={handleClose}>
                  cancel
                </Button>
                <Button variant="success" onClick={checkout}>
                  Purchase
                </Button>
              </>
            ) : (
              <Button variant="secondary" onClick={handleClose}>
                cancel
              </Button>
            )}
          </Modal.Footer>
        </Modal>
      ) : (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Shopping cart details</Modal.Title>
          </Modal.Header>
          <Modal.Body>please login and continue for shopping</Modal.Body>
        </Modal>
      )}

      {/* {logoutModal} */}
      <Modal show={logoutShow} onHide={handleCloseLogoutModal}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>Are you sure you want to logout</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseLogoutModal}>
            No
          </Button>
          <Button variant="danger" onClick={handleLogout}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default NavBar;
