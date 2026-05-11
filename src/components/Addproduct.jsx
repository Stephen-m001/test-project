import axios from 'axios'
import React, { useState } from 'react'

const Addproduct = () => {

  // STATES
  const [product_name, setProductName] = useState("")
  const [product_description, setProductDescription] = useState("")
  const [cost, setCost] = useState("")
  const [category, setCategory] = useState("games")
  const [product_photo, setProductPhoto] = useState("")

  // STATUS STATES
  const [loading, setLoading] = useState("")
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")

  // SUBMIT FUNCTION
  const handlesubmit = async (e) => {

    e.preventDefault()

    setLoading("Uploading product...")
    setSuccess("")
    setError("")

    // FORM DATA
    const formdata = new FormData()

    formdata.append("product_name", product_name)
    formdata.append("product_description", product_description)
    formdata.append("product_cost", cost)
    formdata.append("product_photo", product_photo)
    formdata.append("category", category)

    try {

      const response = await axios.post(
        "http://murayambuni.alwaysdata.net/api/addproduct",
        formdata
      )

      setSuccess(response.data.message)
      setLoading("")

      // CLEAR FORM
      setProductName("")
      setProductDescription("")
      setCost("")
      setCategory("games")

    } catch (error) {

      setError("Failed to upload product")
      setLoading("")
    }
  }

  return (

    <div
      className="container py-5"
      style={{ minHeight: "100vh" }}
    >

      <div className="row justify-content-center">

        <div className="col-lg-7">

          {/* CARD */}
          <div
            className="card border-0"
            style={{
              background: "rgba(17,24,39,0.95)",
              borderRadius: "20px",
              backdropFilter: "blur(12px)",
              boxShadow:
                "0 15px 35px rgba(0,0,0,0.5)"
            }}
          >

            <div className="card-body p-lg-5 p-4">

              {/* TITLE */}
              <div className="text-center mb-4">

                <h1
                  style={{
                    color: "#39FF14",
                    fontFamily: "'Orbitron', sans-serif",
                    fontWeight: "700"
                  }}
                >
                  Upload Gaming Product
                </h1>

                <p style={{ color: "#9ca3af" }}>
                  Add new games, consoles, or accessories to your store.
                </p>

              </div>

              {/* STATUS */}
              {loading && (
                <div className="alert alert-warning">
                  {loading}
                </div>
              )}

              {success && (
                <div className="alert alert-success">
                  {success}
                </div>
              )}

              {error && (
                <div className="alert alert-danger">
                  {error}
                </div>
              )}

              {/* FORM */}
              <form
                onSubmit={handlesubmit}
              >

                {/* PRODUCT NAME */}
                <div className="mb-4">

                  <label className="form-label text-light">
                    Product Name
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter product name"
                    value={product_name}
                    onChange={(e) =>
                      setProductName(e.target.value)
                    }
                    required
                  />

                </div>

                {/* DESCRIPTION */}
                <div className="mb-4">

                  <label className="form-label text-light">
                    Description
                  </label>

                  <textarea
                    className="form-control"
                    rows="4"
                    placeholder="Enter product description"
                    value={product_description}
                    onChange={(e) =>
                      setProductDescription(
                        e.target.value
                      )
                    }
                    required
                  ></textarea>

                </div>

                {/* CATEGORY */}
                <div className="mb-4">

                  <label className="form-label text-light">
                    Category
                  </label>

                  <select
                    className="form-control"
                    value={category}
                    onChange={(e) =>
                      setCategory(e.target.value)
                    }
                  >

                    <option value="games">
                      Games
                    </option>

                    <option value="consoles">
                      Consoles
                    </option>

                    <option value="pc">
                      PC Gaming
                    </option>

                    <option value="accessories">
                      Accessories
                    </option>

                  </select>

                </div>

                {/* PRICE */}
                <div className="mb-4">

                  <label className="form-label text-light">
                    Price (Ksh)
                  </label>

                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter price"
                    value={cost}
                    onChange={(e) =>
                      setCost(e.target.value)
                    }
                    required
                  />

                </div>

                {/* IMAGE */}
                <div className="mb-4">

                  <label className="form-label text-light">
                    Product Image
                  </label>

                  <input
                    type="file"
                    accept="image/*"
                    className="form-control"
                    onChange={(e) =>
                      setProductPhoto(
                        e.target.files[0]
                      )
                    }
                    required
                  />

                </div>

                {/* BUTTON */}
                <button
                  type="submit"
                  className="btn w-100 py-3"
                  style={{
                    background:
                      "linear-gradient(90deg, #39FF14, #00f7ff)",
                    border: "none",
                    color: "black",
                    fontWeight: "700",
                    borderRadius: "12px",
                    fontSize: "1rem"
                  }}
                >
                  Upload Product 🚀
                </button>

              </form>

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default Addproduct