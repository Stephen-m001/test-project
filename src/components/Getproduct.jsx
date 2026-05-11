import axios from 'axios'
import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Carousel from './Carousel'
import Addfooter from './footer'
import { CartContext } from '../CartContext'

const Getproduct = () => {
  const navigate = useNavigate()
  const { addToCart } = useContext(CartContext) // 🛒 CART

  const [selectedCategory, setSelectedCategory] = useState("all")
  const [loading, setLoading] = useState("")
  const [products, setProducts] = useState([])
  const [error, setError] = useState("")
  const [visibleCount, setVisibleCount] = useState(8)
  const [searchTerm, setSearchTerm] = useState("")
  const [showSearch, setShowSearch] = useState(false)

  const imagepath = "http://murayambuni.alwaysdata.net/static/images/"

  // fetch products
  const getproducts = async () => {
    setLoading("Please Wait...")
    try {
      const response = await axios.get(
        "http://murayambuni.alwaysdata.net/api/getproducts"
      )
      setProducts(response.data)
      setLoading("")
    } catch (error) {
      setError("Something went wrong")
      setLoading("")
    }
  }

  useEffect(() => {
    getproducts()
  }, [])

  useEffect(() => {
    setVisibleCount(8)
  }, [selectedCategory])

  const filteredProducts =
    (selectedCategory === "all"
      ? products
      : products.filter(p => p.category === selectedCategory)
    ).filter(p =>
      p.product_name.toLowerCase().includes(searchTerm.toLowerCase())
    )

  const visibleProducts = filteredProducts.slice(0, visibleCount)

  return (
    <div className="px-6 py-10">

      <Carousel />

      <h2 className="text-warning">{loading}</h2>
      <h2 className="text-danger">{error}</h2>

      {/* categories + search */}
      <div className="mb-3 d-flex justify-content-between flex-wrap">

        <div>
          <button onClick={() => setSelectedCategory("all")} className="btn btn-secondary me-2">All</button>
          <button onClick={() => setSelectedCategory("games")} className="btn btn-secondary me-2">Games</button>
          <button onClick={() => setSelectedCategory("consoles")} className="btn btn-secondary me-2">Consoles</button>
          <button onClick={() => setSelectedCategory("pc")} className="btn btn-secondary">PC</button>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <button
            onClick={() => setShowSearch(!showSearch)}
            style={{ border: "none", background: "none", fontSize: "20px", color: "#39FF14" }}
          >
            🔍
          </button>

          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: showSearch ? "200px" : "0px",
              opacity: showSearch ? 1 : 0,
              transition: "0.3s",
              padding: showSearch ? "5px" : "0px",
              border: showSearch ? "1px solid #ccc" : "none",
              borderRadius: "5px"
            }}
          />
        </div>
      </div>

      {/* products */}
      <div className="row">
        {visibleProducts.map((singleproduct, index) => (
          <div className="col-md-3 mb-4" key={index}>
            <div className="card h-100 bg-dark text-light">

              <img
                src={imagepath + singleproduct.product_photo}
                alt={singleproduct.product_name}
                style={{ height: "150px", objectFit: "contain" }}
              />

              <div className="card-body">
                <h5 className="product-title">
                  {singleproduct.product_name}
                </h5>

                <p>{singleproduct.product_description}</p>

                <b>Ksh {singleproduct.product_cost}</b>
                <br />

                {/* 🛒 ADD TO CART BUTTON */}
                <button
                  className="btn mt-2 me-2 neon-btn"
                  onClick={() => addToCart(singleproduct)}
                >
                  Add to Cart 🛒
                </button>

                {/* PURCHASE BUTTON */}
                <button
                  className="btn mt-2 neon-btn"
                  onClick={() =>
                    navigate("/makepayment", {
                      state: { singleproduct }
                    })
                  }
                >
                  Purchase Now
                </button>

              </div>
            </div>
          </div>
        ))}
      </div>

      {/* load more */}
      {visibleCount < filteredProducts.length && (
        <div className="text-center mt-3">
          <button
            className="btn btn-success"
            onClick={() => setVisibleCount(prev => prev + 4)}
          >
            Load More
          </button>
        </div>
      )}

      <Addfooter />
    </div>
  )
}

export default Getproduct