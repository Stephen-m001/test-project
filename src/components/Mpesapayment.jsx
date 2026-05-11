import axios from 'axios'
import React, { useState, useContext } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { CartContext } from '../CartContext'

const Mpesapayment = () => {

  const locationState = useLocation().state || {}
  const { singleproduct: singleFromState, cart: cartFromState } = locationState
  const { cart: cartFromContext } = useContext(CartContext)

  const singleproduct = singleFromState
  const cart = Array.isArray(cartFromState) && cartFromState.length > 0 ? cartFromState : cartFromContext

  const imagepath = "http://murayambuni.alwaysdata.net/static/images/"

  const [phone, setPhone] = useState("")
  const [loading, setLoading] = useState("")
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")

  const amount = Array.isArray(cart) && cart.length > 0
    ? cart.reduce((sum, item) => sum + (item.product_cost * item.qty), 0)
    : (singleproduct ? singleproduct.product_cost : 0)

  const handlesubmit = async (e) => {
    e.preventDefault()
    setLoading("Processing payment...")

    const formdata = new FormData()
    formdata.append("amount", amount)
    formdata.append("phone", phone)

    try {
      const response = await axios.post(
        "http://murayambuni.alwaysdata.net/api/mpesa_payment",
        formdata
      )
      setSuccess(response.data.message)
      setError("")
    } catch (err) {
      setError("Payment failed. Try again.")
      setSuccess("")
    } finally {
      setLoading("")
    }
  }

  if (!singleproduct && (!Array.isArray(cart) || cart.length === 0)) {
    return (
      <div className="text-center text-light mt-5">
        <h4>No payment data found</h4>
        <Link to="/" className="btn btn-success mt-3">Back to Store</Link>
      </div>
    )
  }

  return (
    <div className="container text-light mt-4">

      <h2 className="text-success mb-4">💳 Checkout - MPesa Payment</h2>

      <div className="row">

        {/* LEFT - ORDER SUMMARY */}
        <div className="col-md-6 mb-3">

          <div className="card bg-dark text-light p-3 shadow-lg border-success">

            <h4 className="text-success">Order Summary</h4>
            <hr className="border-success" />

            {singleproduct ? (
              <div>
                <img
                  src={imagepath + singleproduct.product_photo}
                  alt=""
                  className="img-fluid mb-2"
                  style={{ height: "200px", objectFit: "contain" }}
                />
                <h5>{singleproduct.product_name}</h5>
                <p className="text-muted">{singleproduct.product_description}</p>
                <h5 className="text-warning">Ksh {singleproduct.product_cost}</h5>
              </div>
            ) : (
              <>
                {cart.map((item, idx) => (
                  <div key={idx} className="d-flex justify-content-between mb-2">
                    <span>{item.product_name} x {item.qty}</span>
                    <span>Ksh {item.product_cost * item.qty}</span>
                  </div>
                ))}

                <hr className="border-success" />

                <h4>
                  Total: <span className="text-warning glow">{amount}</span>
                </h4>
              </>
            )}

          </div>

        </div>

        {/* RIGHT - PAYMENT FORM */}
        <div className="col-md-6">

          <div className="card bg-black text-light p-4 shadow-lg border-success">

            <h4 className="text-success">Pay with MPesa</h4>

            <form onSubmit={handlesubmit} className="mt-3">

              <input
                type="tel"
                className="form-control mb-3"
                placeholder="2547XXXXXXXX"
                onChange={(e) => setPhone(e.target.value)}
              />

              <button className="btn btn-success w-100 glow-btn">
                Pay Ksh {amount}
              </button>

            </form>

            {/* STATUS */}
            {loading && <p className="text-warning mt-3">{loading}</p>}
            {success && <p className="text-success mt-3">{success}</p>}
            {error && <p className="text-danger mt-3">{error}</p>}

          </div>

        </div>

      </div>

      {/* STYLE */}
      <style>{`
        .border-success {
          border: 1px solid rgba(0,255,136,0.3) !important;
        }

        .glow {
          text-shadow: 0 0 10px #00ff88;
        }

        .glow-btn {
          background: linear-gradient(45deg, #00ff88, #00c853);
          border: none;
          font-weight: bold;
          box-shadow: 0 0 10px #00ff88;
        }

        .glow-btn:hover {
          transform: scale(1.03);
          transition: 0.3s;
          box-shadow: 0 0 20px #00ff88;
        }
      `}</style>

    </div>
  )
}

export default Mpesapayment