import React, { useEffect, useState, useContext } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { CartContext } from '../CartContext'

const Navbar = () => {

  const [user, setUser] = useState(null)

  const navigate = useNavigate()
  const location = useLocation()

  const { cart } = useContext(CartContext)

  // Cart count
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

    <nav
      className="navbar navbar-expand-lg navbar-dark px-lg-5 px-3 py-3 sticky-top"
      style={{
        background: "rgba(5, 7, 13, 0.85)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.05)"
      }}
    >

      {/* LOGO */}
      <Link
        to="/"
        className="navbar-brand fw-bold"
        style={{
          fontSize: "1.7rem",
          fontFamily: "'Orbitron', sans-serif",
          color: "#39FF14",
          textShadow: "0 0 10px rgba(57,255,20,0.6)"
        }}
      >
        🎮 Zuri Gaming
      </Link>

      {/* MOBILE BUTTON */}
      <button
        className="navbar-toggler border-0 shadow-none"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarContent"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* NAV CONTENT */}
      <div
        className="collapse navbar-collapse"
        id="navbarContent"
      >

        {/* LEFT LINKS */}
        <div className="navbar-nav mx-auto gap-lg-4">

          <Link
            to="/"
            className="nav-link fw-semibold text-light"
          >
            Home
          </Link>

          <a
            href="#"
            className="nav-link fw-semibold text-light"
          >
            Trending
          </a>

          <a
            href="#"
            className="nav-link fw-semibold text-light"
          >
            New Releases
          </a>

          <a
            href="#"
            className="nav-link fw-semibold text-light"
          >
            Top Games
          </a>

          {user && (
            <Link
              to="/addproduct"
              className="nav-link fw-semibold text-warning"
            >
              Add Product
            </Link>
          )}

        </div>

        {/* RIGHT SIDE */}
        <div className="d-flex align-items-center gap-3 mt-3 mt-lg-0">

          {/* SEARCH */}
          <div
            className="d-none d-lg-flex align-items-center px-3"
            style={{
              background: "#111827",
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.05)",
              height: "45px",
              width: "240px"
            }}
          >
            <input
              type="text"
              placeholder="Search games..."
              style={{
                background: "transparent",
                border: "none",
                outline: "none",
                color: "white",
                width: "100%"
              }}
            />
          </div>

          {/* CART */}
          <Link
            to="/cart"
            style={{
              position: "relative",
              textDecoration: "none",
              fontSize: "1.7rem"
            }}
          >
            🛒

            {cartCount > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "-10px",
                  right: "-10px",
                  background: "#39FF14",
                  color: "black",
                  borderRadius: "50%",
                  minWidth: "22px",
                  height: "22px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "12px",
                  fontWeight: "bold"
                }}
              >
                {cartCount}
              </span>
            )}
          </Link>

          {/* USER */}
          {user ? (
            <div className="d-flex align-items-center gap-2">

              <div
                className="px-3 py-2"
                style={{
                  background: "#111827",
                  borderRadius: "10px",
                  color: "#39FF14",
                  fontWeight: "600"
                }}
              >
                👤 {user.username}
              </div>

              <button
                onClick={handleLogout}
                className="btn btn-danger"
                style={{
                  borderRadius: "10px",
                  padding: "10px 18px"
                }}
              >
                Logout
              </button>

            </div>
          ) : (

            <div className="d-flex gap-2">

              <Link
                to="/signin"
                className="btn btn-outline-light"
                style={{
                  borderRadius: "10px"
                }}
              >
                Sign In
              </Link>

              <Link
                to="/signup"
                className="btn"
                style={{
                  background: "linear-gradient(90deg, #39FF14, #00f7ff)",
                  color: "black",
                  fontWeight: "bold",
                  borderRadius: "10px"
                }}
              >
                Join Now
              </Link>

            </div>

          )}

        </div>

      </div>
    </nav>
  )
}

export default Navbar