import Navbar from "./components/Navbar";
import { FaBook, FaArrowRight } from "react-icons/fa";
import { RiFirstAidKitFill } from "react-icons/ri";
import { BsChatDotsFill, BsChevronDown, BsSend } from "react-icons/bs";
import { FaPaw } from "react-icons/fa";
import "./App.css";
import Image from "./components/IMG/Image";
import Image1 from "./components/IMG/Image1";
import Footer from "./components/Footer";
import { Routes, Route, useNavigate } from "react-router-dom";
import Aboutus from "./components/Aboutus";
import { useEffect, useRef, useState } from "react";

function App() {
  const navigate = useNavigate();
  const featuresSectionRef = useRef(null);
  const aboutSectionRef = useRef(null);
  const testimonialsSectionRef = useRef(null);
  const [showChat, setShowChat] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const messageEndRef = useRef(null);


  const getResponse = (question) => {
    const lowercaseQuestion = question.toLowerCase();
    
    if (lowercaseQuestion.includes("training") || lowercaseQuestion.includes("train")) {
      return "Consistency is key for pet training! Start with basic commands like 'sit' and 'stay' using positive reinforcement. Short, regular training sessions work better than long, infrequent ones.";
    } else if (lowercaseQuestion.includes("food") || lowercaseQuestion.includes("feeding") || lowercaseQuestion.includes("diet")) {
      return "A balanced diet is essential for your pet's health. Ensure they have appropriate food for their age, size, and health needs. Always provide fresh water and consult your vet for specific dietary recommendations.";
    } else if (lowercaseQuestion.includes("health") || lowercaseQuestion.includes("vet") || lowercaseQuestion.includes("sick")) {
      return "Regular vet check-ups are important! Watch for changes in behavior, appetite, or energy levels as these may indicate health issues. Keep vaccinations up-to-date and maintain parasite prevention.";
    } else if (lowercaseQuestion.includes("grooming") || lowercaseQuestion.includes("bath")) {
      return "Regular grooming keeps your pet healthy and comfortable. Brushing helps reduce shedding and prevents matting. The bathing frequency depends on your pet's breed and lifestyle.";
    } else if (lowercaseQuestion.includes("play") || lowercaseQuestion.includes("toys") || lowercaseQuestion.includes("exercise")) {
      return "Daily exercise and play are crucial for your pet's physical and mental health. Different breeds have different exercise needs, but all pets benefit from regular activity and mental stimulation.";
    } else if (lowercaseQuestion.includes("hi") || lowercaseQuestion.includes("hello") || lowercaseQuestion.includes("hey")) {
      return "Hello! How can I help you with your pet today? Feel free to ask about training, health, nutrition, or any other pet-related concerns!";
    } else if (lowercaseQuestion.includes("emergency") || lowercaseQuestion.includes("hurt")) {
      return "If your pet is experiencing an emergency, please contact your veterinarian or emergency animal hospital immediately. For minor issues, keep a pet first aid kit handy with gauze, non-stick bandages, pet-safe antiseptic, and contact information for poison control.";
    } else if (lowercaseQuestion.includes("behavior") || lowercaseQuestion.includes("aggressive")) {
      return "Pet behavior issues often stem from anxiety, fear, or lack of training. Consult with a professional animal behaviorist for persistent problems. For minor issues, ensure your pet has proper exercise, mental stimulation, and consistent training.";
    } else {
      return "Thank you for your question! Our pet experts would be happy to help with this specific inquiry. Please provide more details about your pet and we'll give you the best advice possible.";
    }
  };

  // Scroll to section function
  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages]);

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

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const sendMessage = async () => {
    if (!message.trim()) {
      return;
    }

    try {
      setIsLoading(true);
      
      // Add the user message to chat history
      const newUserMessage = {
        text: message,
        isUser: true,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages(prev => [...prev, newUserMessage]);
      
      // Get response based on user's question
      const botAnswer = getResponse(message);
      
      // Simulate a small delay to make it feel more natural
      setTimeout(() => {
        const botResponse = {
          text: botAnswer,
          isUser: false,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setChatMessages(prev => [...prev, botResponse]);
        setIsLoading(false);
      }, 1000);
      
      // Clear message input
      setMessage("");
      
    } catch (error) {
      console.error("Error in chat:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container">
      <Navbar>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/about" element={<Aboutus />} />
        </Routes>
      </Navbar>

      {/* Hero Section */}
      <div className="hero-section">
        <Image />
        <div className="hero-content">
          <h1 className="hero-title slide-up">Welcome to Pet Connect</h1>
          <p className="hero-subtitle fade-in">Your complete solution for pet training and emergency care</p>
          <div className="hero-buttons">
            <button className="primary-btn slide-in-left" onClick={() => scrollToSection(featuresSectionRef)}>
              Explore Services
            </button>
            <button className="secondary-btn slide-in-right" onClick={() => navigate("/about")}>
              About Us
            </button>
          </div>
          <div className="scroll-indicator" onClick={() => scrollToSection(featuresSectionRef)}>
            <span>Scroll Down</span>
            <BsChevronDown className="bounce" />
          </div>
        </div>
      </div>

      <div className="features-section" ref={featuresSectionRef}>
        <h2 className="section-title fade-in">Our Services</h2>
        <div className="features-container">
          <div className="feature-card slide-in-left">
            <div className="feature-icon">
              <FaBook />
            </div>
            <h3>Training Guides</h3>
            <p>Explore comprehensive guides to train your pets effectively with scientifically-backed methods</p>
            <button className="feature-btn" onClick={() => navigate("/training")}>
              Explore Guides <FaArrowRight />
            </button>
          </div>

          <div className="feature-card slide-in-right">
            <div className="feature-icon">
              <RiFirstAidKitFill />
            </div>
            <h3>First Aid Tips</h3>
            <p>Learn essential first aid techniques to handle pet emergencies until veterinary care is available</p>
            <button className="feature-btn" onClick={() => navigate("/pet")}>
              View First Aid <FaArrowRight />
            </button>
          </div>
        </div>
      </div>

      <div className="about-section parallax-container" ref={aboutSectionRef}>
        <div className="parallax-background"></div>
        <div className="about-content">
          <h2 className="section-title light fade-in">What is Pet Connect?</h2>
          <p className="about-description slide-up">
            Pet Connect is your all-in-one platform dedicated to enhancing the bond between you and your pet through education, 
            emergency preparedness, and expert guidance. Our mission is to create healthier, happier relationships 
            between pets and their owners through accessible, reliable information.
          </p>
          <button className="learn-more-btn" onClick={() => navigate("/about")}>
            Learn More <span className="globe-icon">&#127757;</span>
          </button>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="testimonials-section" ref={testimonialsSectionRef}>
        <h2 className="section-title fade-in">What Pet Owners Say</h2>
        <div className="testimonials-container">
          <div className="testimonial-card slide-in-left">
            <div className="testimonial-avatar"><Image1/></div>
            <p>"The training guides helped my rescue dog overcome anxiety in just weeks!"</p>
            <h4>Sarah & Max</h4>
          </div>
          <div className="testimonial-card slide-up">
            <div className="testimonial-avatar"><Image1/></div>
            <p>"The first aid tips saved my cat's life when she had an emergency at night."</p>
            <h4>Michael & Whiskers</h4>
          </div>
          <div className="testimonial-card slide-in-right">
            <div className="testimonial-avatar"><Image1/></div>
            <p>"The personalized advice for my senior dog has made his golden years so much better."</p>
            <h4>Emma & Buddy</h4>
          </div>
        </div>
      </div>

      {/* Chat Button */}
      <button className="chatbot-btn pulse" onClick={() => setShowChat(!showChat)}>
        <BsChatDotsFill size={30} />
      </button>

      {/* Chat Popup */}
      {showChat && (
        <div className="chat-popup">
          <div className="chat-header">
            <h3><FaPaw style={{ marginRight: '8px' }} /> Pet Connect Chat</h3>
            <button className="close-chat" onClick={() => setShowChat(false)}>
              ×
            </button>
          </div>
          
          <div className="chat-messages">
            {chatMessages.length === 0 ? (
              <div className="welcome-message">
                <p>Hello! How can Pet Connect help you and your furry friend today? Ask us about training, health tips, or emergency care!</p>
              </div>
            ) : (
              chatMessages.map((msg, index) => (
                <div key={index} className={`message ${msg.isUser ? 'user-message' : 'bot-message'}`}>
                  <p>{msg.text}</p>
                  <span className="message-time">{msg.timestamp}</span>
                </div>
              ))
            )}
            {isLoading && (
              <div className="message bot-message typing">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            <div ref={messageEndRef} />
          </div>
          
          <div className="chat-inputs">
            <textarea
              placeholder="Type your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              className="message-input"
            />
            <button 
              onClick={sendMessage} 
              disabled={isLoading}
              className="send-button"
            >
              <BsSend size={16} />
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default App;