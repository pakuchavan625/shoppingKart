import React, { useState, useEffect } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { productsArray } from "../product";
import ProductCard from "../component/ProductCard";
import Footer from "../component/Footer";
import { ArrowUp } from "react-bootstrap-icons";

const ProductStrore = () => {
  const [searchItem, setSearchItem] = useState("");
  const [showButton, setShowButton] = useState(false);
  const [sortOrder, setSortOrder] = useState("");

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
        {sortedProducts.length === 0 ? (
          <>
            <p style={{ color: "red" }}>
              serach {sortedProducts.length} item found
            </p>
          </>
        ) : (
          sortedProducts.map((item, index) => {
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
      <Footer />
    </>
  );
};

export default ProductStrore;
