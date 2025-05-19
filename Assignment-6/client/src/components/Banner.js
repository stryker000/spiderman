export default function Banner() {
    return (
      <header className="banner-wrapper overflow-hidden">
        <img
          src="/images/banner.jpg"                    /* replace */
          alt="Fresh groceries"
          className="w-100 banner-img"
        />
        <div className="banner-overlay d-flex flex-column justify-content-center align-items-center text-white text-center">
          <h1 className="display-5 fw-bold">Fresh • Fast • Affordable</h1>
          <p className="lead mb-0">Everyday groceries delivered to your doorstep</p>
        </div>
      </header>
    );
  }
  