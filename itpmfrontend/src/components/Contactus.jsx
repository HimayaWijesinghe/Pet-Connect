import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import './Contactus.css'
import { FaPaw, FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from "react-icons/fa";
import { BsSend } from "react-icons/bs";

function Contactus() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    petType: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [submitStatus, setSubmitStatus] = useState("");

  // Animation observer effect (reusing from your App.js)
  useEffect(() => {
    const observerOptions = { threshold: 0.2, rootMargin: "0px 0px -50px 0px" };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
        }
      });
    }, observerOptions);

    // Observe all elements with animation classes
    document.querySelectorAll('.fade-in, .slide-up, .slide-in-left, .slide-in-right, .zoom-in')
      .forEach(element => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setSubmitMessage("Thank you for reaching out! Our pet experts will contact you within 24 hours.");
      setFormData({
        name: "",
        email: "",
        petType: "",
        subject: "",
        message: ""
      });
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubmitMessage("");
        setSubmitStatus("");
      }, 5000);
    }, 1500);
  };

  return (
    <div className="app-container">
      <Navbar />
      
      {/* Hero Section */}
      <div className="contact-hero-section">
        <div className="contact-hero-overlay"></div>
        <div className="contact-hero-content">
          <h1 className="hero-title slide-up">Contact Us</h1>
          <p className="hero-subtitle fade-in">We're here to help with all your pet questions</p>
        </div>
      </div>

      <div className="contact-container">
        <div className="contact-info-section slide-in-left">
          <h2><FaPaw className="icon-accent" /> Get in Touch</h2>
          <p className="contact-intro">
            Have questions about pet training, emergency care, or anything else pet-related? 
            Our team of pet experts is ready to help!
          </p>
          
          <div className="contact-details">
            <div className="contact-item">
              <FaMapMarkerAlt className="contact-icon" />
              <div>
                <h3>Visit Us</h3>
                <p>123 Pet Avenue<br />Pawsville, CA 90210</p>
              </div>
            </div>
            
            <div className="contact-item">
              <FaPhone className="contact-icon" />
              <div>
                <h3>Call Us</h3>
                <p>(555) 123-4567</p>
                <p>Emergency: (555) 987-6543</p>
              </div>
            </div>
            
            <div className="contact-item">
              <FaEnvelope className="contact-icon" />
              <div>
                <h3>Email Us</h3>
                <p>info@petconnect.com</p>
                <p>support@petconnect.com</p>
              </div>
            </div>
            
            <div className="contact-item">
              <FaClock className="contact-icon" />
              <div>
                <h3>Office Hours</h3>
                <p>Monday - Friday: 9AM - 6PM</p>
                <p>Saturday: 10AM - 4PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="contact-form-section slide-in-right">
          <h2>Send Us a Message</h2>
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="John Doe"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="john@example.com"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="petType">Type of Pet</label>
              <select
                id="petType"
                name="petType"
                value={formData.petType}
                onChange={handleChange}
                required
              >
                <option value="">Select Pet Type</option>
                <option value="dog">Dog</option>
                <option value="cat">Cat</option>
                <option value="bird">Bird</option>
                <option value="small-mammal">Small Mammal</option>
                <option value="reptile">Reptile</option>
                <option value="fish">Fish</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="How can we help you?"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="message">Your Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Tell us more about your question or concern..."
                rows="5"
              />
            </div>
            
            <button 
              type="submit" 
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Message"} <BsSend />
            </button>
            
            {submitMessage && (
              <div className={`submit-message ${submitStatus}`}>
                {submitMessage}
              </div>
            )}
          </form>
        </div>
      </div>
      
      {/* FAQ Section */}
      <div className="faq-section fade-in">
        <h2 className="section-title">Frequently Asked Questions</h2>
        <div className="faq-container">
          <div className="faq-item slide-up">
            <h3>How quickly will I get a response?</h3>
            <p>We aim to respond to all inquiries within 24 hours during business days. For emergency pet care questions, please call our emergency line.</p>
          </div>
          
          <div className="faq-item slide-up">
            <h3>Do you offer on-site training services?</h3>
            <p>Yes! Our certified trainers can visit your home for personalized pet training sessions. Contact us for availability and pricing.</p>
          </div>
          
          <div className="faq-item slide-up">
            <h3>How can I become a Pet Connect partner?</h3>
            <p>We're always looking for pet professionals to join our network. Please use our contact form and select "Partnership" as the subject.</p>
          </div>
          
          <div className="faq-item slide-up">
            <h3>Is your emergency advice available 24/7?</h3>
            <p>Our online resources are available 24/7, but for immediate emergency assistance, please contact your local veterinary emergency hospital.</p>
          </div>
        </div>
      </div>
      
      {/* Map Section */}
      <div className="map-section slide-up">
        <h2 className="section-title">Find Us</h2>
        <div className="map-container">
          {/* This would be replaced with an actual map component in a real implementation */}
          <div className="map-placeholder">
            <p>Interactive Map Would Be Displayed Here</p>
            <p>123 Pet Avenue, Pawsville, CA 90210</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Contactus;