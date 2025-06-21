import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Css/InquiryForm1.css';

const InquiryForm1 = () => {
  const [formData, setFormData] = useState({
    inquiryType: 'Renting Property', // Set a default value
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [submissionStatus, setSubmissionStatus] = useState(null); // 'success', 'error', 'submitting'

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionStatus('submitting');

    try {
      // *** IMPORTANT CHANGE HERE: Point to the new general-inquiries endpoint ***
      const response = await fetch('http://localhost:8000/api/general-inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmissionStatus('success');
        // Clear the form after successful submission
        setFormData({
          inquiryType: 'Renting Property',
          name: '',
          email: '',
          phone: '',
          message: '',
        });
        console.log('General inquiry submitted successfully:', data);
      } else {
        setSubmissionStatus('error');
        console.error('General inquiry submission error:', data.message || 'Something went wrong');
      }
    } catch (error) {
      setSubmissionStatus('error');
      console.error('Network error during general inquiry submission:', error);
    }
  };

  return (
    <div
      className="container-fluid py-5 why-choose-us-section"
      style={{
        backgroundImage:
          'linear-gradient(rgba(0, 30, 67, 0.78), rgba(0, 30, 67, 0.69)), url("src/assets/bg.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '776px',
        display: 'flex',
        alignItems: 'center',
        fontFamily: '"Inter", sans-serif',
      }}
    >
      <div className="container">
        <div className="row justify-content-center g-4 align-items-stretch">
          {/* Left Column: Why Our Service Is The Perfect Choice? and 3 description boxes */}
          <div className="col-lg-7 d-flex flex-column">
            <div className="row row-cols-1 row-cols-md-2 g-4 flex-grow-1">
              {/* Bold Heading Box */}
              <div className="col d-flex">
                <div className="p-4 text-white text-start why-us-heading-box d-flex flex-column justify-content-center">
                  <h1 className="fw-bold display-5 mb-0">
                    Why Our Service Is The Perfect Choice?
                  </h1>
                  <div className="heading-underline mt-3"></div>
                </div>
              </div>

              {/* 01. Lorem Ipsum */}
              <div className="col d-flex">
                <div className="p-4 text-white text-start description-box d-flex flex-column justify-content-center">
                  <h3 className="fw-semibold fs-3 mb-2">
                    <span className="number-prefix">01.</span>
                    <h1>Expert Guidance, Every Step</h1>
                  </h3>
                  <p className="mb-0">
                   Navigating the real estate market can be complex. Our team brings unparalleled expertise, offering insightful adviceg.
                  </p>
                </div>
              </div>

              {/* 02. Lorem Ipsum */}
              <div className="col d-flex">
                <div className="p-4 text-white text-start description-box d-flex flex-column justify-content-center">
                  <h3 className="fw-semibold fs-3 mb-2">
                    <span className="number-prefix">02.</span>
                    <h1>Personalized Service, Tailored to You</h1>
                  </h3>
                  <p className="mb-0">
                   We believe real estate isn't one-size-fits-all. We take the time to understand your unique needs, preferences.
                  </p>
                </div>
              </div>

              {/* 03. Lorem Ipsum */}
              <div className="col d-flex">
                <div className="p-4 text-white text-start description-box d-flex flex-column justify-content-center">
                  <h3 className="fw-semibold fs-3 mb-2">
                    <span className="number-prefix">03.</span>
                    <h1> Seamless Process, Superior Results</h1>
                  </h3>
                  <p className="mb-0">
                    Forget the stress and uncertainty. We streamline every aspect of your real estate journey, leveraging cutting-edge technology.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="col-lg-4 d-flex">
            <div className="card p-4 shadow rounded-3 flex-grow-1">
              <h4 className="card-title mb-4 text-start " style={{ borderBottom: '2px solid #e0e0e0', paddingBottom: '10px', fontWeight: '200'}}>
                Real Estate Inquiry Form
              </h4>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="inquiryType" className="form-label" style={{ fontWeight: '500', color: 'black' }}>
                    Inquiry Type
                  </label>
                  <select className="form-select rounded-1" id="inquiryType" value={formData.inquiryType} onChange={handleChange}>
                    <option value="Renting Property">Renting Property</option>
                    <option value="Buying Property">Buying Property</option>
                    <option value="Selling Property">Selling Property</option>
                    <option value="Other">Other</option>
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
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    style={{ color: '#A4A4A4' }}
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
                    value={formData.email}
                    onChange={handleChange}
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
                    value={formData.phone}
                    onChange={handleChange}
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
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    style={{ color: '#A4A4A4' }}
                    placeholder="Please Enter Your Message"
                  ></textarea>
                </div>
                <div className="d-flex justify-content-end">
                  <button
                    type="submit"
                    className="btn btn-primary rounded-1 shadow-sm"
                    style={{ width: "50%" }}
                    disabled={submissionStatus === 'submitting'}
                  >
                    {submissionStatus === 'submitting' ? 'Submitting...' : 'Submit'}
                  </button>
                </div>
                {submissionStatus === 'success' && (
                  <div className="alert alert-success mt-3" role="alert">
                    Inquiry submitted successfully!
                  </div>
                )}
                {submissionStatus === 'error' && (
                  <div className="alert alert-danger mt-3" role="alert">
                    Failed to submit inquiry. Please try again.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InquiryForm1;