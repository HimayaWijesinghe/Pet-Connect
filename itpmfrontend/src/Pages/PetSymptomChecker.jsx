import React, { useState, useEffect, useRef } from 'react';
import './PetSymptomChecker.css';
import PetSymptomApiService from './PetSymptomApiService';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import emailjs from 'emailjs-com';

const PetSymptomChecker = () => {

  const apiService = new PetSymptomApiService();
  
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    petType: '',
    petName: '',
    sex: '',
    age: '',
    isSpayed: null,
    mainSymptom: ''
  });
  
  const [recommendation, setRecommendation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [symptoms, setSymptoms] = useState([]);
  const [sessionId, setSessionId] = useState(null);
  
  // New states for email and PDF functionality
  const [emailAddress, setEmailAddress] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  
  // Add ref for the report content
  const reportRef = useRef(null);

  useEffect(() => {
    const fetchSymptoms = async () => {
      try {
        const response = await apiService.getSymptoms();
        if (response.success) {
          setSymptoms(response.data);
        } else {
          setError("Failed to load symptoms. Please try again.");
        }
      } catch (err) {
        setError("An error occurred. Please try again.");
      }
    };
    
    fetchSymptoms();
    
    const urlParams = new URLSearchParams(window.location.search);
    const sid = urlParams.get('sid');
    if (sid) {
      loadSessionData(sid);
    }
  }, []);
  
  const loadSessionData = async (sid) => {
    setIsLoading(true);
    try {
      const response = await apiService.getSession(sid);
      if (response.success) {
        setFormData(response.sessionData);
        setSessionId(sid);
    
        if (response.sessionData.mainSymptom) {
          setStep(6);
          getRecommendation(response.sessionData);
        }
      } else {
        setError("Failed to load session data.");
      }
    } catch (err) {
      setError("An error occurred loading session data.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const saveSession = async () => {
    setIsLoading(true);
    try {
      const response = await apiService.saveSession({
        ...formData,
        timestamp: new Date().toISOString()
      });
      
      if (response.success) {
        setSessionId(response.sessionId);
     
        window.history.pushState(
          {}, 
          '', 
          `${window.location.pathname}?sid=${response.sessionId}`
        );
        return response.sessionId;
      } else {
        setError("Failed to save session.");
        return null;
      }
    } catch (err) {
      setError("An error occurred saving your session.");
      return null;
    } finally {
      setIsLoading(false);
    }
  };
  
  const getRecommendation = async (data) => {
    setIsLoading(true);
    try {
      const response = await apiService.getRecommendation(data || formData);
      if (response.success) {
        setRecommendation(response.data);
      } else {
        setError("Failed to generate recommendation.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const getFirstAidInfo = async (symptom) => {
    try {
      const response = await apiService.getFirstAidInfo(symptom);
      if (response.success) {
        return response.data;
      } else {
        return "No specific first aid available. Please contact your veterinarian.";
      }
    } catch (err) {
      console.error("Error fetching first aid info:", err);
      return "No specific first aid available. Please contact your veterinarian.";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
 
  const handleOptionSelect = (field, value) => {
    setFormData(prevState => ({
      ...prevState,
      [field]: value
    }));
    
    if (step >= 2 && step <= 4) {
      setStep(step + 1);
    }
  };

  const nextStep = async () => {
    if (step === 5) {
      await getRecommendation();
      await saveSession();
    }
    setStep(step + 1);
  };
 
  const prevStep = () => {
    setStep(step - 1);
  };

  // PDF Generation Function
  const generatePdfReport = async () => {
    if (!reportRef.current) return null;
    
    setIsGeneratingPdf(true);
    
    try {
      const canvas = await html2canvas(reportRef.current, {
        scale: 2,
        logging: false,
        useCORS: true
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      
      pdf.addImage(imgData, 'PNG', imgX, 10, imgWidth * ratio, imgHeight * ratio);
      
      // Add footer
      pdf.setFontSize(10);
      pdf.setTextColor(100, 100, 100);
      pdf.text('This report is for educational purposes only and is not a substitute for veterinary care.', 
        pdfWidth / 2, pdfHeight - 10, { align: 'center' });
      
      const pdfBlob = pdf.output('blob');
      return { pdf, pdfBlob };
    } catch (err) {
      console.error("Error generating PDF:", err);
      setError("Failed to generate report. Please try again.");
      return null;
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  // Email Function
  const sendEmailWithReport = async () => {
    if (!emailAddress || !emailAddress.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError("Please enter a valid email address.");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const pdfResult = await generatePdfReport();
      if (!pdfResult) {
        throw new Error("Failed to generate report");
      }
      
      const { pdf, pdfBlob } = pdfResult;
      
      // Convert PDF blob to base64
      const reader = new FileReader();
      reader.readAsDataURL(pdfBlob);
      reader.onloadend = async function() {
        const base64data = reader.result;
        
        // Configure EmailJS to use your service and template IDs
        const templateParams = {
          to_email: emailAddress,
          pet_name: formData.petName || formData.petType,
          pet_type: formData.petType,
          symptom: formData.mainSymptom,
          recommendation: recommendation,
          pdf_attachment: base64data
        };
        
        try {
          // Replace these with your actual EmailJS service and template IDs
          await emailjs.send(
            'YOUR_SERVICE_ID',
            'YOUR_TEMPLATE_ID',
            templateParams,
            'YOUR_USER_ID'
          );
          
          // Log email activity in your analytics or backend system
          if (sessionId) {
            await apiService.logEmailActivity(emailAddress, sessionId);
          }
          
          setIsEmailSent(true);
          setError('');
        } catch (err) {
          console.error("Error sending email:", err);
          setError("Failed to send email. Please try again.");
        }
      };
    } catch (err) {
      console.error("Error in email process:", err);
      setError("Failed to process report. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Download PDF Function
  const downloadPdf = async () => {
    setIsLoading(true);
    try {
      const pdfResult = await generatePdfReport();
      if (pdfResult) {
        const { pdf } = pdfResult;
        const fileName = `${formData.petType}${formData.petName ? '_' + formData.petName : ''}_Symptom_Report.pdf`;
        pdf.save(fileName);
        
        // Track the download event for analytics
        if (window.dataLayer) {
          window.dataLayer.push({
            event: 'pet_report_download',
            petType: formData.petType,
            symptom: formData.mainSymptom
          });
        }
      }
    } catch (err) {
      console.error("Error downloading PDF:", err);
      setError("Failed to download report. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <div className="card">
            <h2 className="heading">Use this tool created with the help of Chewy's vet team to quickly find out what might be going on and what to do next.</h2>
            <p className="paragraph">What type of pet do you have?</p>
            <div className="options">
              <button 
                className={`button ${formData.petType === 'Dog' ? 'selected' : ''}`}
                onClick={() => handleOptionSelect('petType', 'Dog')}
              >
                Dog
              </button>
              <button 
                className={`button ${formData.petType === 'Cat' ? 'selected' : ''}`}
                onClick={() => handleOptionSelect('petType', 'Cat')}
              >
                Cat
              </button>
            </div>
            <div className="input-container">
              <label className="label">
                Pet's Name (optional)
              </label>
              <input
                type="text"
                name="petName"
                value={formData.petName}
                onChange={handleChange}
                className="input"
                placeholder="Enter name (optional)"
              />
            </div>
            <button 
              onClick={nextStep}
              className="start-button"
              disabled={!formData.petType}
            >
              Continue
            </button>
            {!formData.petType && (
              <p className="error-message">Please select a pet type to continue</p>
            )}
            <p className="disclaimer">
              The PetMD Symptom Checker, including related information and articles on this Site, is for educational purposes only and is not a substitute for veterinary care provided by a licensed veterinarian.
            </p>
          </div>
        );
      
      case 2:
        return (
          <div className="card">
            <h2 className="heading">Tell us about your {formData.petType.toLowerCase()}{formData.petName ? ` (${formData.petName})` : ''}</h2>
            <p className="paragraph">What's their sex?</p>
            <div className="options">
              <button 
                className={`button ${formData.sex === 'Male' ? 'selected' : ''}`}
                onClick={() => handleOptionSelect('sex', 'Male')}
              >
                Male
              </button>
              <button 
                className={`button ${formData.sex === 'Female' ? 'selected' : ''}`}
                onClick={() => handleOptionSelect('sex', 'Female')}
              >
                Female
              </button>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="card">
            <h2 className="heading">How old is {formData.sex === 'Male' ? 'he' : 'she'}?</h2>
            <div className="options">
              <button 
                className={`button ${formData.age === 'Puppy (up to 2 years old)' ? 'selected' : ''}`}
                onClick={() => handleOptionSelect('age', 'Puppy (up to 2 years old)')}
              >
                {formData.petType === 'Dog' ? 'Puppy' : 'Kitten'} (up to 2 years old)
              </button>
              <button 
                className={`button ${formData.age === 'Adult (2-7 years old)' ? 'selected' : ''}`}
                onClick={() => handleOptionSelect('age', 'Adult (2-7 years old)')}
              >
                Adult (2-7 years old)
              </button>
              <button 
                className={`button ${formData.age === 'Senior (8+ years old)' ? 'selected' : ''}`}
                onClick={() => handleOptionSelect('age', 'Senior (8+ years old)')}
              >
                Senior (8+ years old)
              </button>
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className="card">
            <h2 className="heading">
              Is your {formData.petType.toLowerCase()} {formData.sex === 'Male' ? 'neutered' : 'spayed'}?
            </h2>
            <div className="options">
              <button 
                className={`button ${formData.isSpayed === true ? 'selected' : ''}`}
                onClick={() => handleOptionSelect('isSpayed', true)}
              >
                Yes
              </button>
              <button 
                className={`button ${formData.isSpayed === false ? 'selected' : ''}`}
                onClick={() => handleOptionSelect('isSpayed', false)}
              >
                No
              </button>
            </div>
          </div>
        );
      
      case 5:
        return (
          <div className="card">
            <h2 className="heading">Select the main symptom</h2>
            <div className="input-container">
              <label className="label">Choose a symptom:</label>
              <select
                name="mainSymptom"
                value={formData.mainSymptom}
                onChange={handleChange}
                className="dropdown"
              >
                <option value="">Select a symptom...</option>
                {symptoms.map((symptom, index) => (
                  <option key={index} value={symptom}>
                    {symptom}
                  </option>
                ))}
              </select>
            </div>
            <div className="options">
              <button 
                onClick={nextStep}
                className="start-button"
                disabled={!formData.mainSymptom || isLoading}
              >
                {isLoading ? 'Loading...' : 'Continue'}
              </button>
              <button 
                onClick={prevStep}
                className="back-button"
                disabled={isLoading}
              >
                Back
              </button>
            </div>
          </div>
        );
      
      case 6:
        return (
          <div className="card">
            <h2 className="heading">Recommendation for {formData.mainSymptom}</h2>
            {isLoading ? (
              <p className="paragraph">Loading recommendation...</p>
            ) : (
              <>
                <div className="first-aid-box" ref={reportRef}>
                  <div className="report-header">
                    <h3>Pet Symptom Report</h3>
                    <p>{new Date().toLocaleDateString()}</p>
                  </div>
                  
                  <div className="pet-info-summary">
                    <h4>Pet Information</h4>
                    <p><strong>Type:</strong> {formData.petType}</p>
                    {formData.petName && <p><strong>Name:</strong> {formData.petName}</p>}
                    <p><strong>Sex:</strong> {formData.sex}</p>
                    <p><strong>Age:</strong> {formData.age}</p>
                    <p><strong>{formData.sex === 'Male' ? 'Neutered' : 'Spayed'}:</strong> {formData.isSpayed ? 'Yes' : 'No'}</p>
                  </div>
                  
                  <div className="symptom-info">
                    <h4>Symptom Assessment</h4>
                    <p><strong>Main Symptom:</strong> {formData.mainSymptom}</p>
                    <h4>Recommendation</h4>
                    <p>{recommendation}</p>
                    
                    <h4>Next Steps</h4>
                    <ul className="next-steps-list">
                      <li>Keep monitoring your pet's condition</li>
                      <li>Contact your veterinarian if symptoms persist or worsen</li>
                      <li>Keep your pet comfortable and ensure access to water</li>
                      <li>Follow any specific first aid instructions provided above</li>
                    </ul>
                  </div>
                </div>
                
                <div className="actions-container">
                  <h3>Share Your Results</h3>
                  
                  <div className="report-actions">
                    <button 
                      onClick={downloadPdf} 
                      className="action-button download-button"
                      disabled={isLoading || isGeneratingPdf}
                    >
                      {isGeneratingPdf ? 'Generating PDF...' : 'Download PDF Report'}
                    </button>
                    
                    <div className="email-form">
                      <label className="label">Email the report:</label>
                      <div className="email-input-group">
                        <input
                          type="email"
                          value={emailAddress}
                          onChange={(e) => setEmailAddress(e.target.value)}
                          className="input email-input"
                          placeholder="Enter your email"
                          disabled={isLoading || isEmailSent}
                        />
                        <button 
                          onClick={sendEmailWithReport} 
                          className="action-button email-button"
                          disabled={isLoading || isEmailSent || !emailAddress}
                        >
                          {isLoading ? 'Sending...' : isEmailSent ? 'Sent!' : 'Send Email'}
                        </button>
                      </div>
                      {isEmailSent && (
                        <p className="success-message">Report sent successfully!</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="share-link-section">
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(
                          `${window.location.origin}${window.location.pathname}?sid=${sessionId}`
                        );
                        alert("Shareable link copied to clipboard!");
                      }} 
                      className="share-button"
                      disabled={!sessionId}
                    >
                      Copy Shareable Link
                    </button>
                  </div>
                </div>
              </>
            )}
            <div className="options">
              <button onClick={() => {
                setStep(1);
                setFormData({
                  petType: '',
                  petName: '',
                  sex: '',
                  age: '',
                  isSpayed: null,
                  mainSymptom: ''
                });
                setRecommendation('');
                setSessionId(null);
                setEmailAddress('');
                setIsEmailSent(false);
                window.history.pushState({}, '', window.location.pathname);
              }} className="back-button">
                Start Over
              </button>
            </div>
          </div>
        );

      default:
        return (
          <div className="card">
            <h2 className="heading">Thank you for using our Symptom Checker!</h2>
            <p className="paragraph">You can always come back for more information or advice.</p>
            <button onClick={() => setStep(1)} className="start-button">Start Over</button>
          </div>
        );
    }
  };

  const renderSidebar = () => {
    return (
      <div className="sidebar">
        <h3 className="sidebar-title">Pet Information</h3>
        <div className="sidebar-content">
          <div className="sidebar-item">
            <div className="sidebar-label">Pet Type</div>
            <div className="sidebar-value">
              {formData.petType || <span className="sidebar-empty">Not selected</span>}
            </div>
          </div>
          
          {formData.petName && (
            <div className="sidebar-item">
              <div className="sidebar-label">Pet Name</div>
              <div className="sidebar-value">{formData.petName}</div>
            </div>
          )}
          
          <div className="sidebar-item">
            <div className="sidebar-label">Sex</div>
            <div className="sidebar-value">
              {formData.sex || <span className="sidebar-empty">Not selected</span>}
            </div>
          </div>
          
          <div className="sidebar-item">
            <div className="sidebar-label">Age</div>
            <div className="sidebar-value">
              {formData.age || <span className="sidebar-empty">Not selected</span>}
            </div>
          </div>
          
          {formData.isSpayed !== null && (
            <div className="sidebar-item">
              <div className="sidebar-label">
                {formData.sex === 'Male' ? 'Neutered' : 'Spayed'}
              </div>
              <div className="sidebar-value">
                {formData.isSpayed ? 'Yes' : 'No'}
              </div>
            </div>
          )}
          
          {formData.mainSymptom && (
            <div className="sidebar-item">
              <div className="sidebar-label">Main Symptom</div>
              <div className="sidebar-value">{formData.mainSymptom}</div>
            </div>
          )}
        </div>
        
        <div className="sidebar-footer">
          <p className="disclaimer">
            This information is for educational purposes only and not a substitute for professional veterinary advice.
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="pet-checker-layout">
      {renderSidebar()}
      <div className="main-content">
        <div className="container">
          <div className="step-indicator-container">
            <div className={`step-indicator ${step === 1 ? 'active' : ''}`}>1</div>
            <div className={`step-connector ${step > 1 ? 'completed' : ''}`} />
            <div className={`step-indicator ${step === 2 ? 'active' : ''}`}>2</div>
            <div className={`step-connector ${step > 2 ? 'completed' : ''}`} />
            <div className={`step-indicator ${step === 3 ? 'active' : ''}`}>3</div>
            <div className={`step-connector ${step > 3 ? 'completed' : ''}`} />
            <div className={`step-indicator ${step === 4 ? 'active' : ''}`}>4</div>
            <div className={`step-connector ${step > 4 ? 'completed' : ''}`} />
            <div className={`step-indicator ${step === 5 ? 'active' : ''}`}>5</div>
            <div className={`step-connector ${step > 5 ? 'completed' : ''}`} />
            <div className={`step-indicator ${step === 6 ? 'active' : ''}`}>6</div>
          </div>
          {error && <div className="error-message">{error}</div>}
          {renderStep()}
        </div>
      </div>
    </div>
  );
};

export default PetSymptomChecker;