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

      <h2 className="text-success">🛒 Your Cart</h2>

      {cart.length === 0 ? (
        <h4>Your cart is empty</h4>
      ) : (
        <>
          {cart.map((item, index) => (
            <div
              key={index}
              className="d-flex justify-content-between align-items-center bg-dark p-3 mb-2"
            >
              <div>
                <h5>{item.product_name}</h5>
                <p>Ksh {item.product_cost} x {item.qty}</p>
              </div>

              <button
                className="btn btn-danger btn-sm"
                onClick={() => removeFromCart(item.product_id)}
              >
                Remove
              </button>
            </div>
          ))}

          {/* TOTAL */}
          <h4 className="mt-3">
            Total: <span className="text-warning">Ksh {total}</span>
          </h4>

          {/* CHECKOUT */}
          <button
            className="btn btn-success mt-2"
            onClick={() =>
              navigate("/makepayment", {
                state: { cart }
              })
            }
          >
            Proceed to Payment
          </button>
        </>
      )}

    </div>
  )
}

export default CartPage