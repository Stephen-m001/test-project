import React, { useEffect, useState, useContext } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { CartContext } from '../CartContext'

const Navbar = () => {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()

  const { cart } = useContext(CartContext)

  // count items
  const cartCount = cart.reduce((total, item) => total + item.qty, 0)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")

    if (storedUser) {
      setUser(JSON.parse(storedUser))
    } else {
      setUser(null)
    }
  }, [location])

  const handleLogout = () => {
    localStorage.removeItem("user")
    setUser(null)
    navigate("/signin")
  }

  return (
    <nav className="navbar navbar-expand-md px-3" style={{ background: 'linear-gradient(90deg, rgba(57,255,20,0.06), transparent)' }}>

      {/* LOGO */}
      <Link to="/" className="navbar-brand text-light fw-bold site-title">
        🎮 Zuri Gaming
      </Link>

      <button
        className="navbar-toggler"
        data-bs-target="#navbarcollapse"
        data-bs-toggle="collapse"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarcollapse">

        {/* LEFT LINKS */}
        <div className="navbar-nav me-auto">
          <Link to="/" className="nav-link">Home</Link>

          {user && (
            <Link to="/addproduct" className="nav-link">
              Add Product
            </Link>
          )}

          {!user && (
            <>
              <Link to="/signup" className="nav-link">Sign Up</Link>
              <Link to="/signin" className="nav-link">Sign In</Link>
            </>
          )}
        </div>

        {/* RIGHT SIDE */}
        <div className="d-flex align-items-center gap-3">

          {/* 🛒 CART */}
          <Link to="/cart" style={{ position: "relative", fontSize: "22px", textDecoration: "none", color: 'var(--accent)' }}>
            🛒

            {cartCount > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "-8px",
                  right: "-10px",
                  background: "red",
                  color: "white",
                  borderRadius: "50%",
                  padding: "2px 6px",
                  fontSize: "12px"
                }}
              >
                {cartCount}
              </span>
            )}
          </Link>

          {/* USER */}
          {user && (
            <>
              <span className="fw-bold text-light">
                {user.username}
              </span>

              <button
                onClick={handleLogout}
                className="btn btn-danger btn-sm"
              >
                Logout
              </button>
            </>
          )}

        </div>

      </div>
    </nav>
  )
}

export default Navbar