import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Css/InquiryForm1.css'; // Import a dedicated CSS file for custom styles

const InquiryForm1 = () => {
  return (
    <div
      className="container-fluid py-5 why-choose-us-section" // Added a custom class for specific styling
      style={{
        backgroundImage:
          'linear-gradient(rgba(0, 30, 67, 0.78), rgba(0, 30, 67, 0.69)), url("src/assets/bg.jpg")', // Ensure this path is correct
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        // Removed fixed width and height for better responsiveness.
        // If a minimum height is essential for the background image, use min-height:
        minHeight: '776px', // Example: to ensure the background image covers a certain minimum area
        display: 'flex',
        alignItems: 'center',
        fontFamily: '"Inter", sans-serif',
      }}
    >
      <div className="container">
        <div className="row justify-content-center g-4 align-items-stretch"> {/* Added align-items-stretch for equal height columns */}
          {/* Left Column: Why Our Service Is The Perfect Choice? and 3 description boxes */}
          <div className="col-lg-7 d-flex flex-column">
            <div className="row row-cols-1 row-cols-md-2 g-4 flex-grow-1">
              {/* Bold Heading Box */}
              <div className="col d-flex"> {/* Added d-flex for consistent height */}
                <div className="p-4 text-white text-start why-us-heading-box d-flex flex-column justify-content-center">
                  <h1 className="fw-bold display-5 mb-0"> {/* mb-0 to remove default margin-bottom */}
                    Why Our Service Is The Perfect Choice?
                  </h1>
                  {/* Small line/underline as seen in the image */}
                  <div className="heading-underline mt-3"></div> 
                </div>
              </div>

              {/* 01. Lorem Ipsum */}
              <div className="col d-flex">
                <div className="p-4 text-white text-start description-box d-flex flex-column justify-content-center">
                  <h3 className="fw-semibold fs-3 mb-2">
                    <span className="number-prefix">01.</span> 
                    <h1>Lorem Ipsum</h1>
                  </h3>
                  <p className="mb-0"> {/* mb-0 to remove default margin-bottom */}
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod.
                  </p>
                </div>
              </div>

              {/* 02. Lorem Ipsum */}
              <div className="col d-flex">
                <div className="p-4 text-white text-start description-box d-flex flex-column justify-content-center">
                  <h3 className="fw-semibold fs-3 mb-2">
                    <span className="number-prefix">02.</span> 
                    <h1>Lorem Ipsum</h1>
                  </h3>
                  <p className="mb-0">
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod.
                  </p>
                </div>
              </div>

              {/* 03. Lorem Ipsum */}
              <div className="col d-flex">
                <div className="p-4 text-white text-start description-box d-flex flex-column justify-content-center">
                  <h3 className="fw-semibold fs-3 mb-2">
                    <span className="number-prefix">03.</span> 
                    <h1>Lorem Ipsum</h1>
                  </h3>
                  <p className="mb-0">
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="col-lg-4 d-flex"> {/* Added d-flex to make card fill height */}
            <div className="card p-4 shadow rounded-3 flex-grow-1"> {/* flex-grow-1 to make card expand */}
              <h4 className="card-title mb-4 text-start " style={{ borderBottom: '2px solid #e0e0e0', paddingBottom: '10px', fontWeight: '200'}}>
                Real Estate Inquiry Form
              </h4>
              
              <form>
                <div className="mb-3">
                  <label htmlFor="inquiryType" className="form-label" style={{ fontWeight: '500', color: 'black' }}>
                    Inquiry Type
                  </label>
                  <select className="form-select rounded-1" id="inquiryType">
                    <option style={{ color: '#A4A4A4' }}>Renting Property</option>
                    <option>Buying Property</option>
                    <option>Selling Property</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label" style={{ fontWeight: '500', color: 'black' }}>
  Name
</label>

                  <input
                    type="text"
                    className="form-control rounded-1"
                    id="name"
                    placeholder="John Doe" style={{ color: '#A4A4A4' }}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label" style={{ fontWeight: '500', color: 'black' }}>
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control rounded-1"
                    id="email"
                    placeholder="example@domain.com"
                    style={{ color: '#A4A4A4' }}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label" style={{ fontWeight: '500', color: 'black' }}>
                    Phone (Optional)
                  </label>
                  <input
                    type="tel"
                    className="form-control rounded-1"
                    id="phone"
                    style={{ color: '#A4A4A4' }}
                    placeholder="+1 (123) 456-0509"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="message" className="form-label" style={{ fontWeight: '500', color: 'black' }}>
                    Message
                  </label>
                  <textarea
                    className="form-control rounded-2"
                    id="message"
                    style={{ color: '#A4A4A4' }}
                    rows="4"
                    placeholder="Please Enter Your Message"
                  ></textarea>
                </div>
                <div className="d-flex justify-content-end">
  <button
    type="submit"
    className="btn btn-primary rounded-1 shadow-sm"
    style={{ width: "50%" }}
  >
    Submit
  </button>
</div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InquiryForm1;