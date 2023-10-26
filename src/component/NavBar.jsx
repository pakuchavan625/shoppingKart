import React, { useState, useContext } from "react";
import { Button, Navbar, Modal, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../CartContext";
import CartProducts from "./CartProducts";
import { Cart } from "react-bootstrap-icons";
import "../component/navbar.css";


const NavBar = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [shownLoginPopUp, setShowLoginPopUp] = useState(false);
  const [logoutShow, setLogoutShow] = useState(false);
  

  const userName = JSON.parse(localStorage.getItem("userObj"));
  let firstLetterCapital = "";
  let firstLetterCapitalLN = "";
  
  if (userName) {
    const extarctFirstName = userName.firstName;
    const firstLetter = extarctFirstName.split("")[0];
    firstLetterCapital = firstLetter.toUpperCase();
  
    const extarctLastName = userName.lastName.split("")[0];
    const firstLetterLn = extarctLastName.split("")[0];
    firstLetterCapitalLN = firstLetterLn.toUpperCase();
  }

  const cart = useContext(CartContext);
 const updateCart = cart.item.map((item)=>{
  return {
    ...item,
    total : cart.getTotalCost()
  }
 })

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

  const handleLoginPopUpModalOpen = () => {
    setShowLoginPopUp(true);
  };

  const handleLoginPopUpModalClose = () => {
    setShowLoginPopUp(false);
  };
  const checkout = async () => {
    
    if (isLoggedIn) {
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
       
        // Store cart data in local storage or context before navigating
         localStorage.setItem("cartData", JSON.stringify(updateCart));
          window.location.assign(responseData.url); // Forwarding user to Stripe
        }
      } catch (error) {
        console.error("Error during checkout:", error);
      }
    } else {
      // alert("user not logged in firts loggin and the continue")
      handleClose();
      handleLoginPopUpModalOpen();
    }
  };

  const handleLogin = () => {
    navigate("/login");
    handleLoginPopUpModalClose();
  };

  const handleRegister =()=>{
    navigate("/register");
    handleLoginPopUpModalClose();
  }
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    cart.deleteFromCart();
    cart.logout();
    // navigate("/login");
    setLogoutShow(false);
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
            <Link to="/">
              <div className="logo"></div>
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end navbar-collaps">
            <div className="cart">
              <button
                className="add-to-cart-button mx-2"
                onClick={handleOpenModal}
              >
                <Cart />
              </button>
              <div class="cart-badge" id="cart-badge">
                {productCount}
              </div>
            </div>
            {isLoggedIn ? (
              <>
                <div class="user-container">
                  <span className="username">{`${firstLetterCapital}${firstLetterCapitalLN}`}</span>
                  {/* <span className="username">{'PN'}</span> */}
                  <div className="logout-box">
                    <Button size="sm" onClick={handleOpenLogoutModal}>
                      Logout
                    </Button>
                  </div>
                </div>
              </>
            ) : !isLoggedIn ? (
              <Button size="sm" onClick={handleLogin} className="singIn">
                <span className="bi bi-person"></span>
                <span>{cart.translate("loginButton")}</span>
              </Button>
            ) : (
              ""
            )}
            <div className="mx-2">
              <select
                className="translater-selection"
                onChange={() => cart.changeLanguage(alternativeLanguage)}
              >
                <option value="en">En</option>
                <option value="de">De</option>
              </select>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* well come text */}

      {/* MODAL OPENS */}
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
            <p>
              There are no item in cart. Add item to cart and enjoy your
              shopping
            </p>
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

      <Modal show={shownLoginPopUp} onHide={handleLoginPopUpModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Shopping cart details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          User is not Logged in if you have an acoount please login and if new
          customer please Register
          <div>
            <Button size="sm" onClick={handleLogin} className="singIn">
              <span>{cart.translate("loginButton")}</span>
            </Button>/
            <Button size="sm" onClick={handleRegister} className="singIn">
              <span>{cart.translate("register")}</span>
            </Button>
          </div>
        </Modal.Body>
      </Modal>

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
