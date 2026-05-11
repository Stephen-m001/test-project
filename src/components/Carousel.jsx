import React from 'react'

const Carousel = () => {
  return (
    <section className="container-fluid p-0">

      <div
        id="mycarousel"
        className="carousel slide"
        data-bs-ride="carousel"
      >

        <div className="carousel-inner">

          {/* Slide 1 */}
          <div className="carousel-item active hero-slide">
            <img
              src="/images/gc1.png"
              className="d-block w-100 hero-img"
              alt="slide1"
            />
            <div className="carousel-caption hero-overlay">
              <h1 className="glow-text">NEXT-GEN GAMING STORE</h1>
              <p>Buy top PC & console games at the best prices</p>
              <button className="btn btn-success px-4">Shop Now</button>
            </div>
          </div>

          {/* Slide 2 */}
          <div className="carousel-item hero-slide">
            <img
              src="/images/game2.jpeg"
              className="d-block w-100 hero-img"
              alt="slide2"
            />
            <div className="carousel-caption hero-overlay">
              <h1 className="glow-text">LEVEL UP YOUR EXPERIENCE</h1>
              <p>Exclusive deals on trending games</p>
              <button className="btn btn-success px-4">Explore</button>
            </div>
          </div>

          {/* Slide 3 */}
          <div className="carousel-item hero-slide">
            <img
              src="/images/game3.jpeg"
              className="d-block w-100 hero-img"
              alt="slide3"
            />
            <div className="carousel-caption hero-overlay">
              <h1 className="glow-text">PLAY. COMPETE. WIN.</h1>
              <p>Join thousands of gamers worldwide</p>
              <button className="btn btn-success px-4">Join Now</button>
            </div>
          </div>

        </div>

        {/* Controls */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#mycarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" />
        </button>

        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#mycarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" />
        </button>

      </div>

      {/* Styling */}
      <style>{`
        .hero-slide {
          position: relative;
          height: 80vh;
          background: #000;
        }

        .hero-img {
          height: 80vh;
          object-fit: cover;
          filter: brightness(45%);
        }

        .hero-overlay {
          bottom: 20%;
          text-align: center;
        }

        .glow-text {
          font-size: 3rem;
          font-weight: bold;
          color: #00ff88;
          text-shadow: 0 0 10px #00ff88, 0 0 20px #00ff88;
        }

        .hero-overlay p {
          font-size: 1.2rem;
          color: #ddd;
          margin-bottom: 15px;
        }

        .btn-success {
          background: linear-gradient(45deg, #00ff88, #00c853);
          border: none;
          font-weight: bold;
        }

        .btn-success:hover {
          transform: scale(1.05);
          transition: 0.3s;
        }

        .carousel-control-prev-icon,
        .carousel-control-next-icon {
          background-color: rgba(0, 255, 136, 0.6);
          border-radius: 50%;
        }
      `}</style>

    </section>
  )
}

export default Carousel