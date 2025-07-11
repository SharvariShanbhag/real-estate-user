import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaBed, FaShower, FaRulerCombined, FaMapMarkerAlt } from 'react-icons/fa';
import '../Css/HeroSectionWithSearch.css'; // Ensure this path is correct

// Assuming your backend runs on localhost:8000
const API_BASE_URL = 'http://localhost:8000/api/properties';
const UPLOADS_BASE_URL = 'http://localhost:8000/uploads/'; // Base URL for static uploaded images

// Helper to capitalize the first letter of a string
const capitalizeFirstLetter = (string) => {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
};

// --- HeroSectionWithSearch Component ---
const HeroSectionWithSearch = ({ onFilterChange, currentFilters }) => {
    const [filterOptions, setFilterOptions] = useState({
        cities: [],
        types: [],
        propertySubTypes: [],
        bedrooms: []
    });

    useEffect(() => {
        const fetchDynamicFilterOptions = async () => {
            try {
                // Fetch all properties to derive filter options
                const response = await axios.get(`${API_BASE_URL}`);
                const properties = response.data.properties || [];

                const cities = [...new Set(properties.map(p => p.city).filter(Boolean))].sort();
                const types = [...new Set(properties.map(p => p.type).filter(Boolean))].sort();
                
                // Extract unique property sub-types from the first word of 'description'
                const propertySubTypes = [...new Set(properties
                    .map(p => p.description ? capitalizeFirstLetter(p.description.split(' ')[0]) : '')
                    .filter(type => type)
                )].sort();

                const bedrooms = [...new Set(properties.map(p => p.bedroom).filter(val => val !== null && val !== undefined))].sort((a, b) => a - b);

                setFilterOptions({
                    cities: ['All Cities', ...cities],
                    types: ['All Units', ...types],
                    propertySubTypes: ['Any Type', ...propertySubTypes],
                    bedrooms: ['Any Size', ...bedrooms]
                });
            } catch (error) {
                console.error('Error fetching dynamic filter options:', error);
                // Optionally, handle error state for filter options, e.g., show a message
            }
        };

        fetchDynamicFilterOptions();
    }, []); // Empty dependency array means this runs once on mount

    const handlePropertyOptionClick = (type) => {
        // This sets the 'type' filter for 'For Rent', 'For Sale', or clears it for 'ALL UNITS'
        onFilterChange('propertyType', type);
    };

    const handleDropdownChange = (e) => {
        const { name, value } = e.target;
        // If the value is an "All" or "Any" option, set it to empty string for backend
        const cleanedValue = value.includes('All ') || value.includes('Any ') || value === 'Bedrooms' || value === 'Property Type' || value === 'Max. Price' ? '' : value;
        onFilterChange(name, cleanedValue);
    };

    const handleSearchClick = () => {
        // This button now primarily acts as a visual "apply filters" button.
        // The actual fetch in FeaturedListings is triggered by filter state changes.
        console.log("Frontend: Search button clicked. Current filters:", currentFilters);
    };

    return (
        <div className="hero-container">
            <div className="hero-text">
                <h1>YOUR DREAM HOME</h1>
                <h2>IS ONE CLICK AWAY</h2>
            </div>

            <div className="search-section">
                <div className="property-options">
                    <button
                        className={`property-option ${currentFilters.propertyType === '' ? 'active' : ''}`}
                        onClick={() => handlePropertyOptionClick('')} // Empty string means 'ALL UNITS' to backend
                    >
                        ALL UNITS
                    </button>
                    {filterOptions.types.filter(type => type !== 'All Units').map((type, index) => (
                        <button
                            key={index} // Use index as key, or a more unique identifier if available
                            className={`property-option ${currentFilters.propertyType === type ? 'active' : ''}`}
                            onClick={() => handlePropertyOptionClick(type)}
                        >
                            {type.toUpperCase()}
                        </button>
                    ))}
                </div>

                <div className="search-filters">
                    <div className="filter-group">
                        <label>PROPERTY TYPE</label>
                        <select name="propertySubType" value={currentFilters.propertySubType} onChange={handleDropdownChange}>
                            {filterOptions.propertySubTypes.map((type, index) => (
                                <option key={index} value={type === 'Any Type' ? '' : type}>{type}</option>
                            ))}
                        </select>
                    </div>

                    <div className="filter-group">
                        <label>LOCATION</label>
                        <select name="location" value={currentFilters.location} onChange={handleDropdownChange}>
                            {filterOptions.cities.map((city, index) => (
                                <option key={index} value={city === 'All Cities' ? '' : city}>{city}</option>
                            ))}
                        </select>
                    </div>

                    <div className="filter-group">
                        <label>BEDROOMS</label>
                        <select name="bedrooms" value={currentFilters.bedrooms} onChange={handleDropdownChange}>
                            {filterOptions.bedrooms.map((bed, index) => (
                                <option key={index} value={bed === 'Any Size' ? '' : bed}>{bed === 'Any Size' ? bed : `${bed} Bedroom${bed > 1 ? 's' : ''}`}</option>
                            ))}
                        </select>
                    </div>

                    <div className="filter-group">
                        <label>MAX PRICE</label>
                        <select name="maxPrice" value={currentFilters.maxPrice} onChange={handleDropdownChange}>
                            <option value="">Any Price</option>
                            <option value="100000">Up to $100,000</option>
                            <option value="300000">Up to $300,000</option>
                            <option value="500000">Up to $500,000</option>
                            <option value="1000000">Up to $1,000,000</option>
                            <option value="999999999">No Limit</option>
                        </select>
                    </div>

                    <button className="search-button" onClick={handleSearchClick}>Search</button>
                </div>
            </div>
        </div>
    );
};

// --- FeaturedListings Component ---
const FeaturedListings = ({ filters, setFilters }) => {
    const navigate = useNavigate();
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [hasMore, setHasMore] = useState(true);
    const [totalProperties, setTotalProperties] = useState(0);

    const limit = 6; // Number of properties to load per request

    const fetchProperties = useCallback(async () => {
        setLoading(true);
        setError(null);

        let url = new URL(API_BASE_URL);

        // Append pagination parameters
        url.searchParams.append('limit', limit);
        url.searchParams.append('offset', filters.offset);

        // --- Append filters based on backend's EXPECTED PARAM NAMES ---
        // Ensure that empty strings are NOT sent as query parameters
        if (filters.propertyType) { // No need for 'ALL_UNITS' check, backend handles empty string as "all"
            url.searchParams.append('type', filters.propertyType); // e.g., 'For Rent', 'For Sale'
        }
        if (filters.propertySubType) {
            // Your backend controller uses 'description' for propertySubType search.
            // This assumes the first word of the description IS the subType.
            // If the backend searches for propertySubType explicitly, it might need a dedicated field.
            // For now, mapping to 'description' as per your backend controller:
            url.searchParams.append('description', filters.propertySubType); 
        }
        if (filters.location) {
            url.searchParams.append('location', filters.location); // Backend uses 'location' for city, address etc.
        }
        if (filters.bedrooms) {
            url.searchParams.append('bedrooms', filters.bedrooms); // Backend expects 'bedrooms' (plural)
        }
        if (filters.maxPrice && filters.maxPrice !== '999999999') {
            url.searchParams.append('maxPrice', filters.maxPrice); // Backend expects 'maxPrice' (no 'price[lte]')
        }
        
        // Your backend controller's `getAllProperties` uses `minPrice` and `maxPrice` query params.
        // The frontend currently sends `maxPrice`. If you implement min price, add it here too.
        // Example for minPrice (if you add a filter for it in HeroSectionWithSearch):
        // if (filters.minPrice) {
        //     url.searchParams.append('minPrice', filters.minPrice);
        // }

        console.log("Frontend: Fetching URL with filters:", url.toString());

        try {
            const response = await fetch(url.toString());
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log("Frontend: Fetched data response:", data); // <<< Inspect this log carefully!

            setProperties(prevProperties => {
                const newProperties = (data.properties || []).map(p => {
                    // *** CRITICAL FIX: Ensure 'id' exists and is used, as per Sequelize model ***
                    if (!p.id) {
                        console.warn("Property object missing 'id' field from backend:", p);
                        // Fallback, but investigate why backend isn't sending 'id' if this happens often
                        p.id = Date.now() + Math.random(); 
                    }
                    return {
                        ...p,
                        // Ensure 'image' field from backend is used to construct the URL
                        imageUrl: p.image ? `${UPLOADS_BASE_URL}${p.image}` : 'https://via.placeholder.com/250x250.png?text=No+Image'
                    };
                });
                // If offset is 0, it means a new filter/search, so replace properties
                // Otherwise, it's 'Load More', so append
                return filters.offset === 0 ? newProperties : [...prevProperties, ...newProperties];
            });
            setTotalProperties(data.totalProperties || 0);
            // Check if there are more items to load
            setHasMore(data.properties.length === limit && (filters.offset + limit < (data.totalProperties || 0)));

        } catch (err) {
            console.error("Frontend: Error fetching properties:", err);
            setError(err.message);
            setProperties([]); // Clear properties on error or no results
            setHasMore(false);
        } finally {
            setLoading(false);
        }
    }, [filters, limit, UPLOADS_BASE_URL]);

    useEffect(() => {
        // This effect runs whenever fetchProperties (the memoized function) changes.
        // fetchProperties changes when 'filters' or 'limit' change.
        fetchProperties();
    }, [fetchProperties]);

    const handleLoadMore = () => {
        setFilters(prevFilters => ({
            ...prevFilters,
            offset: prevFilters.offset + limit
        }));
    };

    const handleCardClick = (id) => {
        console.log("Frontend: Attempting to navigate to property ID:", id); // Verify the ID
        if (id) {
            navigate(`/properties/${id}`); // Ensure this matches your App.jsx route for single property
        } else {
            console.error("Frontend: Cannot navigate, property ID is undefined.");
            alert("Error: Could not load property details. ID is missing.");
        }
    };

    if (error) {
        return <Container className="my-5"><Alert variant="danger">Error: {error}</Alert></Container>;
    }

    return (
        <Container className="my-5">
            <div className="text-center mb-5">
                <h2 className="mb-3">Explore Our Properties</h2>
                <p className="lead">Enjoy the variety of {totalProperties} Different properties in the market!</p>
            </div>

            {loading && properties.length === 0 ? (
                <div className="d-flex justify-content-center my-5">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            ) : properties.length === 0 ? (
                <Alert variant="info" className="text-center">No properties found matching your criteria.</Alert>
            ) : (
                <Row xs={1} md={2} lg={3} className="g-4">
                    {properties.map((property) => (
                        // Use property.id as the key, which is guaranteed to exist now
                        <Col key={property.id}> 
                            <Card
                                className="h-100 overflow-hidden"
                                style={{ border: "none", boxShadow: "none", cursor: "pointer" }}
                                onClick={() => handleCardClick(property.id)}
                            >
                                <div className="position-relative" style={{ borderRadius: "10px", overflow: "hidden" }}>
                                    <Card.Img
                                        variant="top"
                                        src={property.imageUrl}
                                        alt={property.title}
                                        style={{
                                            height: "250px",
                                            objectFit: "cover",
                                            borderRadius: "10px"
                                        }}
                                    />
                                    <div className="position-absolute top-0 start-0 m-3">
                                        <span className="badge text-white py-2 px-3" style={{ backgroundColor: '#429283' }}>
                                            {property.type}
                                        </span>
                                    </div>
                                    <div
                                        className="position-absolute bottom-0 start-0 w-100 px-3 py-2"
                                        style={{
                                            backgroundColor: "rgba(0, 0, 0, 0.2)",
                                            height: "auto",
                                            minHeight: "20px",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            borderRadius: "0 0 10px 10px",
                                            color: "white",
                                            fontSize: "0.9em"
                                        }}
                                    >
                                        <span className="d-flex align-items-center">
                                            <FaBed className="me-1" /> {property.bedroom || 0} &nbsp;
                                            <FaShower className="me-1" /> {property.bathroom || 0} &nbsp;
                                            <FaRulerCombined className="me-1" /> {property.area || property.size || 'N/A'} m²
                                        </span>
                                    </div>
                                </div>
                                <Card.Body>
                                    <Card.Title className="h5 text-start">{property.title}</Card.Title>
                                    <Card.Text className="text-muted small text-start">
                                        <FaMapMarkerAlt className="me-1" />
                                        {property.address}
                                    </Card.Text>
                                    <Card.Text className="text-start fw-bold">
                                        {/* ${property.price ? property.price.toLocaleString() : 'Price not available'} */}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}

            {hasMore && !loading && (
                <div className="d-flex justify-content-center mt-4">
                    <Button
                        className="px-4 py-2"
                        onClick={handleLoadMore}
                        style={{
                            backgroundColor: 'transparent',
                            color: '#2495FD',
                            borderColor: '#2495FD',
                            borderWidth: '2px',
                            borderStyle: 'solid',
                            fontWeight: 'bold',
                            
                        }}
                    >
                        Load More
                    </Button>
                </div>
            )}
            {loading && properties.length > 0 && (
                <div className="d-flex justify-content-center mt-4">
                    <Spinner animation="border" size="sm" /> Loading more...
                </div>
            )}
        </Container>
    );
};

// --- CombinedComponent (main export) ---
const CombinedComponent = () => {
    const [filters, setFilters] = useState({
        propertyType: '', // '' means 'ALL_UNITS' for the backend 'type' filter
        propertySubType: '', // Mapped to backend 'description' field (first word)
        location: '', // Mapped to backend 'city' or 'location'
        bedrooms: '', // Mapped to backend 'bedroom'
        maxPrice: '', // Mapped to backend 'price[lte]'
        offset: 0, // For pagination
    });

    const handleFilterChange = (filterName, value) => {
        setFilters(prevFilters => {
            const newFilters = {
                ...prevFilters,
                [filterName]: value,
                offset: 0, // Reset offset whenever ANY filter changes
            };
            console.log("Frontend: Filters updated to:", newFilters);
            return newFilters;
        });
    };

    return (
        <>
            {/* Pass handleFilterChange and current filters to HeroSectionWithSearch */}
            <HeroSectionWithSearch onFilterChange={handleFilterChange} currentFilters={filters} />
            {/* Pass filters and setFilters to FeaturedListings */}
            <FeaturedListings filters={filters} setFilters={setFilters} />
        </>
    );
};

export default CombinedComponent;