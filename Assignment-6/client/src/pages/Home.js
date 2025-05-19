// client/src/pages/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      {/* Full-width hero, height reduced from 60vh → 54vh (10%) */}
      <section
        className="text-white d-flex align-items-center justify-content-center text-center"
        style={{
          backgroundImage: "url('/images/banner.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '100vw',
          marginLeft: 'calc(50% - 50vw)',  
          height: '54vh',
        }}
      >
        <div className="bg-dark bg-opacity-50 p-4 rounded">
          <h1 className="display-4 fw-bold">Fresh • Fast • Affordable</h1>
          <p className="lead mb-4">Everyday groceries delivered to your doorstep</p>
          <button
            onClick={() => navigate('/catalogue')}
            className="btn btn-lg btn-success"
          >
            Shop Now
          </button>
        </div>
      </section>

      {/* Rest of the home content stays inside the container */}
      <section className="text-center mt-5">
        <h2 className="fw-bold">Why GroceryShop?</h2>
        <p className="text-muted mb-4">
          We curate the freshest produce and pantry staples, and deliver them right to you.
        </p>
        <div className="row justify-content-center g-4">
          {[
            { icon: '🚚', title: 'Fast Delivery' },
            { icon: '🛒', title: 'Easy Ordering' },
            { icon: '🌿', title: 'Organic Options' },
          ].map((card, i) => (
            <div key={i} className="col-8 col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <div className="fs-1 mb-3">{card.icon}</div>
                  <h5 className="card-title">{card.title}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
