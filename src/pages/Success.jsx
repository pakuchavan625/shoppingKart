import React, { useContext } from 'react'
import { Button, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { ArrowLeft, } from 'react-bootstrap-icons';
import Footer from '../component/Footer';
import { CartContext } from '../CartContext';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import "../component/navbar.css"


pdfMake.vfs = pdfFonts.pdfMake.vfs;



const Success = () => {
  const cart = useContext(CartContext)
  const cartData = JSON.parse(localStorage.getItem('cartData')) || []; // Parse the cart data and provide a default empty array if it doesn't exist

  // Map your cart data to the expected format
  const cartDataForPDF = cartData.map(item => ({
    productName: `${item.id}`, // Replace with actual product names if available
    quantity: item.quantity,
    price: item.total // Replace with actual product prices if available
  }));
  
  const {translate} = useContext(CartContext)
  const docDefinition = {
     watermark: 'Invoice',
    content: [
      { text: 'Invoice', style: 'header' },
      
      {
        table: {
          headerRows: 1,
          widths: ['*', 'auto', 'auto', 'auto'], // Column widths
          body: [
            // Table header
            ['Product Name', 'Quantity', 'Unit Price', 'Total Price'],
            ...cartDataForPDF.map(item => [item.productName, item.quantity, `$${item.price.toFixed(2)}`, `$${(item.quantity * item.price).toFixed(2)}`]),
            // // Table rows (example data)
            // ['Product A', 2, '$25.00', '$50.00'],
            // ['Product B', 1, '$30.00', '$30.00'],
            // // Add more rows for additional products as needed
          ],
        },
        layout: 'lightHorizontalLines', // Optional: add horizontal lines
      },
    ],
    styles: {
      header: {
        fontSize: 24,
        bold: true,
        margin: [0, 0, 0, 10],
      },
    },
  }

  const downloadPDF = () => {
    const pdfDocGenerator = pdfMake.createPdf(docDefinition);
    pdfDocGenerator.download('invoice.pdf'); // Specify the filename
  };
  return (
    <>
    <div className="celebration-container">
    <Button onClick={downloadPDF}>Download Invoice</Button>
      <p>{translate("paymentSuccess")}</p>
      {/* <div className="confetti"></div> */}
      <span role="img" aria-label="Party Popper" className="emoji">
        🎉
      </span>
    </div>
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