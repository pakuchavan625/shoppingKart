import React,{useContext} from 'react'
import { CartContext } from '../CartContext'
import { getProductData } from '../product'
import { Button } from 'react-bootstrap'


const CartProducts = ({cartProuctDetail}) => {
    const cart = useContext(CartContext)
    const id = cartProuctDetail.id
    const quantity = cartProuctDetail.quantity
    const  productData = getProductData(id)
  return (
   <>
   <h3>{productData.title}</h3>
   <p>{quantity} total</p>
   <p> <span>&#8364;</span>{quantity * productData.price}</p>
   <Button variant="primary" size="sm" onClick={()=> cart.deleteFromCart(cartProuctDetail.id)}>Remove</Button>
   <hr/>
   </>
  )
}

export default CartProducts