import React, { useState, useEffect } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { productsArray } from "../product";
import ProductCard from "../component/ProductCard";
import Footer from "../component/Footer";
import { ArrowUp } from "react-bootstrap-icons";
import Pagination from 'react-bootstrap/Pagination';


const ProductStrore = () => {
  const [searchItem, setSearchItem] = useState("");
  const [showButton, setShowButton] = useState(false);
  const [sortOrder, setSortOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSearchInput = (e) => {
    const searchValues = e.target.value;
    setSearchItem(searchValues);
  };

  const filterProduct = productsArray.filter((product) => {
    return (
      product.title.toLocaleLowerCase().includes(searchItem) ||
      product.title.toLocaleUpperCase().includes(searchItem)
    );
  });

  const handleScroll = () => {
    if (window.scrollY > 500) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleClear = () => {
    setSearchItem("");
  };

  const sortedProducts = [...filterProduct].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.price - b.price;
    } else if (sortOrder === "desc") {
      return b.price - a.price;
    }
    return 0;
  });

  // pagination logic
  const itemsPerPage = 8; 
  const paginationData =  sortedProducts; 

  const totalPages = Math.ceil(paginationData.length / itemsPerPage);

  const handlePageChange = (page) => {
   setCurrentPage(page);
 };

 const startIndex = (currentPage - 1) * itemsPerPage;
 const endIndex = startIndex + itemsPerPage;
 const currentData = paginationData.slice(startIndex, endIndex);

  return (
    <>
      <header
        align="center"
        className="g-4 header-style"
        style={{
          fontSize: "20px",
          fontWeight: "800",
          color: "rgb(70, 70, 241)",
          marginTop: "160px !important",
        }}
      >
        Well come to the Ecommerce Product store
      </header>
      <Form>
        <Form.Group
          className="mt-3 mb-3"
          controlId="exampleForm.ControlInput1"
          align="center"
        >
          <Form.Control
            type="text"
            placeholder="serach for products"
            style={{ width: "100%", maxWidth: "300px" }} // Responsive width using inline style
            onChange={handleSearchInput}
            value={searchItem}
          />
        </Form.Group>
        {searchItem && (
          <div className="clearInput" onClick={handleClear}>
            x
          </div>
        )}
        <div className="mb-4">
        <Form.Check
          inline
          label="Price Low to High"
          type="radio"
          name="sorting"
          id="sortAsc"
          onChange={() => setSortOrder("asc")}
          checked={sortOrder === "asc"}
        />
        <Form.Check
          inline
          label="Price High to Low"
          type="radio"
          name="sorting"
          id="sortDesc"
          onChange={() => setSortOrder("desc")}
          checked={sortOrder === "desc"}
        />
        </div>
      </Form>
      <Row xs={1} md={3} className="g-4 mb-4">
        {currentData.length === 0 ? (
          <>
            <p style={{ color: "red" }}>
              serach {currentData.length} item found
            </p>
          </>
        ) : (
          currentData.map((item, index) => {
            return (
              <Col align="center" key={index}>
                <ProductCard productInfo={item} />
              </Col>
            );
          })
        )}
        {showButton && (
          <Button size="sm" className="scroll-button" onClick={scrollToTop}>
            <ArrowUp />
          </Button>
        )}
      </Row>
      {/* render pagination */}
      <Pagination style={{display:'flex', justifyContent:'ce'}}>
      <Pagination.First onClick={() => handlePageChange(1)} />
      <Pagination.Prev
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      />

      {Array.from({ length: totalPages }, (_, index) => (
        <Pagination.Item
          key={index}
          active={index + 1 === currentPage}
          onClick={() => handlePageChange(index + 1)}
        >
          {index + 1}
        </Pagination.Item>
      ))}

      <Pagination.Next
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
      <Pagination.Last onClick={() => handlePageChange(totalPages)} />
    </Pagination>
      <Footer />
    </>
  );
};

export default ProductStrore;
