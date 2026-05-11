import React, { useContext } from 'react'
import { CartContext } from '../CartContext'
import { useNavigate } from 'react-router-dom'

const CartPage = () => {
  const { cart, removeFromCart } = useContext(CartContext)
  const navigate = useNavigate()

  const total = cart.reduce(
    (sum, item) => sum + item.product_cost * item.qty,
    0
  )

  return (
    <div className="container mt-4 text-light">

      <h2 className="text-success mb-4">🛒 Gaming Cart</h2>

      {cart.length === 0 ? (
        <div className="text-center mt-5">
          <h4 className="text-muted">Your inventory is empty</h4>
        </div>
      ) : (
        <div className="row">

          {/* LEFT: ITEMS */}
          <div className="col-md-8">

            {cart.map((item, index) => (
              <div
                key={index}
                className="card bg-dark text-light mb-3 shadow-lg border-success"
              >
                <div className="card-body d-flex justify-content-between align-items-center">

                  {/* GAME INFO */}
                  <div>
                    <h5 className="text-success">{item.product_name}</h5>
                    <p className="mb-1">
                      Ksh <b>{item.product_cost}</b>
                    </p>

                    <span className="badge bg-secondary">
                      Qty: {item.qty}
                    </span>
                  </div>

                  {/* REMOVE */}
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => removeFromCart(item.product_id)}
                  >
                    Remove
                  </button>

                </div>
              </div>
            ))}

          </div>

          {/* RIGHT: SUMMARY */}
          <div className="col-md-4">

            <div className="card bg-black text-light p-3 shadow-lg border-success sticky-top">

              <h4 className="text-success">Order Summary</h4>

              <hr className="border-success" />

              <p>Total Items: {cart.length}</p>

              <h5>
                Total: <span className="text-warning">Ksh {total}</span>
              </h5>

              <button
                className="btn btn-success w-100 mt-3 glow-btn"
                onClick={() =>
                  navigate("/makepayment", { state: { cart } })
                }
              >
                Proceed to Checkout
              </button>

            </div>

          </div>

        </div>
      )}

      {/* STYLE */}
      <style>{`
        .border-success {
          border: 1px solid rgba(0, 255, 136, 0.3) !important;
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

        .card {
          border-radius: 12px;
        }
      `}</style>

    </div>
  )
}

export default CartPage