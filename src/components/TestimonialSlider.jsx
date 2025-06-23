import React, { useState } from 'react';
import '../Css/TestimonialsCarousel.css'; // Import the CSS file
import t1 from '../assets/t1.webp'
import t2 from '../assets/t2.jpg'
import t3 from '../assets/t3.avif'
import t4 from '../assets/t4.avif'

// Sample testimonial data (replace with your actual data)
const testimonialsData = [
  {
    id: 1,
    name: 'Emily Rodriguez',
    date: '27th June 2025',
    text: '“Absolutely thrilled with the service! Found my dream home faster than I ever thought possible. Highly recommend!”',
    image: t1, // Replace with actual image path
  },
  {
    id: 2,
    name: 'Michael Chen',
    date: '7th July 2024',
    text: '“Exceptional market knowledge and truly dedicated to finding the perfect fit. A seamless and stress-free process from start to finish.”',
    image: t2, // Replace with actual image path
  },
  {
    id: 3,
    name: 'Allen Jordan',
    date: '12th April 2025',
    text: '“The team went above and beyond! They were incredibly responsive and made sure all my questions were answered promptly.”',
    image: t3, // Replace with actual image path
  },
  {
    id: 4,
    name: 'Olivia Martinez',
    date: '23th July 2024',
    text: '“Highly recommend! They found me the perfect place quickly.”',
    image: t4, // Replace with actual image path
  },
];

const TestimonialsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const totalTestimonials = testimonialsData.length;
  const testimonialsToShow = 3;

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? totalTestimonials - testimonialsToShow : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === totalTestimonials - testimonialsToShow ? 0 : prevIndex + 1
    );
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  const getVisibleTestimonials = () => {
    if (totalTestimonials <= testimonialsToShow) {
      return testimonialsData;
    }

    const endIndex = currentIndex + testimonialsToShow;
    if (endIndex <= totalTestimonials) {
      return testimonialsData.slice(currentIndex, endIndex);
    } else {
      // Wrap around for the last few items
      const firstPart = testimonialsData.slice(currentIndex, totalTestimonials);
      const secondPart = testimonialsData.slice(0, endIndex - totalTestimonials);
      return [...firstPart, ...secondPart];
    }
  };

  return (
    <div className="testimonials-section">
      <h2 className="testimonials-title">Testimonials</h2>
      <p className="testimonials-subtitle">What Our Clients Say About Us!</p>

      <div className="carousel-container">
        <button className="carousel-arrow left-arrow" onClick={handlePrev}>
          &#x276E; {/* Left arrow entity */}
        </button>

        <div className="testimonials-wrapper">
          {getVisibleTestimonials().map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="testimonial-image"
              />
              <h3 className="testimonial-name">{testimonial.name}</h3>
              <p className="testimonial-date">{testimonial.date}</p>
              <p className="testimonial-text">{testimonial.text}</p>
            </div>
          ))}
        </div>

        <button className="carousel-arrow right-arrow" onClick={handleNext}>
          &#x276F; {/* Right arrow entity */}
        </button>
      </div>

      {/* {totalTestimonials > testimonialsToShow && (
        <div className="dots-container">
          {Array.from({ length: totalTestimonials - testimonialsToShow + 1 }).map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => handleDotClick(index)}
            ></span>
          ))}
        </div>
      )} */}
    </div>
  );
};

export default TestimonialsCarousel;