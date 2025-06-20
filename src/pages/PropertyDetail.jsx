import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Import useParams to get ID from URL
import axios from "axios"; // Import axios for making API requests
import { Card, Button, Form, Image, Row, Col, Spinner, Alert } from "react-bootstrap"; // Added Spinner, Alert for loading/error
import { ChevronLeft, ChevronRight } from "react-bootstrap-icons";
import Footer from "../components/Footer";
import FeaturedListing from "../components/FeatureListing"; // Assuming this is correct
import Newsletter from "../components/Newsletter";
import Header from "../components/Header";
import { SlCalender } from "react-icons/sl";
import { RiHome9Line, RiRuler2Line } from "react-icons/ri";
import { IoBedOutline, IoCarOutline } from "react-icons/io5";
import { PiShower } from "react-icons/pi";

// --- Styling Constants (can be moved to a CSS module or styled-components) ---
const sectionCardStyles = {
  borderRadius: '15px',
  border: 'none',
  paddingTop: '20px',
  marginBottom: '20px',
};

const sectionHeaderStyles = {
  backgroundColor: '#f5f5f5',
};

const mainImageStyles = {
  height: "100%",
  width: "100%",
  objectFit: "cover",
  minHeight: "400px",
  border: "none",
};

const thumbnailImageStyles = {
  height: "60px",
  width: "80px",
  objectFit: "cover",
  border: "none",
  borderRadius: "6px",
};

const formCardStyles = {
  backgroundColor: 'white',
  borderRadius: '12px',
  padding: '24px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
  maxWidth: '550px',
  margin: '0 auto',
  border: 'none',
};

const formInputStyles = {
  border: "none",
  backgroundColor: "#f8f9fa",
};

const featureBulletStyles = {
  width: '18px',
  height: '18px',
  backgroundColor: '#007bff',
  color: 'white',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '11px',
  lineHeight: 1,
  position: 'relative',
  top: '1.97px',
  left: '1.97px',
};

// --- Reusable Property Section Component ---
const PropertySection = ({ title, children }) => (
  <div className="card shadow-sm mt-4" style={sectionCardStyles}>
    <div className="card-body p-0 bg-white">
      <div>
        <div style={sectionHeaderStyles} className="px-4 py-3">
          <h5 className="mb-0 fw-bold">{title}</h5>
        </div>
        <div className="px-4 py-3 bg-white">
          {children}
        </div>
      </div>
    </div>
  </div>
);

// --- PropertyDetail Component ---
const PropertyDetail = () => {
  const { id } = useParams(); // Get the property ID from the URL
  const [property, setProperty] = useState(null); // State to store fetched property data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [mainImageIndex, setMainImageIndex] = useState(0); // For image carousel

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  // Example static data for features (as requested)
  const staticFeatures = [
    'Air Conditioning', 'External Yard', 'Dryer', 'Gym', 'Laundry', 'Shared gym',
    'Kitchen Appliances', 'Outdoor Shower', 'Two Refrigerators', 'TV Cable', 'Washer'
  ];

  // Fetch property data on component mount or when ID changes
  useEffect(() => {
    const fetchProperty = async (id) => {
      try {
        setLoading(true); // Start loading
        const response = await axios.get(`http://localhost:8000/api/properties/getPropertyById/${id}`);
        console.log('Fetched Property Data:', response.data.property); // Log the fetched data
        setProperty(response.data.property); // Set the fetched property data
        setError(null); // Clear any previous errors
      } catch (err) {
        console.error("Error fetching property details:", err);
        setError("Failed to load property details. Please try again.");
        setProperty(null); // Clear property data on error
      } finally {
        setLoading(false); // End loading
      }
    };

    if (id) {
      fetchProperty();
    }
  }, [id]); // Re-run effect if ID changes

  // Handler for image carousel navigation
  const handleNextImage = () => {
    if (property && property.images && property.images.length > 0) {
      setMainImageIndex((prevIndex) =>
        prevIndex === property.images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const handlePrevImage = () => {
    if (property && property.images && property.images.length > 0) {
      setMainImageIndex((prevIndex) =>
        prevIndex === 0 ? property.images.length - 1 : prevIndex - 1
      );
    }
  };

  // Handlers for inquiry form
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would send this data to a backend API
    console.log("Inquiry submitted:", formData);
    alert("Your inquiry has been submitted successfully!");
    // Reset form after submission
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  // --- Render Loading State ---
  if (loading) {
    return (
      <>
        <Header />
        <div className="container-fluid px-5 py-5 text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <p className="mt-2">Loading property details...</p>
        </div>
        <FeaturedListing />
        <Newsletter />
        <Footer />
      </>
    );
  }

  // --- Render Error State ---
  if (error) {
    return (
      <>
        <Header />
        <div className="container-fluid px-5 py-5 text-center">
          <Alert variant="danger">{error}</Alert>
          <p>Please try again later or contact support.</p>
        </div>
        <FeaturedListing />
        <Newsletter />
        <Footer />
      </>
    );
  }

  // --- Render Not Found State (if no property is returned and no error) ---
  if (!property) {
    return (
      <>
        <Header />
        <div className="container-fluid px-5 py-5 text-center">
          <Alert variant="info">Property not found.</Alert>
          <p>The property you are looking for might not exist or has been removed.</p>
        </div>
        <FeaturedListing />
        <Newsletter />
        <Footer />
      </>
    );
  }

  // Destructure property data for easier access
  // Provide fallbacks for data that might be missing from the API response
  const {
    title = "Property Title Not Available",
    price = 0,
    city = "N/A",
    state = "N/A",
    description = "No description available.",
    type = "N/A", // Maps to Property Type
    size = "N/A",
    bedroom = "N/A", // Renamed from bedrooms to match backend
    bathroom = "N/A", // Renamed from bathrooms to match backend
    garage = "N/A",
    year = "N/A", // Maps to Year Built
    address = "N/A",
    zip_code = "N/A", // Renamed from zipCode to match backend
    city_area = "N/A", // Renamed from area to match backend
    country = "N/A",
    image: mainImage = null, // The single image URL from backend
    listingType = "N/A", // 'For Rent' or 'For Sale'
    // Assuming if the backend returns a single image, you convert it to an array here
    // Or, if your backend sends an array of images directly, use `property.images`
  } = property;

  // IMPORTANT: Backend currently sends a single 'image' URL.
  // We need to decide if we want to support multiple images for carousel.
  // For now, if 'image' is a string, make it an array for the carousel.
  const propertyImages = (mainImage && typeof mainImage === 'string') ? [mainImage] : [];
  // If your backend *actually* returns an 'images' array, you can use:
  // const propertyImages = property.images && property.images.length > 0 ? property.images : [mainImage || 'placeholder_url'];
  // If `property.image` is the only image, then `propertyImages` will have one element.
  // If you later implement multiple images on the backend, ensure they come in an array.


  return (
    <>
      <Header />
      <div className="container-fluid px-5">
        <Card className="shadow-sm w-100" style={{ backgroundColor: "#F3F3F3", border: "none" }}>
          <Card.Body className="p-4">
            <div className="d-flex justify-content-between align-items-start mb-4">
              <div>
                <h2 className="fw-bold mb-1">{title}</h2>
                <p className="text-muted mb-3 d-flex align-items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10.41"
                    height="14.57"
                    viewBox="0 0 384 512"
                    fill="#6c757d"
                  >
                    <path d="M168 0C75.2 0 0 75.2 0 168c0 87.7 132.9 308.6 152.2 337.4 4.6 6.8 12.3 10.6 20.3 10.6s15.7-3.9 20.3-10.6C251.1 476.6 384 255.7 384 168 384 75.2 308.8 0 216 0zm0 240c-39.8 0-72-32.2-72-72s32.2-72 72-72 72 32.2 72 72-32.2 72-72 72z" />
                  </svg>
                  {city}, {state}
                </p>
                <div className="d-flex gap-2 mb-2">
                  <span
                    style={{
                      width: '77.34px',
                      height: '30.82px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '5.91px',
                      borderRadius: '5.32px',
                      padding: '5.91px',
                      backgroundColor: '#94A0DF',
                      color: 'white',
                      fontSize: '12px',
                      fontWeight: '500',
                      textTransform: 'uppercase'
                    }}
                  >
                    {listingType} {/* Dynamic listing type */}
                  </span>
                  {/* Keep FEATURED static for now if it's not a dynamic field */}
                  <span
                    style={{
                      width: '77.34px',
                      height: '30.82px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '5.91px',
                      borderRadius: '5.32px',
                      padding: '5.91px',
                      backgroundColor: '#429283',
                      color: 'white',
                      fontSize: '12px',
                      fontWeight: '500',
                      textTransform: 'uppercase'
                    }}
                  >
                    FEATURED
                  </span>
                </div>
              </div>

              <div className="text-end">
                <h3
                  className="fw-bold mb-0"
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 100,
                    fontSize: '25px',
                    lineHeight: '28px',
                    letterSpacing: '0.5px',
                    marginTop: '20px'
                  }}
                >
                  ${price?.toLocaleString() || 'Price N/A'} {/* Format price */}
                </h3>
              </div>
            </div>

            <Row>
              {/* Left Column - Image Section */}
              <Col md={7} className="mb-4 mb-md-0">
                <div className="position-relative mb-3">
                  <Image
                    src={propertyImages[mainImageIndex] || 'https://via.placeholder.com/800x600?text=No+Image'}
                    alt={title}
                    fluid
                    className="rounded"
                    style={mainImageStyles}
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/800x600?text=Image+Not+Available'; }}
                  />
                  {propertyImages.length > 1 && ( // Only show buttons if there's more than one image
                    <>
                      <Button
                        variant="light"
                        className="position-absolute top-50 start-0 translate-middle-y rounded-circle p-2"
                        onClick={handlePrevImage}
                        style={{ left: "10px" }}
                      >
                        <ChevronLeft size={20} />
                      </Button>
                      <Button
                        variant="light"
                        className="position-absolute top-50 end-0 translate-middle-y rounded-circle p-2"
                        onClick={handleNextImage}
                        style={{ right: "10px" }}
                      >
                        <ChevronRight size={20} />
                      </Button>
                    </>
                  )}
                </div>

                <div className="position-relative">
                  <div className="d-flex overflow-auto py-2 thumbnail-scroll">
                    {propertyImages.map((img, index) => (
                      <div
                        key={index}
                        className="me-2 cursor-pointer"
                        onClick={() => setMainImageIndex(index)}
                        style={{ minWidth: "80px" }}
                      >
                        <Image
                          src={img}
                          alt={`Thumbnail ${index + 1}`}
                          className={mainImageIndex === index ? "border border-primary" : ""}
                          style={{ ...thumbnailImageStyles, opacity: mainImageIndex === index ? 1 : 0.7 }}
                          onError={(e) => { e.target.src = 'https://via.placeholder.com/80x60?text=Thumb'; }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </Col>

              {/* Right Column - Inquiry Form */}
              <Col md={5}>
                <div style={formCardStyles}>
                  <h4 className="fw-bold mb-2">Submit an inquiry</h4>
                  <div
                    style={{
                      width: '60px',
                      height: '3px',
                      backgroundColor: '#2495FD',
                      borderRadius: '2px',
                      marginBottom: '24px'
                    }}
                  ></div>

                  <div className="d-flex align-items-center mb-4">
                    <Image
                      src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                      roundedCircle
                      width={50}
                      height={50}
                      className="me-3"
                      alt="Martha Stewart, Property Consultant"
                    />
                    <div>
                      <h6 className="mb-0 fw-bold">Martha Stewart</h6>
                      <small className="text-muted">Property Consultant</small>
                    </div>
                  </div>

                  <Form onSubmit={handleFormSubmit}>
                    <Form.Group className="mb-3" controlId="formName">
                      <Form.Label className="fw-bold">Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="John Doe"
                        name="name"
                        value={formData.name}
                        onChange={handleFormChange}
                        style={formInputStyles}
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formEmail">
                      <Form.Label className="fw-bold">Email</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="email@domain.com"
                        name="email"
                        value={formData.email}
                        onChange={handleFormChange}
                        style={formInputStyles}
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPhone">
                      <Form.Label className="fw-bold">Phone (Optional)</Form.Label>
                      <Form.Control
                        type="tel"
                        placeholder="+1 (123) 456-0509"
                        name="phone"
                        value={formData.phone}
                        onChange={handleFormChange}
                        style={formInputStyles}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formMessage">
                      <Form.Label className="fw-bold">Message</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Please Enter Your Message"
                        name="message"
                        value={formData.message}
                        onChange={handleFormChange}
                        style={{ ...formInputStyles, resize: "none" }}
                        required
                      />
                    </Form.Group>

                    <Button
                      type="submit"
                      className="w-100 fw-bold py-2 border-0"
                      style={{ backgroundColor: '#2495FD', color: 'white' }}
                    >
                      Submit
                    </Button>
                  </Form>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Property Listing Details Sections */}

        {/* Overview Section */}
        <PropertySection title="Overview">
          <Row className="g-3">
            <Col xs={6} md={4} lg={2} className="d-flex flex-column">
              <small className="text-muted d-block">Property Type</small>
              <span className="fw-medium d-flex align-items-center">{type}</span>
            </Col>
            <Col xs={6} md={4} lg={2} className="d-flex flex-column">
              <small className="text-muted d-block">Year Built</small>
              <span className="fw-medium d-flex align-items-center"><SlCalender className="me-1" size={18} />{year}</span>
            </Col>
            <Col xs={6} md={4} lg={2} className="d-flex flex-column">
              <small className="text-muted d-block">Size</small>
              <span className="fw-medium d-flex align-items-center"><RiRuler2Line className="me-1" size={18} />{size} m²</span>
            </Col>
            <Col xs={6} md={4} lg={2} className="d-flex flex-column">
              <small className="text-muted d-block">Bedrooms</small>
              <span className="fw-medium d-flex align-items-center"><IoBedOutline className="me-1" size={18} />{bedroom}</span>
            </Col>
            <Col xs={6} md={4} lg={2} className="d-flex flex-column">
              <small className="text-muted d-block">Bathrooms</small>
              <span className="fw-medium d-flex align-items-center"><PiShower className="me-1" size={18} />{bathroom}</span>
            </Col>
            <Col xs={6} md={4} lg={2} className="d-flex flex-column">
              <small className="text-muted d-block">Garage</small>
              <span className="fw-medium d-flex align-items-center"><IoCarOutline className="me-1" size={18} />{garage}</span>
            </Col>
          </Row>
        </PropertySection>

        {/* Address Section */}
        <PropertySection title="Address">
          <Row className="mb-3">
            <Col md={3}><small className="text-muted fw-bold">Address</small></Col>
            <Col md={3}><span className="fw-medium">{address}</span></Col>
            <Col md={3}><small className="text-muted fw-bold">Zip/Postal Code</small></Col>
            <Col md={3}><span className="fw-medium">{zip_code}</span></Col>
          </Row>
          <Row className="mb-3">
            <Col md={3}><small className="text-muted fw-bold">City</small></Col>
            <Col md={3}><span className="fw-medium">{city}</span></Col>
            <Col md={3}><small className="text-muted fw-bold">Area</small></Col>
            <Col md={3}><span className="fw-medium">{city_area}</span></Col>
          </Row>
          <Row>
            <Col md={3}><small className="text-muted fw-bold">State/County</small></Col>
            <Col md={3}><span className="fw-medium">{state}</span></Col>
            <Col md={3}><small className="text-muted fw-bold">Country</small></Col>
            <Col md={3}><span className="fw-medium">{country}</span></Col>
          </Row>
        </PropertySection>

        {/* Description Section */}
        <PropertySection title="Description">
          <p className="mb-0 text-justify lh-base">{description}</p>
        </PropertySection>

        {/* Details Section */}
        <PropertySection title="Details">
          <Row className="g-3">
            <Col xs={6} md={3}><small className="text-muted fw-bold">Property ID</small></Col>
            <Col xs={6} md={3}><span className="fw-medium">{id}</span></Col> {/* Using the URL ID */}
            <Col xs={6} md={3}><small className="text-muted fw-bold">Property Size</small></Col>
            <Col xs={6} md={3}><span className="fw-medium">{size} m²</span></Col>
            <Col xs={6} md={3}><small className="text-muted fw-bold">Property Type</small></Col>
            <Col xs={6} md={3}><span className="fw-medium">{type}</span></Col>
            <Col xs={6} md={3}><small className="text-muted fw-bold">Property Status</small></Col>
            <Col xs={6} md={3}><span className="fw-medium">For Rent</span></Col> {/* Kept static as requested */}
            <Col xs={6} md={3}><small className="text-muted fw-bold">Bedrooms</small></Col>
            <Col xs={6} md={3}><span className="fw-medium">{bedroom}</span></Col>
            <Col xs={6} md={3}><small className="text-muted fw-bold">Bathrooms</small></Col>
            <Col xs={6} md={3}><span className="fw-medium">{bathroom}</span></Col>
          </Row>
        </PropertySection>

        {/* Features Section - Using static data as requested */}
        <PropertySection title="Features">
          <Row className="g-2">
            {staticFeatures.map((feature) => (
              <Col key={feature} xs={12} sm={6} md={4} lg={3}>
                <div className="d-flex align-items-center">
                  <div style={featureBulletStyles} className="me-2">
                    ✓
                  </div>
                  <span className="fw-medium">{feature}</span>
                </div>
              </Col>
            ))}
          </Row>
        </PropertySection>

      </div>
      <FeaturedListing />
      <Newsletter />
      <Footer />
    </>
  );
};

export default PropertyDetail;