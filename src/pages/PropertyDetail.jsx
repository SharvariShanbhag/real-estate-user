// // // src/pages/PropertyDetail.jsx
// // import React, { useState, useEffect, useCallback } from "react";
// // // Import useLocation and useNavigate from react-router-dom
// // import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
// // import axios from "axios";
// // import { Card, Button, Form, Image, Row, Col, Spinner, Alert } from "react-bootstrap";
// // import { ChevronLeft, ChevronRight } from "react-bootstrap-icons";
// // import Footer from "../components/Footer";
// // import FeaturedListing from "../components/FeatureListing";
// // import Newsletter from "../components/Newsletter";
// // import Header from "../components/Header";
// // import { SlCalender } from "react-icons/sl";
// // import { RiHome9Line, RiRuler2Line } from "react-icons/ri";
// // import { IoBedOutline, IoCarOutline } from "react-icons/io5";
// // import { PiShower } from "react-icons/pi";
// // import { useAuth } from '../context/AuthContext'; // Import useAuth hook

// // // --- Styling Constants ---
// // const sectionCardStyles = {
// //     borderRadius: '15px',
// //     border: 'none',
// //     paddingTop: '20px',
// //     marginBottom: '20px',
// // };

// // const sectionHeaderStyles = {
// //     backgroundColor: '#f5f5f5',
// // };

// // const formCardStyles = {
// //     backgroundColor: 'white',
// //     borderRadius: '12px',
// //     padding: '24px',
// //     boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
// //     maxWidth: '550px',
// //     margin: '0 auto',
// //     border: 'none',
// // };

// // const formInputStyles = {
// //     border: "none",
// //     backgroundColor: "#f8f9fa",
// // };

// // const featureBulletStyles = {
// //     width: '18px',
// //     height: '18px',
// //     backgroundColor: '#007bff',
// //     color: 'white',
// //     borderRadius: '50%',
// //     display: 'flex',
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //     fontSize: '11px',
// //     lineHeight: 1,
// //     position: 'relative',
// //     top: '1.97px',
// //     left: '1.97px',
// // };

// // // --- Reusable Property Section Component ---
// // const PropertySection = ({ title, children }) => (
// //     <div className="card shadow-sm mt-4" style={sectionCardStyles}>
// //         <div className="card-body p-0 bg-white">
// //             <div>
// //                 <div style={sectionHeaderStyles} className="px-4 py-3">
// //                     <h5 className="mb-0 fw-bold">{title}</h5>
// //                 </div>
// //                 <div className="px-4 py-3 bg-white">
// //                     {children}
// //                 </div>
// //             </div>
// //         </div>
// //     </div>
// // );

// // // --- PropertyDetail Component ---
// // const PropertyDetail = () => {
// //     const { id } = useParams(); // Get the property ID from the URL
// //     // --- MODIFICATION: Destructure 'logout' from useAuth hook ---
// //     const { isAuthenticated, user, authLoading, logout } = useAuth(); // Use auth context
// //     const navigate = useNavigate(); // Initialize useNavigate hook
// //     const location = useLocation(); // Initialize useLocation hook to get current path

// //     const [property, setProperty] = useState(null);
// //     const [loading, setLoading] = useState(true);
// //     const [error, setError] = useState(null);
// //     const [mainImageIndex, setMainImageIndex] = useState(0);

// //     // State for form fields
// //     const [inquiryName, setInquiryName] = useState('');
// //     const [inquiryEmail, setInquiryEmail] = useState('');
// //     const [inquiryPhone, setInquiryPhone] = useState('');
// //     const [inquiryMessage, setInquiryMessage] = useState('');

// //     const [inquiryStatus, setInquiryStatus] = useState({ type: null, message: '' }); // For inquiry success/error

// //     const staticFeatures = [
// //         'Air Conditioning', 'External Yard', 'Dryer', 'Gym', 'Laundry', 'Shared gym',
// //         'Kitchen Appliances', 'Outdoor Shower', 'Two Refrigerators', 'TV Cable', 'Washer'
// //     ];

// //     // Effect to populate form fields when user status changes
// //     useEffect(() => {
// //         if (user && isAuthenticated) { // Only set if authenticated
// //             setInquiryName(user.name || '');
// //             setInquiryEmail(user.email || '');
// //             // NOTE: The 'phone' property on the 'user' object from the backend response was causing issues earlier.
// //             // If your backend's /auth/me endpoint doesn't return 'phone' for the user,
// //             // this line will set inquiryPhone to undefined.
// //             // It's already marked as readOnly, so if it's undefined, it will just show an empty field.
// //             setInquiryPhone(user.phone || ''); 
// //             setInquiryMessage(''); // Clear message when user logs in to a new detail page
// //         } else {
// //             // Clear fields if user logs out or is not logged in initially
// //             setInquiryName('');
// //             setInquiryEmail('');
// //             setInquiryPhone('');
// //             setInquiryMessage('');
// //         }
// //     }, [user, isAuthenticated]); // Dependency on user and isAuthenticated

// //     // Memoized function for fetching property data
// //     const fetchProperty = useCallback(async () => {
// //         if (!id) {
// //             console.error("PropertyDetail: Property ID is missing from the URL. Cannot fetch details.");
// //             setError("Property ID is missing. Please go back and select a property.");
// //             setLoading(false);
// //             return;
// //         }

// //         setLoading(true);
// //         setError(null);
// //         try {
// //             const response = await axios.get(`http://localhost:8000/api/properties/${id}`);
// //             console.log('Fetched Property Data:', response.data.property);
// //             setProperty(response.data.property);
// //             setError(null);
// //         } catch (err) {
// //             console.error("PropertyDetail: Error fetching property details:", err);
// //             if (err.response && err.response.status === 404) {
// //                 setError("Property not found. It might have been removed or does not exist.");
// //             } else {
// //                 setError(err.response?.data?.message || err.message || 'Failed to load property details. Please check your internet connection and try again.');
// //             }
// //             setProperty(null);
// //         } finally {
// //             setLoading(false);
// //         }
// //     }, [id]);

// //     useEffect(() => {
// //         fetchProperty();
// //     }, [fetchProperty]);

// //     // Handler for image carousel navigation
// //     const handleNextImage = () => {
// //         if (property && property.images && property.images.length > 0) {
// //             setMainImageIndex((prevIndex) =>
// //                 prevIndex === property.images.length - 1 ? 0 : prevIndex + 1
// //             );
// //         }
// //     };

// //     const handlePrevImage = () => {
// //         if (property && property.images && property.images.length > 0) {
// //             setMainImageIndex((prevIndex) =>
// //                 prevIndex === 0 ? property.images.length - 1 : prevIndex - 1
// //             );
// //         }
// //     };

// //     // Handler for inquiry form submission
// //     const handleInquirySubmit = async (e) => {
// //         e.preventDefault();
// //         setInquiryStatus({ type: null, message: '' }); // Clear previous status

// //         if (!isAuthenticated) {
// //             setInquiryStatus({ type: 'danger', message: 'You must be logged in to submit an inquiry.' });
// //             return; // This check is mostly defensive as the form is conditionally rendered
// //         }

// //         if (!property || !property.id) {
// //             setInquiryStatus({ type: 'danger', message: 'Could not find property ID for inquiry.' });
// //             return;
// //         }

// //         const payload = {
// //             name: inquiryName,
// //             email: inquiryEmail,
// //             phone: inquiryPhone,
// //             message: inquiryMessage,
// //             propertyId: property.id,
// //         };
// //         console.log("Frontend sending inquiry payload:", payload);
// //         try {
// //             const response = await axios.post('http://localhost:8000/api/inquiries/submit', payload);

// //             console.log("Inquiry submitted successfully:", response.data);
// //             setInquiryStatus({ type: 'success', message: response.data.message });
// //             setInquiryMessage(''); // Clear message field

// //         } catch (err) {
// //             console.error("Error submitting inquiry:", err);
// //             const errorMessage = err.response?.data?.message || err.message || 'Failed to submit inquiry. Please try again.';
// //             setInquiryStatus({ type: 'danger', message: errorMessage });
// //         }
// //     };

// //     // --- NEW: Handle Logout ---
// //     const handleLogout = () => {
// //         logout(); // Call the logout function from AuthContext
// //         // No need to navigate here, as the isAuthenticated change will re-render
// //         // the component and show the "Login to Inquire" section naturally.
// //     };

// //     // --- Render Loading State ---
// //     // Wait for both property data and authentication status to load
// //     if (loading || authLoading) {
// //         return (
// //             <>
// //                 <Header />
// //                 <div className="container-fluid px-5 py-5 text-center">
// //                     <Spinner animation="border" role="status">
// //                         <span className="visually-hidden">Loading...</span>
// //                     </Spinner>
// //                     <p className="mt-2">Loading property details...</p>
// //                 </div>
// //                 <FeaturedListing />
// //                 <Newsletter />
// //                 <Footer />
// //             </>
// //         );
// //     }

// //     // --- Render Error State ---
// //     if (error) {
// //         return (
// //             <>
// //                 <Header />
// //                 <div className="container-fluid px-5 py-5 text-center">
// //                     <Alert variant="danger">{error}</Alert>
// //                     <p>Please try again later or contact support if the problem persists.</p>
// //                 </div>
// //                 <FeaturedListing />
// //                 <Newsletter />
// //                 <Footer />
// //             </>
// //         );
// //     }

// //     // --- Render Not Found State (if no property is returned and no error) ---
// //     if (!property) {
// //         return (
// //             <>
// //                 <Header />
// //                 <div className="container-fluid px-5 py-5 text-center">
// //                     <Alert variant="info">Property not found.</Alert>
// //                     <p>The property you are looking for might not exist or has been removed.</p>
// //                 </div>
// //                 <FeaturedListing />
// //                 <Newsletter />
// //                 <Footer />
// //             </>
// //         );
// //     }

// //     // Destructure property data for easier access
// //     const {
// //         title = "Property Title Not Available",
// //         price = 0,
// //         city = "N/A",
// //         state = "N/A",
// //         description = "No description available.",
// //         type = "N/A",
// //         size = "N/A",
// //         bedroom = "N/A",
// //         bathroom = "N/A",
// //         garage = "N/A",
// //         year = "N/A",
// //         address = "N/A",
// //         zip_code = "N/A",
// //         city_area = "N/A",
// //         country = "N/A",
// //         image: mainImage = null, // The single image URL from backend
// //         listingType = "N/A",
// //     } = property;

// //     // Prioritize an 'images' array if it exists in property. If not, use the single 'image'.
// //     const propertyImages = (property.images && property.images.length > 0)
// //         ? property.images.map(imgName => `http://localhost:8000/uploads/${imgName}`)
// //         : (mainImage && typeof mainImage === 'string')
// //             ? [`http://localhost:8000/uploads/${mainImage}`]
// //             : ['https://via.placeholder.com/800x600?text=No+Image'];


// //     return (
// //         <>
// //             <Header />
// //             <div className="container-fluid px-5">
// //                 <Card className="shadow-sm w-100" style={{ backgroundColor: "#F3F3F3", border: "none" }}>
// //                     <Card.Body className="p-4">
// //                         <div className="d-flex justify-content-between align-items-start mb-4">
// //                             <div>
// //                                 <h2 className="fw-bold mb-1">{title}</h2>
// //                                 <p className="text-muted mb-3 d-flex align-items-center gap-1">
// //                                     <svg
// //                                         xmlns="http://www.w3.org/2000/svg"
// //                                         width="10.41"
// //                                         height="14.57"
// //                                         viewBox="0 0 384 512"
// //                                         fill="#6c757d"
// //                                     >
// //                                         <path d="M168 0C75.2 0 0 75.2 0 168c0 87.7 132.9 308.6 152.2 337.4 4.6 6.8 12.3 10.6 20.3 10.6s15.7-3.9 20.3-10.6C251.1 476.6 384 255.7 384 168 384 75.2 308.8 0 216 0zm0 240c-39.8 0-72-32.2-72-72s32.2-72 72-72 72 32.2 72 72-32.2 72-72 72z" />
// //                                     </svg>
// //                                     {city}, {state}
// //                                 </p>
// //                                 <div className="d-flex gap-2 mb-2">
// //                                     <span
// //                                         style={{
// //                                             width: '77.34px',
// //                                             height: '30.82px',
// //                                             display: 'inline-flex',
// //                                             alignItems: 'center',
// //                                             justifyContent: 'center',
// //                                             gap: '5.91px',
// //                                             borderRadius: '5.32px',
// //                                             padding: '5.91px',
// //                                             backgroundColor: '#94A0DF',
// //                                             color: 'white',
// //                                             fontSize: '12px',
// //                                             fontWeight: '500',
// //                                             textTransform: 'uppercase'
// //                                         }}
// //                                     >
// //                                         {listingType}
// //                                     </span>
// //                                     <span
// //                                         style={{
// //                                             width: '77.34px',
// //                                             height: '30.82px',
// //                                             display: 'inline-flex',
// //                                             alignItems: 'center',
// //                                             justifyContent: 'center',
// //                                             gap: '5.91px',
// //                                             borderRadius: '5.32px',
// //                                             padding: '5.91px',
// //                                             backgroundColor: '#429283',
// //                                             color: 'white',
// //                                             fontSize: '12px',
// //                                             fontWeight: '500',
// //                                             textTransform: 'uppercase'
// //                                         }}
// //                                     >
// //                                         FEATURED
// //                                     </span>
// //                                 </div>
// //                             </div>

// //                             <div className="text-end">
// //                                 <h3
// //                                     className="fw-bold mb-0"
// //                                     style={{
// //                                         fontFamily: "'Poppins', sans-serif",
// //                                         fontWeight: 100,
// //                                         fontSize: '25px',
// //                                         lineHeight: '28px',
// //                                         letterSpacing: '0.5px',
// //                                         marginTop: '20px'
// //                                     }}
// //                                 >
// //                                     ${price?.toLocaleString() || 'Price N/A'}
// //                                 </h3>
// //                             </div>
// //                         </div>

// //                         <Row>
// //                             {/* Left Column - Image Section */}
// //                             <Col md={7} className="mb-4 mb-md-0">
// //                                 <div className="position-relative mb-3">
// //                                     <Image
// //                                         src={propertyImages[mainImageIndex]}
// //                                         alt={title}
// //                                         fluid
// //                                         className="rounded"
// //                                         style={{
// //                                             width: "100%",
// //                                             maxWidth: "100%",
// //                                             height: "auto",
// //                                             objectFit: "cover",
// //                                             maxHeight: "500px",
// //                                             minHeight: "300px",
// //                                             border: "none",
// //                                             borderRadius: "8px",
// //                                         }}
// //                                         onError={(e) => { e.target.src = 'https://via.placeholder.com/800x600?text=Image+Not+Available'; }}
// //                                     />
// //                                     {propertyImages.length > 1 && (
// //                                         <>
// //                                             <Button
// //                                                 variant="light"
// //                                                 className="position-absolute top-50 start-0 translate-middle-y rounded-circle p-2"
// //                                                 onClick={handlePrevImage}
// //                                                 style={{ left: "10px" }}
// //                                             >
// //                                                 <ChevronLeft size={20} />
// //                                             </Button>
// //                                             <Button
// //                                                 variant="light"
// //                                                 className="position-absolute top-50 end-0 translate-middle-y rounded-circle p-2"
// //                                                 onClick={handleNextImage}
// //                                                 style={{ right: "10px" }}
// //                                             >
// //                                                 <ChevronRight size={20} />
// //                                             </Button>
// //                                         </>
// //                                     )}
// //                                 </div>

// //                                 <div className="position-relative">
// //                                     <div className="d-flex overflow-auto py-2 thumbnail-scroll">
// //                                         {propertyImages.map((img, index) => (
// //                                             <div
// //                                                 key={index}
// //                                                 className="me-2 cursor-pointer"
// //                                                 onClick={() => setMainImageIndex(index)}
// //                                                 style={{ minWidth: "100px" }}
// //                                             >
// //                                                 <Image
// //                                                     src={img}
// //                                                     alt={`Thumbnail ${index + 1}`}
// //                                                     className={mainImageIndex === index ? "border border-primary" : ""}
// //                                                     style={{
// //                                                         width: "100px",
// //                                                         height: "75px",
// //                                                         objectFit: "cover",
// //                                                         border: "none",
// //                                                         borderRadius: "6px",
// //                                                         cursor: "pointer",
// //                                                         opacity: mainImageIndex === index ? 1 : 0.7
// //                                                     }}
// //                                                     onError={(e) => { e.target.src = 'https://via.placeholder.com/80x60?text=Thumb'; }}
// //                                                 />
// //                                             </div>
// //                                         ))}
// //                                     </div>
// //                                 </div>
// //                             </Col>

// //                             {/* Right Column - Inquiry Section (Conditional Rendering) */}
// //                             <Col md={5}>
// //                                 {isAuthenticated ? (
// //                                     // Show the inquiry form if authenticated
// //                                     <div style={formCardStyles}>
// //                                         <h4 className="fw-bold mb-2">Submit an Inquiry</h4>
// //                                         <div
// //                                             style={{
// //                                                 width: '60px',
// //                                                 height: '3px',
// //                                                 backgroundColor: '#2495FD',
// //                                                 borderRadius: '2px',
// //                                                 marginBottom: '24px'
// //                                             }}
// //                                         ></div>

// //                                         {inquiryStatus.message && (
// //                                             <Alert variant={inquiryStatus.type} className="mb-3">
// //                                                 {inquiryStatus.message}
// //                                             </Alert>
// //                                         )}

// //                                         <div className="d-flex align-items-center mb-4">
// //                                             <Image
// //                                                 src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
// //                                                 roundedCircle
// //                                                 width={50}
// //                                                 height={50}
// //                                                 className="me-3"
// //                                                 alt="User Profile"
// //                                             />
// //                                             <div>
// //                                                 <h6 className="mb-0 fw-bold">{user?.name || 'Guest User'}</h6>
// //                                                 <small className="text-muted">{user?.email || 'N/A'}</small>
// //                                             </div>
// //                                         </div>

// //                                         <Form onSubmit={handleInquirySubmit}>
// //                                             <Form.Group className="mb-3" controlId="formName">
// //                                                 <Form.Label className="fw-bold">Name</Form.Label>
// //                                                 <Form.Control
// //                                                     type="text"
// //                                                     name="name"
// //                                                     value={inquiryName}
// //                                                     onChange={(e) => setInquiryName(e.target.value)}
// //                                                     style={formInputStyles}
// //                                                     readOnly // Always read-only when authenticated as user's name/email/phone
// //                                                     required
// //                                                 />
// //                                             </Form.Group>

// //                                             <Form.Group className="mb-3" controlId="formEmail">
// //                                                 <Form.Label className="fw-bold">Email</Form.Label>
// //                                                 <Form.Control
// //                                                     type="email"
// //                                                     name="email"
// //                                                     value={inquiryEmail}
// //                                                     onChange={(e) => setInquiryEmail(e.target.value)}
// //                                                     style={formInputStyles}
// //                                                     readOnly // Always read-only when authenticated
// //                                                     required
// //                                                 />
// //                                             </Form.Group>

// //                                             <Form.Group className="mb-3" controlId="formPhone">
// //                                                 <Form.Label className="fw-bold">Phone (Optional)</Form.Label>
// //                                                 <Form.Control
// //                                                     type="tel"
// //                                                     name="phone"
// //                                                     value={inquiryPhone}
// //                                                     onChange={(e) => setInquiryPhone(e.target.value)}
// //                                                     style={formInputStyles}
// //                                                     readOnly // Always read-only when authenticated
// //                                                 />
// //                                             </Form.Group>

// //                                             <Form.Group className="mb-3" controlId="formMessage">
// //                                                 <Form.Label className="fw-bold">Message</Form.Label>
// //                                                 <Form.Control
// //                                                     as="textarea"
// //                                                     rows={3}
// //                                                     placeholder="Please Enter Your Message"
// //                                                     name="message"
// //                                                     value={inquiryMessage}
// //                                                     onChange={(e) => setInquiryMessage(e.target.value)}
// //                                                     style={{ ...formInputStyles, resize: "none" }}
// //                                                     required
// //                                                 />
// //                                             </Form.Group>

// //                                             <Button
// //                                                 type="submit"
// //                                                 className="w-100 fw-bold py-2 border-0 mb-2" // Added mb-2 for spacing
// //                                                 style={{ backgroundColor: '#2495FD', color: 'white' }}
// //                                             >
// //                                                 Submit Inquiry
// //                                             </Button>
// //                                             {/* --- NEW: Logout Button --- */}
// //                                             <Button
// //                                                 variant="outline-secondary" // Changed to outline for visual distinction
// //                                                 onClick={handleLogout}
// //                                                 className="w-100 fw-bold py-2"
// //                                             >
// //                                                 Logout
// //                                             </Button>
// //                                         </Form>
// //                                     </div>
// //                                 ) : (
// //                                     // Show "Login to Inquire" message if not authenticated
// //                                     <Card style={{ ...formCardStyles, textAlign: 'center', padding: '40px' }}>
// //                                         <Card.Body>
// //                                             <h4 className="fw-bold mb-3">Login to Inquire</h4>
// //                                             <p className="text-muted mb-4">Please log in to submit an inquiry about this property and connect with our consultant.</p>
// //                                             <Button
// //                                                 variant="primary"
// //                                                 size="lg"
// //                                                 // --- IMPORTANT: This passes the current path to the login page ---
// //                                                 onClick={() => navigate('/login', { state: { from: location.pathname } })}
// //                                                 className="w-75 fw-bold py-2"
// //                                                 style={{ backgroundColor: '#2495FD', color: 'white', border: 'none' }}
// //                                             >
// //                                                 Login Now
// //                                             </Button>
// //                                         </Card.Body>
// //                                     </Card>
// //                                 )}
// //                             </Col>
// //                         </Row>
// //                     </Card.Body>
// //                 </Card>

// //                 {/* Property Listing Details Sections */}

// //                 {/* Overview Section */}
// //                 <PropertySection title="Overview">
// //                     <Row className="g-3">
// //                         <Col xs={6} md={4} lg={2} className="d-flex flex-column">
// //                             <small className="text-muted d-block">Property Type</small>
// //                             <span className="fw-medium d-flex align-items-center">{type}</span>
// //                         </Col>
// //                         <Col xs={6} md={4} lg={2} className="d-flex flex-column">
// //                             <small className="text-muted d-block">Year Built</small>
// //                             <span className="fw-medium d-flex align-items-center"><SlCalender className="me-1" size={18} />{year}</span>
// //                         </Col>
// //                         <Col xs={6} md={4} lg={2} className="d-flex flex-column">
// //                             <small className="text-muted d-block">Size</small>
// //                             <span className="fw-medium d-flex align-items-center"><RiRuler2Line className="me-1" size={18} />{size} m²</span>
// //                         </Col>
// //                         <Col xs={6} md={4} lg={2} className="d-flex flex-column">
// //                             <small className="text-muted d-block">Bedrooms</small>
// //                             <span className="fw-medium d-flex align-items-center"><IoBedOutline className="me-1" size={18} />{bedroom}</span>
// //                         </Col>
// //                         <Col xs={6} md={4} lg={2} className="d-flex flex-column">
// //                             <small className="text-muted d-block">Bathrooms</small>
// //                             <span className="fw-medium d-flex align-items-center"><PiShower className="me-1" size={18} />{bathroom}</span>
// //                         </Col>
// //                         <Col xs={6} md={4} lg={2} className="d-flex flex-column">
// //                             <small className="text-muted d-block">Garage</small>
// //                             <span className="fw-medium d-flex align-items-center"><IoCarOutline className="me-1" size={18} />{garage}</span>
// //                         </Col>
// //                     </Row>
// //                 </PropertySection>
// //             </div>
// //             <FeaturedListing />
// //             <Newsletter />
// //             <Footer />
// //         </>
// //     );
// // };

// // export default PropertyDetail;




// // src/pages/PropertyDetail.jsx
// import React, { useState, useEffect, useCallback } from "react";
// import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";
// import { Card, Button, Form, Image, Row, Col, Spinner, Alert } from "react-bootstrap";
// import { ChevronLeft, ChevronRight } from "react-bootstrap-icons";
// import Footer from "../components/Footer";
// import FeaturedListing from "../components/FeatureListing";
// import Newsletter from "../components/Newsletter";
// import Header from "../components/Header";
// import { SlCalender } from "react-icons/sl";
// import { RiHome9Line, RiRuler2Line } from "react-icons/ri";
// import { IoBedOutline, IoCarOutline } from "react-icons/io5";
// import { PiShower } from "react-icons/pi";
// import { useAuth } from '../context/AuthContext'; // Import useAuth hook

// // --- Styling Constants ---
// const sectionCardStyles = {
//     borderRadius: '15px',
//     border: 'none',
//     paddingTop: '20px',
//     marginBottom: '20px',
// };

// const sectionHeaderStyles = {
//     backgroundColor: '#f5f5f5',
// };

// const formCardStyles = {
//     backgroundColor: 'white',
//     borderRadius: '12px',
//     padding: '24px',
//     boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
//     maxWidth: '550px',
//     margin: '0 auto',
//     border: 'none',
// };

// const formInputStyles = {
//     border: "none",
//     backgroundColor: "#f8f9fa",
// };

// const featureBulletStyles = {
//     width: '18px',
//     height: '18px',
//     backgroundColor: '#007bff',
//     color: 'white',
//     borderRadius: '50%',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     fontSize: '11px',
//     lineHeight: 1,
//     position: 'relative',
//     top: '1.97px',
//     left: '1.97px',
// };

// const mainImageStyles = { // Define main image styles here for consistency
//     height: "100%",
//     width: "100%",
//     objectFit: "cover",
//     minHeight: "400px",
//     border: "none",
// };

// const thumbnailImageStyles = { // Define thumbnail image styles here for consistency
//     height: "60px",
//     width: "80px",
//     objectFit: "cover",
//     border: "none",
//     borderRadius: "6px",
// };

// // --- Reusable Property Section Component ---
// const PropertySection = ({ title, children }) => (
//     <div className="card shadow-sm mt-4" style={sectionCardStyles}>
//         <div className="card-body p-0 bg-white">
//             <div>
//                 <div style={sectionHeaderStyles} className="px-4 py-3">
//                     <h5 className="mb-0 fw-bold">{title}</h5>
//                 </div>
//                 <div className="px-4 py-3 bg-white">
//                     {children}
//                 </div>
//             </div>
//         </div>
//     </div>
// );

// // --- PropertyDetail Component ---
// const PropertyDetail = () => {
//     const { id } = useParams();
//     const { isAuthenticated, user, authLoading, logout } = useAuth();
//     const navigate = useNavigate();
//     const location = useLocation();

//     const [property, setProperty] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [mainImageIndex, setMainImageIndex] = useState(0);

//     const [inquiryName, setInquiryName] = useState('');
//     const [inquiryEmail, setInquiryEmail] = useState('');
//     const [inquiryPhone, setInquiryPhone] = useState('');
//     const [inquiryMessage, setInquiryMessage] = useState('');

//     const [inquiryStatus, setInquiryStatus] = useState({ type: null, message: '' });

//     // Example static data for features
//     const staticFeatures = [
//         'Air Conditioning', 'External Yard', 'Dryer', 'Gym', 'Laundry', 'Shared gym',
//         'Kitchen Appliances', 'Outdoor Shower', 'Two Refrigerators', 'TV Cable', 'Washer'
//     ];

//     // Effect to populate form fields when user status changes
//     useEffect(() => {
//         if (user && isAuthenticated) {
//             setInquiryName(user.name || '');
//             setInquiryEmail(user.email || '');
//             setInquiryPhone(user.phone || ''); // Populate phone if available in user object
//             setInquiryMessage('');
//         } else {
//             setInquiryName('');
//             setInquiryEmail('');
//             setInquiryPhone('');
//             setInquiryMessage('');
//         }
//     }, [user, isAuthenticated]);

//     // Memoized function for fetching property data
//     const fetchProperty = useCallback(async () => {
//         if (!id) {
//             console.error("PropertyDetail: Property ID is missing from the URL. Cannot fetch details.");
//             setError("Property ID is missing. Please go back and select a property.");
//             setLoading(false);
//             return;
//         }

//         setLoading(true);
//         setError(null);
//         try {
//             // Adjust the API endpoint if needed.
//             // If your backend serves individual properties at `/api/properties/:id`, this is correct.
//             const response = await axios.get(`http://localhost:8000/api/properties/${id}`);
//             console.log('Fetched Property Data:', response.data.property);
//             setProperty(response.data.property);
//             setMainImageIndex(0); // Reset main image index when new property is loaded
//         } catch (err) {
//             console.error("PropertyDetail: Error fetching property details:", err);
//             if (err.response && err.response.status === 404) {
//                 setError("Property not found. It might have been removed or does not exist.");
//             } else {
//                 setError(err.response?.data?.message || err.message || 'Failed to load property details. Please check your internet connection and try again.');
//             }
//             setProperty(null);
//         } finally {
//             setLoading(false);
//         }
//     }, [id]);

//     useEffect(() => {
//         fetchProperty();
//     }, [fetchProperty]);

//     // Handler for image carousel navigation
//     const handleNextImage = () => {
//         // Ensure property and property.images are not null/undefined
//         if (property && property.images && property.images.length > 0) {
//             setMainImageIndex((prevIndex) =>
//                 prevIndex === property.images.length - 1 ? 0 : prevIndex + 1
//             );
//         }
//     };

//     const handlePrevImage = () => {
//         // Ensure property and property.images are not null/undefined
//         if (property && property.images && property.images.length > 0) {
//             setMainImageIndex((prevIndex) =>
//                 prevIndex === 0 ? property.images.length - 1 : prevIndex - 1
//             );
//         }
//     };

//     // Handler for inquiry form submission
//     const handleInquirySubmit = async (e) => {
//         e.preventDefault();
//         setInquiryStatus({ type: null, message: '' });

//         if (!isAuthenticated) {
//             setInquiryStatus({ type: 'danger', message: 'You must be logged in to submit an inquiry.' });
//             return;
//         }

//         if (!property || !property.id) {
//             setInquiryStatus({ type: 'danger', message: 'Could not find property ID for inquiry.' });
//             return;
//         }

//         const payload = {
//             name: inquiryName,
//             email: inquiryEmail,
//             phone: inquiryPhone,
//             message: inquiryMessage,
//             propertyId: property.id,
//         };
//         console.log("Frontend sending inquiry payload:", payload);
//         try {
//             const response = await axios.post('http://localhost:8000/api/inquiries/submit', payload);

//             console.log("Inquiry submitted successfully:", response.data);
//             setInquiryStatus({ type: 'success', message: response.data.message });
//             setInquiryMessage('');

//         } catch (err) {
//             console.error("Error submitting inquiry:", err);
//             const errorMessage = err.response?.data?.message || err.message || 'Failed to submit inquiry. Please try again.';
//             setInquiryStatus({ type: 'danger', message: errorMessage });
//         }
//     };

//     // --- Handle Logout ---
//     const handleLogout = () => {
//         logout();
//     };

//     // --- Render Loading State ---
//     if (loading || authLoading) {
//         return (
//             <>
//                 <Header />
//                 <div className="container-fluid px-5 py-5 text-center">
//                     <Spinner animation="border" role="status">
//                         <span className="visually-hidden">Loading...</span>
//                     </Spinner>
//                     <p className="mt-2">Loading property details...</p>
//                 </div>
//                 {/* Keep these components outside the conditional rendering for the main content */}
//                 <FeaturedListing />
//                 <Newsletter />
//                 <Footer />
//             </>
//         );
//     }

//     // --- Render Error State ---
//     if (error) {
//         return (
//             <>
//                 <Header />
//                 <div className="container-fluid px-5 py-5 text-center">
//                     <Alert variant="danger">{error}</Alert>
//                     <p>Please try again later or contact support.</p>
//                     <Button variant="primary" onClick={() => navigate('/properties')}>
//                         Back to Properties
//                     </Button>
//                 </div>
//                 <FeaturedListing />
//                 <Newsletter />
//                 <Footer />
//             </>
//         );
//     }

//     // --- Render Not Found State (if no property is returned and no error) ---
//     if (!property) {
//         return (
//             <>
//                 <Header />
//                 <div className="container-fluid px-5 py-5 text-center">
//                     <Alert variant="info">Property not found.</Alert>
//                     <p>The property you are looking for might not exist or has been removed.</p>
//                     <Button variant="primary" onClick={() => navigate('/properties')}>
//                         View All Properties
//                     </Button>
//                 </div>
//                 <FeaturedListing />
//                 <Newsletter />
//                 <Footer />
//             </>
//         );
//     }

//     // Destructure property data for easier access
//     const {
//         title = "Property Title Not Available",
//         price = 0,
//         city = "N/A",
//         state = "N/A",
//         description = "No description available.",
//         type = "N/A", // Maps to Property Type
//         size = "N/A",
//         bedroom = "N/A",
//         bathroom = "N/A",
//         garage = "N/A",
//         year = "N/A", // Maps to Year Built
//         address = "N/A",
//         zip_code = "N/A",
//         city_area = "N/A",
//         country = "N/A",
//         // Crucial: Use 'property.images' if your backend returns an array.
//         // Otherwise, fallback to 'property.image' and wrap it in an array.
//         images: backendImages = [], // Assume backend might send an 'images' array
//         image: singleBackendImage = null, // Fallback for single 'image' string
//         listingType = "N/A", // 'For Rent' or 'For Sale'
//     } = property;

//     // Determine the array of images for the carousel
//     // Prioritize 'images' array from backend, then fallback to single 'image' URL
//     const propertyImages = (backendImages && backendImages.length > 0)
//         ? backendImages
//         : (singleBackendImage ? [singleBackendImage] : []);

//     // Fallback if no images are present at all
//     const displayImages = propertyImages.length > 0
//         ? propertyImages
//         : ['https://via.placeholder.com/800x600?text=No+Image+Available'];

//     return (
//         <>
//             <Header />
//             <div className="container-fluid px-5">
//                 <Card className="shadow-sm w-100" style={{ backgroundColor: "#F3F3F3", border: "none" }}>
//                     <Card.Body className="p-4">
//                         <div className="d-flex justify-content-between align-items-start mb-4">
//                             <div>
//                                 <h2 className="fw-bold mb-1">{title}</h2>
//                                 <p className="text-muted mb-3 d-flex align-items-center gap-1">
//                                     <svg
//                                         xmlns="http://www.w3.org/2000/svg"
//                                         width="10.41"
//                                         height="14.57"
//                                         viewBox="0 0 384 512"
//                                         fill="#6c757d"
//                                     >
//                                         <path d="M168 0C75.2 0 0 75.2 0 168c0 87.7 132.9 308.6 152.2 337.4 4.6 6.8 12.3 10.6 20.3 10.6s15.7-3.9 20.3-10.6C251.1 476.6 384 255.7 384 168 384 75.2 308.8 0 216 0zm0 240c-39.8 0-72-32.2-72-72s32.2-72 72-72 72 32.2 72 72-32.2 72-72 72z" />
//                                     </svg>
//                                     {city}, {state}
//                                 </p>
//                                 <div className="d-flex gap-2 mb-2">
//                                     <span
//                                         style={{
//                                             width: '77.34px',
//                                             height: '30.82px',
//                                             display: 'inline-flex',
//                                             alignItems: 'center',
//                                             justifyContent: 'center',
//                                             gap: '5.91px',
//                                             borderRadius: '5.32px',
//                                             padding: '5.91px',
//                                             backgroundColor: '#94A0DF',
//                                             color: 'white',
//                                             fontSize: '12px',
//                                             fontWeight: '500',
//                                             textTransform: 'uppercase'
//                                         }}
//                                     >
//                                         {listingType}
//                                     </span>
//                                     {/* You can make 'FEATURED' dynamic if your property data includes a 'isFeatured' field */}
//                                     <span
//                                         style={{
//                                             width: '77.34px',
//                                             height: '30.82px',
//                                             display: 'inline-flex',
//                                             alignItems: 'center',
//                                             justifyContent: 'center',
//                                             gap: '5.91px',
//                                             borderRadius: '5.32px',
//                                             padding: '5.91px',
//                                             backgroundColor: '#429283',
//                                             color: 'white',
//                                             fontSize: '12px',
//                                             fontWeight: '500',
//                                             textTransform: 'uppercase'
//                                         }}
//                                     >
//                                         FEATURED
//                                     </span>
//                                 </div>
//                             </div>

//                             <div className="text-end">
//                                 <h3
//                                     className="fw-bold mb-0"
//                                     style={{
//                                         fontFamily: "'Poppins', sans-serif",
//                                         fontWeight: 100,
//                                         fontSize: '25px',
//                                         lineHeight: '28px',
//                                         letterSpacing: '0.5px',
//                                         marginTop: '20px'
//                                     }}
//                                 >
//                                     ${price?.toLocaleString() || 'Price N/A'}
//                                 </h3>
//                             </div>
//                         </div>

//                         <Row>
//                             {/* Left Column - Image Section */}
//                             <Col md={7} className="mb-4 mb-md-0">
//                                 <div className="position-relative mb-3">
//                                     <Image
//                                         src={displayImages[mainImageIndex]}
//                                         alt={title}
//                                         fluid
//                                         className="rounded"
//                                         style={mainImageStyles}
//                                         onError={(e) => { e.target.src = 'https://via.placeholder.com/800x600?text=Image+Not+Available'; }}
//                                     />
//                                     {displayImages.length > 1 && (
//                                         <>
//                                             <Button
//                                                 variant="light"
//                                                 className="position-absolute top-50 start-0 translate-middle-y rounded-circle p-2"
//                                                 onClick={handlePrevImage}
//                                                 style={{ left: "10px" }}
//                                             >
//                                                 <ChevronLeft size={20} />
//                                             </Button>
//                                             <Button
//                                                 variant="light"
//                                                 className="position-absolute top-50 end-0 translate-middle-y rounded-circle p-2"
//                                                 onClick={handleNextImage}
//                                                 style={{ right: "10px" }}
//                                             >
//                                                 <ChevronRight size={20} />
//                                             </Button>
//                                         </>
//                                     )}
//                                 </div>

//                                 <div className="position-relative">
//                                     <div className="d-flex overflow-auto py-2 thumbnail-scroll">
//                                         {displayImages.map((img, index) => (
//                                             <div
//                                                 key={index}
//                                                 className="me-2 cursor-pointer"
//                                                 onClick={() => setMainImageIndex(index)}
//                                                 style={{ minWidth: "80px" }}
//                                             >
//                                                 <Image
//                                                     src={img}
//                                                     alt={`Thumbnail ${index + 1}`}
//                                                     className={mainImageIndex === index ? "border border-primary" : ""}
//                                                     style={{ ...thumbnailImageStyles, opacity: mainImageIndex === index ? 1 : 0.7 }}
//                                                     onError={(e) => { e.target.src = 'https://via.placeholder.com/80x60?text=Thumb'; }}
//                                                 />
//                                             </div>
//                                         ))}
//                                     </div>
//                                 </div>
//                             </Col>

//                             {/* Right Column - Inquiry Form */}
//                             <Col md={5}>
//                                 <div style={formCardStyles}>
//                                     <h4 className="fw-bold mb-2">Submit an inquiry</h4>
//                                     <div
//                                         style={{
//                                             width: '60px',
//                                             height: '3px',
//                                             backgroundColor: '#2495FD',
//                                             borderRadius: '2px',
//                                             marginBottom: '24px'
//                                         }}
//                                     ></div>

//                                     {/* Inquiry Status Alerts */}
//                                     {inquiryStatus.message && (
//                                         <Alert variant={inquiryStatus.type} className="mb-3">
//                                             {inquiryStatus.message}
//                                         </Alert>
//                                     )}

//                                     {isAuthenticated ? (
//                                         <>
//                                             <div className="d-flex align-items-center mb-4">
//                                                 <Image
//                                                     src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
//                                                     roundedCircle
//                                                     width={50}
//                                                     height={50}
//                                                     className="me-3"
//                                                     alt="Martha Stewart, Property Consultant"
//                                                 />
//                                                 <div>
//                                                     <h6 className="mb-0 fw-bold">Martha Stewart</h6>
//                                                     <small className="text-muted">Property Consultant</small>
//                                                 </div>
//                                             </div>

//                                             <Form onSubmit={handleInquirySubmit}>
//                                                 <Form.Group className="mb-3" controlId="formName">
//                                                     <Form.Label className="fw-bold">Name</Form.Label>
//                                                     <Form.Control
//                                                         type="text"
//                                                         placeholder="Your Name"
//                                                         name="name"
//                                                         value={inquiryName}
//                                                         onChange={(e) => setInquiryName(e.target.value)}
//                                                         style={formInputStyles}
//                                                         readOnly // Make name field read-only if authenticated
//                                                     />
//                                                 </Form.Group>

//                                                 <Form.Group className="mb-3" controlId="formEmail">
//                                                     <Form.Label className="fw-bold">Email</Form.Label>
//                                                     <Form.Control
//                                                         type="email"
//                                                         placeholder="Your Email"
//                                                         name="email"
//                                                         value={inquiryEmail}
//                                                         onChange={(e) => setInquiryEmail(e.target.value)}
//                                                         style={formInputStyles}
//                                                         readOnly // Make email field read-only if authenticated
//                                                     />
//                                                 </Form.Group>

//                                                 <Form.Group className="mb-3" controlId="formPhone">
//                                                     <Form.Label className="fw-bold">Phone (Optional)</Form.Label>
//                                                     <Form.Control
//                                                         type="tel"
//                                                         placeholder="+1 (123) 456-0509"
//                                                         name="phone"
//                                                         value={inquiryPhone}
//                                                         onChange={(e) => setInquiryPhone(e.target.value)}
//                                                         style={formInputStyles}
//                                                     />
//                                                 </Form.Group>

//                                                 <Form.Group className="mb-3" controlId="formMessage">
//                                                     <Form.Label className="fw-bold">Message</Form.Label>
//                                                     <Form.Control
//                                                         as="textarea"
//                                                         rows={3}
//                                                         placeholder="Please Enter Your Message"
//                                                         name="message"
//                                                         value={inquiryMessage}
//                                                         onChange={(e) => setInquiryMessage(e.target.value)}
//                                                         style={{ ...formInputStyles, resize: "none" }}
//                                                         required
//                                                     />
//                                                 </Form.Group>

//                                                 <Button
//                                                     type="submit"
//                                                     className="w-100 fw-bold py-2 border-0"
//                                                     style={{ backgroundColor: '#2495FD', color: 'white' }}
//                                                 >
//                                                     Send Inquiry
//                                                 </Button>
//                                             </Form>
//                                         </>
//                                     ) : (
//                                         <div className="text-center py-5">
//                                             <p className="lead">Please <Link to="/login" state={{ from: location.pathname }}>login</Link> to submit an inquiry about this property.</p>
//                                             <p>Don't have an account? <Link to="/register">Register here</Link>.</p>
//                                         </div>
//                                     )}
//                                 </div>
//                             </Col>
//                         </Row>
//                     </Card.Body>
//                 </Card>

//                 {/* Property Listing Details Sections */}

//                 {/* Overview Section */}
//                 <PropertySection title="Overview">
//                     <Row className="g-3">
//                         <Col xs={6} md={4} lg={2} className="d-flex flex-column">
//                             <small className="text-muted d-block">Property Type</small>
//                             <span className="fw-medium d-flex align-items-center">{type}</span>
//                         </Col>
//                         <Col xs={6} md={4} lg={2} className="d-flex flex-column">
//                             <small className="text-muted d-block">Year Built</small>
//                             <span className="fw-medium d-flex align-items-center"><SlCalender className="me-1" size={18} />{year}</span>
//                         </Col>
//                         <Col xs={6} md={4} lg={2} className="d-flex flex-column">
//                             <small className="text-muted d-block">Size</small>
//                             <span className="fw-medium d-flex align-items-center"><RiRuler2Line className="me-1" size={18} />{size} m²</span>
//                         </Col>
//                         <Col xs={6} md={4} lg={2} className="d-flex flex-column">
//                             <small className="text-muted d-block">Bedrooms</small>
//                             <span className="fw-medium d-flex align-items-center"><IoBedOutline className="me-1" size={18} />{bedroom}</span>
//                         </Col>
//                         <Col xs={6} md={4} lg={2} className="d-flex flex-column">
//                             <small className="text-muted d-block">Bathrooms</small>
//                             <span className="fw-medium d-flex align-items-center"><PiShower className="me-1" size={18} />{bathroom}</span>
//                         </Col>
//                         <Col xs={6} md={4} lg={2} className="d-flex flex-column">
//                             <small className="text-muted d-block">Garage</small>
//                             <span className="fw-medium d-flex align-items-center"><IoCarOutline className="me-1" size={18} />{garage}</span>
//                         </Col>
//                     </Row>
//                 </PropertySection>

//                 {/* Address Section */}
//                 <PropertySection title="Address">
//                     <Row className="mb-3">
//                         <Col md={3}><small className="text-muted fw-bold">Address</small></Col>
//                         <Col md={3}><span className="fw-medium">{address}</span></Col>
//                         <Col md={3}><small className="text-muted fw-bold">Zip/Postal Code</small></Col>
//                         <Col md={3}><span className="fw-medium">{zip_code}</span></Col>
//                     </Row>
//                     <Row className="mb-3">
//                         <Col md={3}><small className="text-muted fw-bold">City</small></Col>
//                         <Col md={3}><span className="fw-medium">{city}</span></Col>
//                         <Col md={3}><small className="text-muted fw-bold">Area</small></Col>
//                         <Col md={3}><span className="fw-medium">{city_area}</span></Col>
//                     </Row>
//                     <Row>
//                         <Col md={3}><small className="text-muted fw-bold">State/County</small></Col>
//                         <Col md={3}><span className="fw-medium">{state}</span></Col>
//                         <Col md={3}><small className="text-muted fw-bold">Country</small></Col>
//                         <Col md={3}><span className="fw-medium">{country}</span></Col>
//                     </Row>
//                 </PropertySection>

//                 {/* Description Section */}
//                 <PropertySection title="Description">
//                     <p className="mb-0 text-justify lh-base">{description}</p>
//                 </PropertySection>

//                 {/* Details Section */}
//                 <PropertySection title="Details">
//                     <Row className="g-3">
//                         <Col xs={6} md={3}><small className="text-muted fw-bold">Property ID</small></Col>
//                         <Col xs={6} md={3}><span className="fw-medium">{id}</span></Col>
//                         <Col xs={6} md={3}><small className="text-muted fw-bold">Property Size</small></Col>
//                         <Col xs={6} md={3}><span className="fw-medium">{size} m²</span></Col>
//                         <Col xs={6} md={3}><small className="text-muted fw-bold">Property Type</small></Col>
//                         <Col xs={6} md={3}><span className="fw-medium">{type}</span></Col>
//                         <Col xs={6} md={3}><small className="text-muted fw-bold">Property Status</small></Col>
//                         <Col xs={6} md={3}><span className="fw-medium">{listingType}</span></Col> {/* Use dynamic listingType */}
//                         <Col xs={6} md={3}><small className="text-muted fw-bold">Bedrooms</small></Col>
//                         <Col xs={6} md={3}><span className="fw-medium">{bedroom}</span></Col>
//                         <Col xs={6} md={3}><small className="text-muted fw-bold">Bathrooms</small></Col>
//                         <Col xs={6} md={3}><span className="fw-medium">{bathroom}</span></Col>
//                     </Row>
//                 </PropertySection>

//                 {/* Features Section - Using static data as requested */}
//                 <PropertySection title="Features">
//                     <Row className="g-2">
//                         {staticFeatures.map((feature) => (
//                             <Col key={feature} xs={12} sm={6} md={4} lg={3}>
//                                 <div className="d-flex align-items-center">
//                                     <div style={featureBulletStyles} className="me-2">
//                                         ✓
//                                     </div>
//                                     <span className="fw-medium">{feature}</span>
//                                 </div>
//                             </Col>
//                         ))}
//                     </Row>
//                 </PropertySection>

//             </div>
//             <FeaturedListing />
//             <Newsletter />
//             <Footer />
//         </>
//     );
// };

// export default PropertyDetail;

// src/pages/PropertyDetail.jsx
import React, { useState, useEffect, useCallback } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Card, Button, Form, Image, Row, Col, Spinner, Alert } from "react-bootstrap";
import { ChevronLeft, ChevronRight } from "react-bootstrap-icons";
import Footer from "../components/Footer";
import FeaturedListing from "../components/FeatureListing";
import Newsletter from "../components/Newsletter";
import Header from "../components/Header";
import { SlCalender } from "react-icons/sl";
import { RiHome9Line, RiRuler2Line } from "react-icons/ri";
import { IoBedOutline, IoCarOutline } from "react-icons/io5";
import { PiShower } from "react-icons/pi";
import { useAuth } from '../context/AuthContext'; // Import useAuth hook

// --- Styling Constants ---
const sectionCardStyles = {
    borderRadius: '15px',
    border: 'none',
    paddingTop: '20px',
    marginBottom: '20px',
};

const sectionHeaderStyles = {
    backgroundColor: '#f5f5f5',
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
    const { isAuthenticated, user, authLoading, logout } = useAuth(); // Use auth context
    const navigate = useNavigate(); // Initialize useNavigate hook
    const location = useLocation(); // Initialize useLocation hook to get current path

    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [mainImageIndex, setMainImageIndex] = useState(0);

    // State for form fields
    const [inquiryName, setInquiryName] = useState('');
    const [inquiryEmail, setInquiryEmail] = useState('');
    const [inquiryPhone, setInquiryPhone] = useState('');
    const [inquiryMessage, setInquiryMessage] = useState('');

    const [inquiryStatus, setInquiryStatus] = useState({ type: null, message: '' }); // For inquiry success/error

    const staticFeatures = [
        'Air Conditioning', 'External Yard', 'Dryer', 'Gym', 'Laundry', 'Shared gym',
        'Kitchen Appliances', 'Outdoor Shower', 'Two Refrigerators', 'TV Cable', 'Washer'
    ];

    // Effect to populate form fields when user status changes
    // This ensures that when a user logs in, their details pre-fill the form.
    useEffect(() => {
        if (isAuthenticated && user) {
            setInquiryName(user.name || '');
            setInquiryEmail(user.email || '');
            // It's important to ensure 'user.phone' is correctly provided by your backend.
            // If the backend doesn't send 'phone', this will default to an empty string.
            setInquiryPhone(user.phone || ''); 
            setInquiryMessage(''); // Clear message when user logs in to a new detail page
        } else {
            // Clear fields if user logs out or is not logged in initially
            setInquiryName('');
            setInquiryEmail('');
            setInquiryPhone('');
            setInquiryMessage('');
        }
    }, [isAuthenticated, user]); // Dependency on user and isAuthenticated

    // Memoized function for fetching property data
    const fetchProperty = useCallback(async () => {
        if (!id) {
            console.error("PropertyDetail: Property ID is missing from the URL. Cannot fetch details.");
            setError("Property ID is missing. Please go back and select a property.");
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`http://localhost:8000/api/properties/${id}`);
            console.log('Fetched Property Data:', response.data.property);
            setProperty(response.data.property);
            setError(null);
        } catch (err) {
            console.error("PropertyDetail: Error fetching property details:", err);
            if (err.response && err.response.status === 404) {
                setError("Property not found. It might have been removed or does not exist.");
            } else {
                setError(err.response?.data?.message || err.message || 'Failed to load property details. Please check your internet connection and try again.');
            }
            setProperty(null); // Ensure property is null on error
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchProperty();
        // Reset main image index when property changes (e.g., navigating to a new property)
        setMainImageIndex(0); 
    }, [fetchProperty]);

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

    // Handler for inquiry form submission
    const handleInquirySubmit = async (e) => {
        e.preventDefault();
        setInquiryStatus({ type: null, message: '' }); // Clear previous status

        if (!isAuthenticated) {
            setInquiryStatus({ type: 'danger', message: 'You must be logged in to submit an inquiry.' });
            return; 
        }

        if (!property || !property.id) {
            setInquiryStatus({ type: 'danger', message: 'Could not find property ID for inquiry.' });
            return;
        }

        const payload = {
            name: inquiryName,
            email: inquiryEmail,
            phone: inquiryPhone,
            message: inquiryMessage,
            propertyId: property.id,
        };
        console.log("Frontend sending inquiry payload:", payload);
        try {
            // It's good practice to send the Authorization header if your backend expects it for authenticated actions.
            // Assuming your `axios` instance is already configured with an interceptor for tokens, or you pass it manually.
            const token = localStorage.getItem('token'); // Or get from your AuthContext if stored there
            const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};

            const response = await axios.post('http://localhost:8000/api/inquiries/submit', payload, config);

            console.log("Inquiry submitted successfully:", response.data);
            setInquiryStatus({ type: 'success', message: response.data.message });
            setInquiryMessage(''); // Clear message field

        } catch (err) {
            console.error("Error submitting inquiry:", err);
            const errorMessage = err.response?.data?.message || err.message || 'Failed to submit inquiry. Please try again.';
            setInquiryStatus({ type: 'danger', message: errorMessage });
        }
    };

    // Handle Logout
    const handleLogout = () => {
        logout(); // Call the logout function from AuthContext
        // The component will re-render due to isAuthenticated changing, showing the login prompt.
        // No need to explicitly navigate away if you want to stay on the property detail page.
    };

    // --- Render Loading State ---
    // Wait for both property data and authentication status to load
    if (loading || authLoading) {
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
                    <p>Please try again later or contact support if the problem persists.</p>
                    <Link to="/" className="btn btn-primary mt-3">Go to Homepage</Link>
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
                    <Link to="/" className="btn btn-primary mt-3">Go to Homepage</Link>
                </div>
                <FeaturedListing />
                <Newsletter />
                <Footer />
            </>
        );
    }

    // Destructure property data for easier access
    const {
        title = "Property Title Not Available",
        price = 0,
        city = "N/A",
        state = "N/A",
        description = "No description available.",
        type = "N/A",
        size = "N/A",
        bedroom = "N/A",
        bathroom = "N/A",
        garage = "N/A",
        year = "N/A",
        address = "N/A",
        zip_code = "N/A",
        city_area = "N/A",
        country = "N/A",
        image: mainImage = null, // The single image URL from backend (for fallback)
        listingType = "N/A",
        features = [], // Ensure features is an array, default to empty
        // amenities = [], // Assuming amenities might be another array from backend
    } = property;

    // Construct image URLs: Prioritize an 'images' array. If not present, use the single 'image' field.
    // Ensure all image paths are correctly prefixed with your backend's upload URL.
    const propertyImages = (Array.isArray(property.images) && property.images.length > 0)
        ? property.images.map(imgName => `http://localhost:8000/uploads/${imgName}`)
        : (mainImage && typeof mainImage === 'string') // Check if mainImage exists and is a string
            ? [`http://localhost:8000/uploads/${mainImage}`]
            : ['https://via.placeholder.com/800x600?text=No+Image+Available']; // Fallback placeholder


    // Merge static features with any dynamic features from the property object
    const allFeatures = [...new Set([...staticFeatures, ...(property.features || [])])];


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
                                        {listingType}
                                    </span>
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
                                    ${price?.toLocaleString() || 'Price N/A'}
                                </h3>
                            </div>
                        </div>

                        <Row>
                            {/* Left Column - Image Section */}
                            <Col md={7} className="mb-4 mb-md-0">
                                <div className="position-relative mb-3">
                                    <Image
                                        src={propertyImages[mainImageIndex]}
                                        alt={title}
                                        fluid
                                        className="rounded"
                                        style={{
                                            width: "100%",
                                            maxWidth: "100%",
                                            height: "auto",
                                            objectFit: "cover",
                                            maxHeight: "500px",
                                            minHeight: "300px",
                                            border: "none",
                                            borderRadius: "8px",
                                        }}
                                        onError={(e) => { e.target.src = 'https://via.placeholder.com/800x600?text=Image+Not+Available'; }}
                                    />
                                    {propertyImages.length > 1 && (
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
                                                style={{ minWidth: "100px" }}
                                            >
                                                <Image
                                                    src={img}
                                                    alt={`Thumbnail ${index + 1}`}
                                                    className={mainImageIndex === index ? "border border-primary" : ""}
                                                    style={{
                                                        width: "100px",
                                                        height: "75px",
                                                        objectFit: "cover",
                                                        border: "none",
                                                        borderRadius: "6px",
                                                        cursor: "pointer",
                                                        opacity: mainImageIndex === index ? 1 : 0.7
                                                    }}
                                                    onError={(e) => { e.target.src = 'https://via.placeholder.com/80x60?text=Thumb'; }}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </Col>

                            {/* Right Column - Inquiry Section (Conditional Rendering) */}
                            <Col md={5}>
                                {isAuthenticated ? (
                                    // Show the inquiry form if authenticated
                                    <div style={formCardStyles}>
                                        <h4 className="fw-bold mb-2">Submit an Inquiry</h4>
                                        <div
                                            style={{
                                                width: '60px',
                                                height: '3px',
                                                backgroundColor: '#2495FD',
                                                borderRadius: '2px',
                                                marginBottom: '24px'
                                            }}
                                        ></div>

                                        {inquiryStatus.message && (
                                            <Alert variant={inquiryStatus.type} className="mb-3">
                                                {inquiryStatus.message}
                                            </Alert>
                                        )}

                                        <div className="d-flex align-items-center mb-4">
                                            <Image
                                                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                                                roundedCircle
                                                width={50}
                                                height={50}
                                                className="me-3"
                                                alt="User Profile"
                                            />
                                            <div>
                                                <h6 className="mb-0 fw-bold">{user?.name || 'Guest User'}</h6>
                                                <small className="text-muted">{user?.email || 'N/A'}</small>
                                            </div>
                                        </div>

                                        <Form onSubmit={handleInquirySubmit}>
                                            <Form.Group className="mb-3" controlId="formName">
                                                <Form.Label className="fw-bold">Name</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="name"
                                                    value={inquiryName}
                                                    onChange={(e) => setInquiryName(e.target.value)}
                                                    style={formInputStyles}
                                                    readOnly // Always read-only when authenticated as user's name/email/phone
                                                    required
                                                />
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formEmail">
                                                <Form.Label className="fw-bold">Email</Form.Label>
                                                <Form.Control
                                                    type="email"
                                                    name="email"
                                                    value={inquiryEmail}
                                                    onChange={(e) => setInquiryEmail(e.target.value)}
                                                    style={formInputStyles}
                                                    readOnly // Always read-only when authenticated
                                                    required
                                                />
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formPhone">
                                                <Form.Label className="fw-bold">Phone (Optional)</Form.Label>
                                                <Form.Control
                                                    type="tel"
                                                    name="phone"
                                                    value={inquiryPhone}
                                                    onChange={(e) => setInquiryPhone(e.target.value)}
                                                    style={formInputStyles}
                                                    readOnly={isAuthenticated && user?.phone} // Read-only if authenticated and phone exists
                                                />
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formMessage">
                                                <Form.Label className="fw-bold">Message</Form.Label>
                                                <Form.Control
                                                    as="textarea"
                                                    rows={3}
                                                    placeholder="Please Enter Your Message"
                                                    name="message"
                                                    value={inquiryMessage}
                                                    onChange={(e) => setInquiryMessage(e.target.value)}
                                                    style={{ ...formInputStyles, resize: "none" }}
                                                    required
                                                />
                                            </Form.Group>

                                            <Button
                                                type="submit"
                                                className="w-100 fw-bold py-2 border-0 mb-2" // Added mb-2 for spacing
                                                style={{ backgroundColor: '#2495FD', color: 'white' }}
                                            >
                                                Submit Inquiry
                                            </Button>
                                            {/* Logout Button */}
                                            <Button
                                                variant="outline-secondary" // Changed to outline for visual distinction
                                                onClick={handleLogout}
                                                className="w-100 fw-bold py-2"
                                            >
                                                Logout
                                            </Button>
                                        </Form>
                                    </div>
                                ) : (
                                    // Show "Login to Inquire" message if not authenticated
                                    <Card style={{ ...formCardStyles, textAlign: 'center', padding: '40px' }}>
                                        <Card.Body>
                                            <h4 className="fw-bold mb-3">Login to Inquire</h4>
                                            <p className="text-muted mb-4">Please log in to submit an inquiry about this property and connect with our consultant.</p>
                                            <Button
                                                variant="primary"
                                                size="lg"
                                                onClick={() => navigate('/login', { state: { from: location.pathname } })}
                                                className="w-75 fw-bold py-2"
                                                style={{ backgroundColor: '#2495FD', color: 'white', border: 'none' }}
                                            >
                                                Login Now
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                )}
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


                {/* Property Listing Details Sections */}

                {/* Overview Section */}
                {/* <PropertySection title="Overview">
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
                            <span className="fw-medium d-flex align-items-center"><RiRuler2Line className="me-1" size={18} />{size} SqFt</span>
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
                </PropertySection> */}

                {/* Description Section */}
                {/* <PropertySection title="Description">
                    <p>{description}</p>
                </PropertySection> */}

                {/* Address Section */}
                {/* <PropertySection title="Address">
                    <ul className="list-unstyled mb-0">
                        <li><strong>Address:</strong> {address}</li>
                        <li><strong>City:</strong> {city}</li>
                        <li><strong>State/Province:</strong> {state}</li>
                        <li><strong>Zip/Postal Code:</strong> {zip_code}</li>
                        <li><strong>Area:</strong> {city_area}</li>
                        <li><strong>Country:</strong> {country}</li>
                    </ul>
                </PropertySection> */}

                {/* Features Section */}
                <PropertySection title="Features">
                    <Row>
                        {allFeatures.length > 0 ? (
                            allFeatures.map((feature, index) => (
                                <Col xs={6} md={4} lg={3} key={index} className="mb-2">
                                    <div className="d-flex align-items-center">
                                        <span style={featureBulletStyles} className="me-2">✓</span>
                                        <span>{feature}</span>
                                    </div>
                                </Col>
                            ))
                        ) : (
                            <Col><p>No specific features listed for this property.</p></Col>
                        )}
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