import React, { useEffect, useRef } from "react";
import { FaPaw, FaUserFriends, FaAward, FaHandHoldingHeart } from "react-icons/fa";
import { MdPets, MdOutlineVolunteerActivism } from "react-icons/md";
import Footer from "./Footer";
import "./Aboutus.css";
import Navbar from "./Navbar";

const Aboutus = () => {

  // Animation observer
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

  return (
  
    <div className="about-us-container">

      {/* Hero Section */}
      <div className="about-hero-section">
      <Navbar/>
        <div className="about-hero-overlay"></div>
        <div className="about-hero-content">
          <h1 className="about-hero-title slide-up">About Pet Connect</h1>
          <p className="about-hero-subtitle fade-in">Creating healthier, happier relationships between pets and their owners</p>
          <div className="paw-divider">
            <FaPaw />
            <div className="divider-line"></div>
            <FaPaw />
            <div className="divider-line"></div>
            <FaPaw />
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="story-section">
        <div className="section-container">
          <h2 className="section-title fade-in">Our Story</h2>
          <div className="story-content">
            <div className="story-image slide-in-left"></div>
            <div className="story-text slide-in-right">
              <h3>How It All Started</h3>
              <p>
                Pet Connect was born out of a shared passion for animal welfare and a recognition that many pet owners lack access to reliable information during crucial moments. Founded in 2021 by a team of veterinarians, animal behaviorists, and pet enthusiasts, our platform aims to bridge the knowledge gap in pet care.
              </p>
              <p>
                After witnessing countless preventable pet emergencies and training challenges, our founders decided to create a comprehensive resource that empowers pet owners with the knowledge they need to provide the best care possible for their beloved companions.
              </p>
              <div className="story-quote">
                <blockquote>"Every pet deserves an informed owner, and every owner deserves accessible guidance."</blockquote>
                <cite>— Dr. Samantha Brooks, Co-Founder</cite>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission & Values Section */}
      <div className="mission-section">
        <div className="section-container">
          <h2 className="section-title fade-in">Our Mission & Values</h2>
          <p className="mission-statement slide-up">
            At Pet Connect, we're dedicated to enhancing the lives of pets and their owners through education, emergency preparedness, and expert guidance.
          </p>
          
          <div className="values-container">
            <div className="value-card fade-in">
              <div className="value-icon">
                <FaHandHoldingHeart />
              </div>
              <h3>Compassion</h3>
              <p>We approach every animal and owner with empathy and understanding, recognizing the unique bond they share.</p>
            </div>
            
            <div className="value-card fade-in">
              <div className="value-icon">
                <FaAward />
              </div>
              <h3>Excellence</h3>
              <p>We are committed to providing the highest quality information and resources based on scientific research and expert knowledge.</p>
            </div>
            
            <div className="value-card fade-in">
              <div className="value-icon">
                <MdOutlineVolunteerActivism />
              </div>
              <h3>Accessibility</h3>
              <p>We believe that quality pet care information should be available to everyone, regardless of location or background.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Team Section */}
      <div className="team-section">
        <div className="section-container">
          <h2 className="section-title fade-in">Meet Our Team</h2>
          <p className="team-intro slide-up">
            Our diverse team brings together expertise in veterinary medicine, animal behavior, training, and emergency care.
          </p>
          
          <div className="team-grid">
            <div className="team-member slide-in-left">
              <div className="member-photo"></div>
              <h3>Dr. Samantha Brooks</h3>
              <p className="member-title">Co-Founder & Veterinarian</p>
              <p>15+ years experience in emergency veterinary care and a passion for preventive education.</p>
            </div>
            
            <div className="team-member slide-up">
              <div className="member-photo"></div>
              <h3>Marcus Chen</h3>
              <p className="member-title">Animal Behaviorist</p>
              <p>Certified animal behaviorist specializing in positive reinforcement training techniques.</p>
            </div>
            
            <div className="team-member slide-in-right">
              <div className="member-photo"></div>
              <h3>Aisha Johnson</h3>
              <p className="member-title">Pet Nutrition Specialist</p>
              <p>Expert in developing dietary plans for pets with special needs and health conditions.</p>
            </div>
            
            <div className="team-member slide-in-left">
              <div className="member-photo"></div>
              <h3>Carlos Rodriguez</h3>
              <p className="member-title">Emergency Response Trainer</p>
              <p>Former emergency vet tech who now teaches pet owners how to handle medical emergencies.</p>
            </div>
            
            <div className="team-member slide-up">
              <div className="member-photo"></div>
              <h3>Emma Wilson</h3>
              <p className="member-title">Content Director</p>
              <p>Ensures all information is accurate, accessible, and engaging for pet owners of all experience levels.</p>
            </div>
            
            <div className="team-member slide-in-right">
              <div className="member-photo"></div>
              <h3>Dr. James Park</h3>
              <p className="member-title">Veterinary Consultant</p>
              <p>Specializes in integrative medicine and holistic approaches to pet wellness.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials with Different Format */}
      <div className="about-testimonials-section">
        <div className="section-container">
          <h2 className="section-title fade-in">What Our Community Says</h2>
          
          <div className="testimonial-slider">
            <div className="testimonial-slide fade-in">
              <div className="testimonial-content">
                <p>"Pet Connect's resources have completely transformed how I care for my senior dog. The team's expertise and compassion shine through in everything they do."</p>
                <div className="testimonial-author">
                  <div className="author-avatar"></div>
                  <div className="author-info">
                    <h4>Jessica T.</h4>
                    <p>Owner of 14-year-old Golden Retriever</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="testimonial-slide fade-in">
              <div className="testimonial-content">
                <p>"As a first-time pet owner, I was overwhelmed until I found Pet Connect. Their step-by-step training guides have made such a difference for both me and my rescue cat."</p>
                <div className="testimonial-author">
                  <div className="author-avatar"></div>
                  <div className="author-info">
                    <h4>David L.</h4>
                    <p>New pet parent</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="testimonial-slide fade-in">
              <div className="testimonial-content">
                <p>"The emergency care information from Pet Connect saved my puppy's life when she ingested something toxic. I knew exactly what to do while rushing to the vet."</p>
                <div className="testimonial-author">
                  <div className="author-avatar"></div>
                  <div className="author-info">
                    <h4>Priya M.</h4>
                    <p>Dog mom to energetic terrier mix</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Impact Section */}
      <div className="impact-section">
        <div className="section-container">
          <h2 className="section-title fade-in">Our Impact</h2>
          
          <div className="impact-stats">
            <div className="stat-card zoom-in">
              <div className="stat-number">50,000+</div>
              <p>Pet owners educated</p>
            </div>
            
            <div className="stat-card zoom-in">
              <div className="stat-number">200+</div>
              <p>Training guides created</p>
            </div>
            
            <div className="stat-card zoom-in">
              <div className="stat-number">15,000+</div>
              <p>Emergency situations guided</p>
            </div>
            
            <div className="stat-card zoom-in">
              <div className="stat-number">98%</div>
              <p>User satisfaction rate</p>
            </div>
          </div>
          
          <div className="impact-story slide-up">
            <h3>Making A Difference</h3>
            <p>
              Through our platform, we've helped thousands of pet owners provide better care, prevent emergencies, and build stronger bonds with their companions. We regularly partner with animal shelters to provide free resources to new adopters, helping them start their pet parenthood journey on the right foot.
            </p>
            <p>
              Our community outreach program also brings pet education to schools and community centers, fostering responsible pet ownership from an early age.
            </p>
          </div>
        </div>
      </div>
      
      {/* Join Us CTA Section */}
      <div className="join-section">
        <div className="join-overlay"></div>
        <div className="section-container">
          <h2 className="join-title slide-up">Join Our Pet-Loving Community</h2>
          <p className="join-description fade-in">
            Connect with fellow pet owners, access exclusive content, and be part of our mission to improve pet care worldwide.
          </p>
          <div className="join-buttons">
            <button className="primary-btn slide-in-left">Sign Up Now</button>
            <button className="secondary-btn slide-in-right">Learn More</button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Aboutus;