import axios from 'axios'
import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Carousel from './Carousel'
import Addfooter from './footer'
import { CartContext } from '../CartContext'

const Getproduct = () => {

  const navigate = useNavigate()
  const { addToCart } = useContext(CartContext)

  const [selectedCategory, setSelectedCategory] = useState("all")
  const [loading, setLoading] = useState("")
  const [products, setProducts] = useState([])
  const [error, setError] = useState("")
  const [visibleCount, setVisibleCount] = useState(8)
  const [searchTerm, setSearchTerm] = useState("")

  const imagepath =
    "http://murayambuni.alwaysdata.net/static/images/"

  // FETCH PRODUCTS
  const getproducts = async () => {

    setLoading("Loading amazing games...")

    try {

      const response = await axios.get(
        "http://murayambuni.alwaysdata.net/api/getproducts"
      )

      setProducts(response.data)
      setLoading("")

    } catch (error) {

      setError("Failed to load products")
      setLoading("")
    }
  }

  useEffect(() => {
    getproducts()
  }, [])

  useEffect(() => {
    setVisibleCount(8)
  }, [selectedCategory])

  // FILTER PRODUCTS
  const filteredProducts =

    (selectedCategory === "all"
      ? products
      : products.filter(
          p => p.category === selectedCategory
        )
    ).filter(p =>
      p.product_name
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )

  const visibleProducts =
    filteredProducts.slice(0, visibleCount)

  return (

    <div className="container-fluid px-lg-5 px-3 py-5">

      {/* TOP CAROUSEL */}
      <div className="mb-5">
        <Carousel />
      </div>

      {/* SECTION HEADER */}
      <div className="mb-5">

        <h2
          style={{
            color: "#39FF14",
            fontFamily: "'Orbitron', sans-serif",
            fontWeight: "700"
          }}
        >
          Featured Games & Gear
        </h2>

        <p style={{ color: "#9ca3af" }}>
          Explore the latest games, consoles, and gaming accessories.
        </p>

      </div>

      {/* LOADING + ERROR */}
      <h5 className="text-warning mb-3">
        {loading}
      </h5>

      <h5 className="text-danger mb-3">
        {error}
      </h5>

      {/* FILTER SECTION */}
      <div
        className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-5"
      >

        {/* CATEGORY BUTTONS */}
        <div className="d-flex flex-wrap gap-2">

          <button
            onClick={() => setSelectedCategory("all")}
            className={`btn ${
              selectedCategory === "all"
                ? "btn-success"
                : "btn-outline-light"
            }`}
          >
            All
          </button>

          <button
            onClick={() => setSelectedCategory("games")}
            className={`btn ${
              selectedCategory === "games"
                ? "btn-success"
                : "btn-outline-light"
            }`}
          >
            🎮 Games
          </button>

          <button
            onClick={() => setSelectedCategory("consoles")}
            className={`btn ${
              selectedCategory === "consoles"
                ? "btn-success"
                : "btn-outline-light"
            }`}
          >
            🕹 Consoles
          </button>

          <button
            onClick={() => setSelectedCategory("pc")}
            className={`btn ${
              selectedCategory === "pc"
                ? "btn-success"
                : "btn-outline-light"
            }`}
          >
            💻 PC Gaming
          </button>

        </div>

        {/* SEARCH */}
        <div
          style={{
            width: "280px"
          }}
        >

          <input
            type="text"
            placeholder="Search games..."
            className="form-control"
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
          />

        </div>

      </div>

      {/* PRODUCTS GRID */}
      <div className="row g-4">

        {visibleProducts.map((singleproduct, index) => (

          <div
            className="col-xl-3 col-lg-4 col-md-6"
            key={index}
          >

            <div className="card h-100">

              {/* PRODUCT IMAGE */}
              <div
                style={{
                  background:
                    "linear-gradient(180deg, rgba(0,247,255,0.08), transparent)"
                }}
              >

                <img
                  src={
                    imagepath +
                    singleproduct.product_photo
                  }
                  alt={singleproduct.product_name}
                  className="card-img-top"
                />

              </div>

              {/* CARD BODY */}
              <div className="card-body d-flex flex-column">

                {/* CATEGORY */}
                <span
                  className="mb-2"
                  style={{
                    color: "#00f7ff",
                    fontSize: "13px",
                    fontWeight: "600",
                    textTransform: "uppercase"
                  }}
                >
                  {singleproduct.category}
                </span>

                {/* PRODUCT TITLE */}
                <h5 className="product-title mb-3">
                  {singleproduct.product_name}
                </h5>

                {/* DESCRIPTION */}
                <p
                  style={{
                    color: "#9ca3af",
                    flexGrow: 1
                  }}
                >
                  {
                    singleproduct.product_description
                  }
                </p>

                {/* PRICE */}
                <h4
                  style={{
                    color: "#39FF14",
                    fontWeight: "700"
                  }}
                >
                  Ksh {singleproduct.product_cost}
                </h4>

                {/* BUTTONS */}
                <div className="d-grid gap-2 mt-3">

                  {/* ADD TO CART */}
                  <button
                    className="btn btn-success"
                    onClick={() =>
                      addToCart(singleproduct)
                    }
                  >
                    Add To Cart 🛒
                  </button>

                  {/* PURCHASE */}
                  <button
                    className="btn btn-outline-light"
                    onClick={() =>
                      navigate("/makepayment", {
                        state: { singleproduct }
                      })
                    }
                  >
                    Buy Now
                  </button>

                </div>

              </div>

            </div>

          </div>

        ))}

      </div>

      {/* LOAD MORE */}
      {visibleCount < filteredProducts.length && (

        <div className="text-center mt-5">

          <button
            className="btn btn-success px-5 py-3"
            onClick={() =>
              setVisibleCount(prev => prev + 4)
            }
          >
            Load More Games
          </button>

        </div>

      )}

      {/* EMPTY */}
      {filteredProducts.length === 0 && (

        <div className="text-center py-5">

          <h3 style={{ color: "#9ca3af" }}>
            No products found
          </h3>

        </div>

      )}

      {/* FOOTER */}
      <div className="mt-5">
        <Addfooter />
      </div>

    </div>
  )
}

export default Getproduct