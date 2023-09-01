import React from "react";
import { Card, Button, Form, Row , Col} from "react-bootstrap";
import { CartContext } from "../CartContext";
import { useContext } from "react";

const ProductCard = ({productInfo}) => {
    const cart = useContext(CartContext)
    const productQuantity = cart.getProductQuantity(productInfo.id)

    const handleAddToCart =()=>{
        cart.addOneToCart(productInfo.id)
    }
    
    const handleRemoveToCart = () =>{
        cart.removeOneFromCart(productInfo.id)
    }

    const handleDeleteFromCart =() =>{
        cart.deleteFromCart(productInfo.id)
    }

  return (
    <>
      <Card style={{ width: "18rem" }}>
        {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
        <Card.Body>
          <Card.Title>{productInfo.title}</Card.Title>
          <Card.Text>
            <span>&#8364;</span>
            {` ${productInfo.price}`}
          </Card.Text>
          {
            productQuantity > 0 ?
            <>
            <Form as={Row}>
                <Form.Label column="true" sm="6">In Cart: {productQuantity}</Form.Label>
                <Col sm="6">
                    <Button sm="6" onClick={handleAddToCart} className="mx-2">+</Button>
                    <Button sm="6" onClick={handleRemoveToCart} className="mx-2">-</Button>
                </Col>
            </Form>
            <Button variant="danger" size='sm' onClick={handleDeleteFromCart} className="my-2">Remove from cart</Button>
        </>
            :
            <Button variant="primary" onClick={handleAddToCart}>Add to Cart</Button>
          }
          
        </Card.Body>
      </Card>
    </>
  );
};

export default ProductCard;
