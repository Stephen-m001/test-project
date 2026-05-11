import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Signin = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [loading, setLoading] = useState("")
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")

  const navigate = useNavigate()

  const handlesubmit = async (e) => {
    e.preventDefault()
    setLoading("Signing you in...")

    const formdata = new FormData()
    formdata.append("email", email)
    formdata.append("password", password)

    try {
      const response = await axios.post(
        "http://murayambuni.alwaysdata.net/api/signin",
        formdata
      )

      const user = response.data.user

      localStorage.setItem("username", user.username)
      localStorage.setItem("user", JSON.stringify(user))

      setSuccess("Welcome back, " + user.username)
      setError("")

      setTimeout(() => {
        navigate("/")
      }, 1000)

    } catch (err) {
      setError("Invalid email or password")
      setSuccess("")
    } finally {
      setLoading("")
    }
  }

  return (
    <div className="signin-bg d-flex justify-content-center align-items-center">

      <div className="card signin-card p-4 shadow-lg text-light">

        <h2 className="text-center glow-text mb-3">
          ZURI GAMING LOGIN
        </h2>

        <p className="text-center text-muted mb-3">
          Access your gaming world
        </p>

        {/* STATUS */}
        {loading && <p className="text-warning">{loading}</p>}
        {success && <p className="text-success">{success}</p>}
        {error && <p className="text-danger">{error}</p>}

        <form onSubmit={handlesubmit}>

          <input
            type="email"
            className="form-control mb-3 input-dark"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="form-control mb-3 input-dark"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="btn btn-success w-100 glow-btn">
            Sign In
          </button>

        </form>

        <p className="text-center mt-3 text-muted">
          No account?
          <Link to="/signup" className="text-success ms-1">
            Create one
          </Link>
        </p>

      </div>

      {/* STYLE */}
      <style>{`
        .signin-bg {
          height: 100vh;
          background: radial-gradient(circle at top, #111, #000);
        }

        .signin-card {
          width: 380px;
          background: rgba(0,0,0,0.85);
          border: 1px solid rgba(0,255,136,0.3);
          border-radius: 12px;
        }

        .glow-text {
          color: #00ff88;
          text-shadow: 0 0 10px #00ff88;
        }

        .input-dark {
          background: #111;
          border: 1px solid #333;
          color: #fff;
        }

        .input-dark:focus {
          border-color: #00ff88;
          box-shadow: 0 0 8px #00ff88;
          background: #111;
          color: #fff;
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

export default Signin