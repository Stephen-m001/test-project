import axios from 'axios'
import React, { useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { useContext } from 'react'
import { CartContext } from '../CartContext'

const Mpesapayment = () => {
  const locationState = useLocation().state || {}
  const { singleproduct: singleFromState, cart: cartFromState } = locationState

  // fallback to context (and localStorage) if state not provided
  const { cart: cartFromContext } = useContext(CartContext)

  const singleproduct = singleFromState
  const cart = Array.isArray(cartFromState) && cartFromState.length > 0 ? cartFromState : cartFromContext

  const imagepath = "http://murayambuni.alwaysdata.net/static/images/"

  // declare the states here 
  const [phone, setPhone] = useState("")
  
  // 3 states of posting data 
  const [loading, setLoading] = useState("")
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")

  // compute amount: if cart is present sum items, otherwise use singleproduct
  const computeAmount = () => {
    if (Array.isArray(cart) && cart.length > 0) {
      return cart.reduce((sum, item) => {
        const cost = Number(item.product_cost) || 0
        const qty = Number(item.qty) || 1
        return sum + cost * qty
      }, 0)
    }

    if (singleproduct) {
      return Number(singleproduct.product_cost) || 0
    }

    return 0
  }

  const amount = computeAmount()

  // function to handle submit
  const handlesubmit = async (e) => {
    e.preventDefault()
    const formdata = new FormData()
    setLoading("please Wait...")

    formdata.append("amount", amount)
    formdata.append("phone", phone)

    try {
      const response = await axios.post("http://murayambuni.alwaysdata.net/api/mpesa_payment", formdata)
      setSuccess(response.data.message)
      setLoading("")
    } catch (err) {
      setError(err.message)
      setLoading("")
    }
  }

  // render fallback when no data provided
  if (!singleproduct && (!Array.isArray(cart) || cart.length === 0)) {
    return (
      <div className="row justify-content-center">
        <div className="card shadow col-md-8 p-4 text-center">
          <h3>No product or cart provided for payment</h3>
          <p>Please go back to the <Link to="/">products page</Link> and try again.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="row justify-content-center">
      <h1>Make payment - Lipa na MPesa</h1>
      <div className="card shadow col-md-8 p-4">
        {singleproduct ? (
          <>
            <img src={imagepath + singleproduct.product_photo} alt="" style={{ height: "250px", objectFit: "contain" }} />
            <h5 className='text-start text-success'>{singleproduct.product_name}</h5>
            <p className="text-start ">{singleproduct.product_description}</p>
            <b className="text-success text-start">Ksh.{singleproduct.product_cost}</b>
          </>
        ) : (
          <>
            <h5 className="text-start text-success">Your Cart</h5>
            {cart.map((item, idx) => (
              <div key={idx} className="d-flex justify-content-between">
                <div>
                  <div>{item.product_name} x {item.qty}</div>
                </div>
                <div>Ksh {Number(item.product_cost) * Number(item.qty)}</div>
              </div>
            ))}
            <hr />
            <h5 className="text-end">Total: <span className="text-warning">Ksh {amount}</span></h5>
          </>
        )}

        {/* bind the states  */}
        <h2 className="text-warning">{loading}</h2>
        <h2 className="text-success">{success}</h2>
        <h2 className="text-danger">{error}</h2>

        <form action="" onSubmit={handlesubmit} >
          <input type="tel" className="form-control" placeholder='Enter phone 254xxxxxxxx' onChange={(e) => setPhone(e.target.value)} /><br />
          <button className="btn btn-success w-100" type='submit' >Make Payment Ksh {amount}</button>
        </form>

      </div>
    </div>
  )
}

export default Mpesapayment