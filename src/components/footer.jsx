import { Link } from "react-router-dom"

const Addfooter = () => {
  return (
    <>
      {/* MAIN FOOTER */}
      <section
        className="container-fluid py-5 text-light"
        style={{
          background: "linear-gradient(180deg, #0a0a0a, #111)",
          borderTop: "2px solid #00ff88"
        }}
      >

        <div className="row px-4">

          {/* BRAND */}
          <div className="col-md-3 mb-4">
            <h2 className="glow-text">Zuri Gaming</h2>
            <p className="text-muted">
              Where legends are built. Power up your play and dominate every match.
            </p>
          </div>

          {/* CONTACT */}
          <div className="col-md-3 mb-4">
            <h4 className="text-success">Contact</h4>
            <p>📍 Kenya</p>
            <p>📞 +254 700 000 000</p>
            <p>✉️ info@gaming.com</p>
          </div>

          {/* NAVIGATION */}
          <div className="col-md-3 mb-4">
            <h4 className="text-success">Navigate</h4>
            <ul className="list-unstyled footer-links">
              <li><Link to="/">Products</Link></li>
              <li><Link to="/addproduct">Add Product</Link></li>
              <li><Link to="/signup">Sign Up</Link></li>
              <li><Link to="/signin">Sign In</Link></li>
            </ul>
          </div>

          {/* SOCIAL */}
          <div className="col-md-3 mb-4">
            <h4 className="text-success">Stay Connected</h4>

            <div className="d-flex gap-3 mt-3">

              <img src="images/download.png" alt="fb" className="social-icon" />
              <img src="images/Instagram_Glyph_Black.png" alt="ig" className="social-icon" />
              <img src="images/x.png" alt="x" className="social-icon" />

            </div>

            <p className="mt-3 text-muted">
              Follow us for exclusive gaming deals & drops.
            </p>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="text-center mt-4 pt-3 border-top border-success">
          <small className="text-muted">
            © 2026 Zuri Gaming — All Rights Reserved
          </small>
        </div>

      </section>

      {/* STYLE */}
      <style>{`
        .glow-text {
          color: #00ff88;
          text-shadow: 0 0 8px #00ff88;
          font-weight: bold;
        }

        .footer-links li {
          margin-bottom: 8px;
        }

        .footer-links a {
          text-decoration: none;
          color: #ccc;
          transition: 0.3s;
        }

        .footer-links a:hover {
          color: #00ff88;
          padding-left: 5px;
        }

        .social-icon {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          transition: 0.3s;
          cursor: pointer;
        }

        .social-icon:hover {
          transform: scale(1.2);
          box-shadow: 0 0 10px #00ff88;
        }
      `}</style>
    </>
  )
}

export default Addfooter