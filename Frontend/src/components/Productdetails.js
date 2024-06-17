import React, { useEffect, useState, useRef } from "react";
import { useParams, useLocation, Link, useNavigate } from "react-router-dom";
import MyNavbar from "./navbar";
import Footer from "./footer";
import axios from "axios";
import { useCart } from "./CartContext";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
// import { escape } from "../../../Backend/db";

const responsive = {
  extraLargeDesktop: {
    breakpoint: { min: 1601, max: 2000 },
    items: 3,
  },
  superLargeDesktop: {
    breakpoint: { max: 1600, min: 1201 },
    items: 3,
  },
  desktop: {
    breakpoint: { max: 1200, min: 992 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 991, min: 768 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 767, min: 0 },
    items: 2,
  },
};

export default function Productdetails() {
  const [add, setAdd] = useState("34.00");
  const [success, setSuccess] = useState(false);

  const { id } = useParams();
  const location = useLocation();
  const { productdetails, admin } = location.state || {};
  productdetails.userid = sessionStorage.getItem("user-token");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  if (productdetails) {
    productdetails.userid = sessionStorage.getItem("user-token");
  }

  useEffect(() => {
    if (sessionStorage.getItem("token") !== "admin") {
      sessionStorage.getItem("user-token") !== null && setIsLoggedIn(true);
    }
  }, []);

  const AmountChange = (e) => {
    setAdd(e);
  };
  const handleChange = (e) => {
    setAdd(e.target.value); // Update input value on manual input change
  };

  // eslint-disable-next-line no-unused-vars
  // const [values, setValues] = useState({
  //   accepted_by_admin: "true",
  //   id: id,
  // });

  const handleProductlist = () => {
    axios
      .post(
        `${process.env.REACT_APP_HOST}${process.env.REACT_APP_PORT}/adminaccepted`,
        { accepted_by_admin: "true", id }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    alert("Product added to the store successfully");
    window.location.href = "/Resale-bazaar/acceptproduct";
  };

  const { addToCart, addToWishlist, cartItems, wishItems } = useCart();

  // const handleAddToCart = () => {
  //   if (cartItems.length > 0) {
  //     var unique_item = true;
  //     cartItems.map((item) => {
  //       if (item.id === productdetails.id) {
  //         alert("Product already exists in the cart");
  //         unique_item = false;
  //         //eslint-disable-next-line array-callback-return
  //         return;
  //       }
  //       return null;
  //     });
  //     unique_item && addToCart(productdetails,"main");
  //   } else {
  //     addToCart(productdetails,"main");
  //   }
  // };

  const handleAddToCart = () => {
    const isProductInCart = cartItems.some(
      (item) => item.id === productdetails.id
    );
    if (isProductInCart) {
      alert("Product already exists in the cart");
    } else if (isLoggedIn) {
      addToCart(productdetails, "main");
    } else {
      navigate("/login");
    }
  };

  const handleAddToWishlist = () => {
    const isProductInWishlist = wishItems.some(
      (item) => item.id === productdetails.id
    );
    if (isProductInWishlist) {
      alert("Product already exists in the wishlist");
      return; // Exit the function early
    } else if (isLoggedIn) {
      addToWishlist(productdetails);
    } else {
      navigate("/login");
    }
  };

  const productDetailsImgRef = useRef();

  const activeSubimageRef = useRef();
  const carouselRef = useRef();
  // eslint-disable-next-line no-unused-vars
  const [currentSlide, setCurrentSlide] = useState(0);

  const updateProductDetailsImg = (newSrc, index) => {
    productDetailsImgRef.current.src = `${process.env.REACT_APP_HOST}${process.env.REACT_APP_PORT}/images/${newSrc}`;

    if (activeSubimageRef.current) {
      activeSubimageRef.current.style.border = "1px solid grey";
    }

    const newActiveSubimage = document.getElementById(`subimage-${index}`);
    if (newActiveSubimage) {
      newActiveSubimage.style.border = "3px solid green";

      activeSubimageRef.current = newActiveSubimage;
    }
    setCurrentSlide(index);
  };

  const handleProductReject = () => {
    const rejectReason = prompt("Enter Product Reject Reason");
    if (rejectReason !== null && rejectReason !== "") {
      console.log("Reason for rejection:", rejectReason);
      axios
        .post(
          `${process.env.REACT_APP_HOST}${process.env.REACT_APP_PORT}/adminrejection`,
          { rejectReason, id }
        )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      window.location.href = "/Resale-bazaar/acceptproduct";
    } else {
      console.log("User canceled the prompt.");
    }
  };
  const datta = JSON.parse(productdetails.image);
  const firstImage = datta[0];

  return (
    <div className="fullscreen">
      <MyNavbar />
      <main>
        <nav className="p-2 ps-lg-5 pe-lg-5">
          <Link to="/" className="text-decoration-none text-dark">
            <i className="bi bi-house-fill"></i>
          </Link>
          &nbsp; /{" "}
          <Link
            to={"/" + productdetails.product_type}
            className="text-decoration-none text-dark"
          >
            {productdetails.product_type}
          </Link>
          /{" "}
          <Link
            to={"/" + productdetails.category}
            className="text-decoration-none text-dark"
          >
            {productdetails.category}
          </Link>{" "}
          / {productdetails.name}
        </nav>
        <div className="p-2 ps-lg-5 pe-lg-5 d-lg-flex">
          <div className="p-2 ps-lg-4 pe-lg-4 d-flex flex-column justify-content-between col-lg-5">
            <div className="ms-auto me-auto text-center productdetailsimgdiv">
              <img
                src={`${process.env.REACT_APP_HOST}${process.env.REACT_APP_PORT}/images/${firstImage}`}
                ref={productDetailsImgRef}
                alt="product"
                className="productdetailsimg"
              />
            </div>
            <div className="ms-auto me-auto">
              <Carousel
                responsive={responsive}
                className=" mt-2 productdetailscarousel"
                ref={carouselRef}
                beforeChange={(nextSlide) => setCurrentSlide(nextSlide)}
              >
                {datta.map((product, index) => (
                  <div
                    className="card m-3"
                    key={index}
                    id={`subimage-${index}`}
                    onClick={() => updateProductDetailsImg(product, index)}
                    style={{ border: "1px solid grey" }}
                  >
                    <img
                      src={`${process.env.REACT_APP_HOST}${process.env.REACT_APP_PORT}/images/${product}`}
                      alt="images"
                      style={{
                        cursor: "pointer",
                        maxWidth: "100%",
                        height: "110px",
                        objectFit: "contain",
                        alignSelf: "center",
                        padding: "3px",
                      }}
                    />
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
          <div className="ps-md-3 p-2 col-lg-7 detailsdiv">
            <h1 className="text-secondary fs-2">{productdetails.name}</h1>
            <p>{productdetails.description}</p>
            <br />
            <div className="d-flex col-md-9">
              <p className=" col-md-4 col-lg-5">
                <b>Location</b>
              </p>
              <p className=" col-md-8 col-lg-10">: {productdetails.location}</p>
            </div>
            {productdetails.language !== null &&
              productdetails.language !== "" && (
                <div className="d-flex col-md-9">
                  <p className=" col-md-4 col-lg-5">
                    <b>Language</b>
                  </p>
                  <p className=" col-md-8 col-lg-10">
                    : {productdetails.language}
                  </p>
                </div>
              )}
            <div className="d-flex col-md-9">
              <p className=" col-md-4 col-lg-5">
                <b>Color</b>
              </p>
              <p className=" col-md-8 col-lg-10">: {productdetails.color}</p>
            </div>
            <div className="d-flex col-md-9">
              <p className=" col-md-4 col-lg-5">
                <b>Can it be altered</b>
              </p>
              <p className=" col-md-8 col-lg-7">
                : {productdetails.alteration}
              </p>
            </div>
            <div className="d-flex col-md-9">
              <p className=" col-md-4 col-lg-5">
                <b>Size</b>
              </p>
              <p className=" col-md-8 col-lg-10">: {productdetails.size}</p>
            </div>
            <div className="d-flex col-md-9">
              <p className=" col-md-4 col-lg-5">
                <b>Measurements</b>
              </p>
              <p className=" col-md-8 col-lg-10">
                : {productdetails.measurements}
              </p>
            </div>

            {productdetails.material !== null && (
              <div className="d-flex col-md-9">
                <p className=" col-md-4 col-lg-5">
                  <b>Material</b>
                </p>
                <p className=" col-md-8 col-lg-10">
                  : {productdetails.material}
                </p>
              </div>
            )}
            {productdetails.occasion !== null && (
              <div className="d-flex col-md-9">
                <p className=" col-md-4 col-lg-5">
                  <b>Occasion</b>
                </p>
                <p className=" col-md-8 col-lg-10">
                  : {productdetails.occasion}
                </p>
              </div>
            )}
            {productdetails.type !== null && (
              <div className="d-flex col-md-9">
                <p className=" col-md-4 col-lg-5">
                  <b>type</b>
                </p>
                <p className=" col-md-8 col-lg-10">: {productdetails.type}</p>
              </div>
            )}
            {productdetails.brand !== null && (
              <div className="d-flex col-md-9">
                <p className=" col-md-4 col-lg-5">
                  <b>Brand</b>
                </p>
                <p className=" col-md-8 col-lg-10">: {productdetails.brand}</p>
              </div>
            )}
            {productdetails.product_condition !== null && (
              <div className="d-flex col-md-9">
                <p className=" col-md-4 col-lg-5">
                  <b>Product_Condition</b>
                </p>
                <p className=" col-md-8 col-lg-10">
                  : {productdetails.product_condition}
                </p>
              </div>
            )}
            {productdetails.style !== null && (
              <div className="d-flex col-md-9">
                <p className=" col-md-4 col-lg-5">
                  <b>Style</b>
                </p>
                <p className=" col-md-8 col-lg-10">: {productdetails.style}</p>
              </div>
            )}
            {productdetails.season !== null && (
              <div className="d-flex col-md-9">
                <p className=" col-md-4 col-lg-5">
                  <b>Season</b>
                </p>
                <p className=" col-md-8 col-lg-10">: {productdetails.season}</p>
              </div>
            )}
            {productdetails.fit !== null && (
              <div className="d-flex col-md-9">
                <p className=" col-md-4 col-lg-5">
                  <b>Fit</b>
                </p>
                <p className=" col-md-8 col-lg-10">: {productdetails.fit}</p>
              </div>
            )}
            {productdetails.length !== null && (
              <div className="d-flex col-md-9">
                <p className=" col-md-4 col-lg-5">
                  <b>Length</b>
                </p>
                <p className=" col-md-8 col-lg-10">: {productdetails.length}</p>
              </div>
            )}
            <div className="d-flex col-md-9">
              <p className=" col-md-4 col-lg-5">
                <b>Times Worn</b>
              </p>
              <p className=" col-md-8  col-lg-10">: {productdetails.worn}</p>
            </div>
            <div className="d-flex col-md-9">
              <p className=" col-md-4 col-lg-5">
                <b>Product ID</b>
              </p>
              <p className=" col-md-8 col-lg-10">: {id}</p>
            </div>

            <p className="text-success fs-4">
              <b>&#8377;{productdetails.price}.00</b>
            </p>
            {productdetails.quantity > 0 ? (
              admin !== "admin" ? (
                <div className="">
                  <div className="d-flex">
                    <> QTY </>: &nbsp;
                    <select className="form-select" style={{ width: "90px" }}>
                      <option value={1}>1</option>
                    </select>
                  </div>
                  {/* <div className="p-lg-2">
                   <button
                      type="submit"
                      className="btn btn-secondary ms-3 ps-lg-5 pe-lg-5"
                      onClick={handleAddToCart}
                    >
                    <b>  ADD TO CART</b>
                    </button>
                   </div>
                  <button
                    type="button"
                    className="btn btn-outline-secondary mt-3 mb-3 ps-lg-5 pe-lg-5 "
                    onClick={handleAddToWishlist}
                  >
                    <i className="bi bi-heart-fill" /> ADD TO WISHLIST
                  </button> */}
                  <div className="container">
                    <div className="row ">
                      <div className="col-12 col-md-7 mb-2 mt-2 ">
                        <button
                          type="submit"
                          className="btn btn-secondary w-100"
                          onClick={handleAddToCart}
                        >
                          <b>ADD TO CART</b>
                        </button>
                      </div>
                      <div className="col-12 col-md-7 mb-2">
                        <button
                          type="button"
                          className="btn btn-outline-secondary w-100"
                          onClick={handleAddToWishlist}
                        >
                          {/* <i className="bi bi-heart-fill" />  */}
                          <b> ADD TO WISHLIST</b>
                        </button>
                      </div>
                      {/* <div className="col-12 col-md-7 mb-2">
                        <button
                          type="button"
                          className="btn btn-outline-secondary w-100"
                          // onClick={handleAddToWishlist}
                        >
                      <b> MAKE OFFER</b>
                        </button>
                      </div> */}

                      {/*Button trigger modal*/}

                      <div className="col-12 col-md-7 mb-2">
                        {success ? (
                          <div className="text-center">
                            <i
                              className="bi bi-check-lg fs-3"
                              style={{ width: "2em" }}
                            ></i>
                            <button type="button" className="btn mb-2  w-10">
                              <b>MAKE OFFER</b>
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            className="btn mb-2 btn-outline-secondary w-100"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                          >
                            <b>MAKE OFFER</b>{" "}
                          </button>
                        )}

                        <div
                          className="modal fade"
                          id="exampleModal"
                          tabIndex="-1"
                          aria-labelledby="exampleModalLabel"
                          aria-hidden="true"
                        >
                          <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                              <div className="modal-header">
                                <p className="modal-title fs-5 text-center col-11">
                                  <b> Make an offer</b>
                                </p>
                                <div className="col-1">
                                  <button
                                    type="button"
                                    className="btn-close d-lg-hidden col-1 justify-center"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                  ></button>
                                </div>
                              </div>
                              {/*modal box */}
                              <div
                                className="modal-body"
                                style={{ display: success ? "none" : "" }}
                              >
                                {/* <img
                                  src=""
                                  alt="Small Image"
                                  className="img-fluid mb-3 mx-auto d-block"
                                /> */}

                                {/* <input
                                  type="text"
                                  className="form-control mb-3"
                                  placeholder="Enter your offer"
                                /> */}
                                <img
                                  src={`${process.env.REACT_APP_HOST}${process.env.REACT_APP_PORT}/images/${firstImage}`}
                                  alt="Small"
                                  className="img-fluid mb-3 mx-auto d-block"
                                  style={{
                                    maxWidth: "100%",
                                    maxHeight: "150px",
                                  }} // Adjust the maxHeight as needed
                                />
                                <span style={{ fontSize: "0.75rem" }}>
                                  Enter Your Offer
                                </span>
                                <div class="border p-2 position-relative mb-3">
                                  <div className="row g-0 align-items-center">
                                    <div className="col-auto">
                                      <b className="p-2 fs-5">&#8377;</b>
                                    </div>
                                    <div className="col">
                                      <input
                                        type="text"
                                        placeholder="40.00"
                                        value={add}
                                        onChange={handleChange}
                                        style={{
                                          outline: "none",
                                          border: "none",
                                        }}
                                      />
                                    </div>
                                    <div className="col-auto">
                                      <i style={{ fontSize: "0.75rem" }}>
                                      &#8377; 6.29 shipping
                                      </i>
                                    </div>
                                  </div>
                                </div>

                                <div className="row">
                                  <div
                                    onClick={() => AmountChange("32.00")}
                                    className="col-4 mb-2 position-relative "
                                    onChange={AmountChange}
                                  >
                                    <span
                                      className="position-absolute start-50 translate-middle-x text-center small"
                                      style={{
                                        fontSize: "0.75rem",
                                        padding: "3px",
                                      }}
                                    >
                                      20% Off
                                    </span>
                                    <button
                                      type="button"
                                      value="34.00"
                                      className="btn border-secondary p-3 w-100"
                                      style={{
                                        paddingTop: "2rem",
                                        backgroundColor:
                                          add === "32.00"
                                            ? "rgba(38, 109, 28, 0.19)"
                                            : null,
                                      }}
                                    >
                                      <b style={{ fontSize: ".95rem" }}>
                                      &#8377; 32.00
                                      </b>
                                    </button>
                                  </div>

                                  <div
                                    className="col-4 mb-2 position-relative"
                                    onClick={() => AmountChange("34.00")}
                                  >
                                    <span
                                      className="position-absolute top-0 start-50 translate-middle-x text-center small"
                                      style={{
                                        fontSize: "0.75rem",
                                        padding: "3px",
                                      }}
                                    >
                                      10% Off
                                    </span>
                                    <button
                                      type="button"
                                      className="btn border-secondary p-3 w-100"
                                      style={{
                                        paddingTop: "2rem",
                                        backgroundColor:
                                          add === "34.00"
                                            ? "rgba(38, 109, 28, 0.19)"
                                            : null,
                                      }}
                                    >
                                      <b style={{ fontSize: ".95rem" }}>
                                      &#8377; 34.00
                                      </b>
                                    </button>
                                  </div>
                                  <div
                                    className="col-4 mb-2 position-relative"
                                    onClick={() => AmountChange("36.00")}
                                  >
                                    <span
                                      className="position-absolute top-0 start-50 translate-middle-x text-center small"
                                      style={{
                                        fontSize: "0.75rem",
                                        padding: "3px",
                                      }}
                                    >
                                      10% Off
                                    </span>
                                    <button
                                      type="button"
                                      className="btn border-secondary p-3 w-100"
                                      style={{
                                        paddingTop: "2rem",
                                        backgroundColor:
                                          add === "36.00"
                                            ? "rgba(38, 109, 28, 0.19)"
                                            : null,
                                      }}
                                    >
                                      <b style={{ fontSize: ".95rem" }}>
                                      &#8377; 36.00
                                      </b>
                                    </button>
                                  </div>
                                </div>
                              </div>
                              {/*success */}
                              <div
                                className="text-center"
                                style={{ display: success ? "" : "none" }}
                              >
                                <i class="bi bi-check2-circle text-success fs-1"></i>
                              </div>
                              <div className="modal-footer">
                                <button
                                  onClick={() => {
                                    setSuccess(true);
                                  }}
                                  style={{ display: success ? "none" : "" }}
                                  type="button"
                                  className="btn btn-secondary w-100"
                                >
                                  Send Offer
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={handleProductlist}
                    className="btn  btn-outline-secondary mt-3 mb-3"
                  >
                    ADD TO PRODUCT LIST
                  </button>
                  &nbsp;
                  <button
                    type="button"
                    className="btn  btn-danger mt-3 mb-3"
                    onClick={handleProductReject}
                  >
                    Reject
                  </button>
                </>
              )
            ) : (
              <>
                <h5 className="text-danger" style={{ fontWeight: "800" }}>
                  Out of Stock
                </h5>
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
