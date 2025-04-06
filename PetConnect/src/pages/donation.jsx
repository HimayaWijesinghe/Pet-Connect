import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import jsPDF from 'jspdf';
import { getAllDonations, createDonation } from '../server/donations_functions';

// Define categories data
const categories = [
  {
    id: 'shelter',
    name: 'Shelter Support',
    description: 'Help provide safe shelters for lost pets while we search for their families.',
    image: 'https://images.unsplash.com/photo-1455103493930-a116f655b6c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 'food',
    name: 'Food & Care',
    description: 'Provide nutritious meals and daily care for pets in our temporary shelters.',
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 'medical',
    name: 'Medical Fund',
    description: 'Support emergency medical care for injured or sick lost pets.',
    image: 'https://th.bing.com/th/id/R.cb6e9cf5a8b86698e0bc328ddf7b6415?rik=46DqzTo%2bdBNkvw&pid=ImgRaw&r=0'
  }
];

// Sample pet images
const petImages = [
  'https://images.unsplash.com/photo-1544568100-847a948585b9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1561037404-61cd46aa615b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1586671267731-da2cf3ceeb80?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
];

// Zod schemas for validation
const cardSchema = z.object({
  cardName: z.string().min(1, 'Cardholder name is required'),
  cardNumber: z.string().regex(/^\d{16}$/, 'Invalid card number'),
  cardExpiry: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Invalid expiry date'),
  cardCvc: z.string().regex(/^\d{3}$/, 'Invalid CVC').max(3),
});

const addressSchema = z.object({
  email: z.string().email('Invalid email address'),
  street: z.string().min(1, 'Street is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zip: z.string().min(1, 'ZIP code is required'),
  country: z.string().min(1, 'Country is required'),
});

const confirmSchema = z.object({
  message: z.string().optional(),
});

const formSchema = cardSchema.merge(addressSchema).merge(confirmSchema);

const editDonorSchema = z.object({
  donorName: z.string().min(1, 'Name is required'),
  donorEmail: z.string().email('Invalid email address'),
  amount: z.number().min(1, 'Amount must be greater than 0'),
  category: z.string().min(1, 'Category is required'),
  message: z.string().optional(),
});

const DonationPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    amount: '',
    category: 'shelter',
    message: ''
  });

  const [donators, setDonators] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [donations, setDonations] = useState([]);
  const [donationsLoading, setDonationsLoading] = useState(true);
  const [donationsError, setDonationsError] = useState(null);
  const [showPaymentGateway, setShowPaymentGateway] = useState(false);
  const [donationSubmitted, setDonationSubmitted] = useState(false);
  const [submittedDonation, setSubmittedDonation] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const { register, handleSubmit: handlePaymentSubmitForm } = useForm({
    resolver: zodResolver(formSchema),
  });

  const { register: registerEdit, handleSubmit: handleEditSubmit, reset: resetEdit, formState: { errors: editErrors } } = useForm({
    resolver: zodResolver(editDonorSchema),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleDonationSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!formData.name || !formData.email || !formData.amount) {
      setError('Please fill in all required fields');
      setIsLoading(false);
      return;
    }

    setShowPaymentGateway(true);
    setIsLoading(false);
  };

  const handlePaymentSubmit = async (paymentData) => {
    try {
      setIsLoading(true);
      
      const donationData = {
        donorName: formData.name,
        donorEmail: formData.email,
        amount: parseInt(formData.amount, 10),
        category: formData.category,
        message: formData.message || "No message",
        paymentDetails: {
          cardName: paymentData.cardName,
          cardNumberLast4: paymentData.cardNumber?.slice(-4) || '0000'
        },
        donationDate: new Date().toISOString()
      };

      const response = await fetch("http://localhost:3001/api/create-donation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(donationData),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status} ${response.statusText}`);
      }

      const responseData = await response.json();
      const newDonation = responseData.savedDonation;

      if (!newDonation || !newDonation._id) {
        throw new Error("Invalid response from server");
      }

      setDonationSubmitted(true);
      setSubmittedDonation(newDonation);
      setShowPaymentGateway(false);
      setDonators([newDonation, ...donators]);
      setDonations([newDonation, ...donations]);

      setFormData({
        name: "",
        email: "",
        amount: "",
        category: "shelter",
        message: "",
      });

    } catch (err) {
      setError("Failed to submit donation. Please try again.");
      console.error("Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditDonor = async (data, donorId) => {
    try {
      setIsLoading(true);
      setError(null);
  
      const updatedDonation = {
        donorName: data.donorName,
        donorEmail: data.donorEmail,
        amount: data.amount,
        category: data.category,
        message: data.message || "No message",
        donationDate: new Date().toISOString(), // Update the date to current time
        paymentDetails: donations.find(d => d._id === donorId)?.paymentDetails || {}
      };
  
      const response = await fetch(`http://localhost:3001/api/update-donation/${donorId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedDonation),
      });
  
      if (!response.ok) {
        throw new Error(`Server error: ${response.status} ${response.statusText}`);
      }
  
      const updatedData = await response.json();
      const updatedDonationFromServer = updatedData.updatedDonation || updatedDonation;
  
      // Update the donations state
      setDonations(prev => 
        prev.map(donation => 
          donation._id === donorId ? updatedDonationFromServer : donation
        )
      );
      
      // Update the donators state if needed
      setDonators(prev => 
        prev.map(donation => 
          donation._id === donorId ? updatedDonationFromServer : donation
        )
      );
  
      setShowEditModal(false);
      resetEdit();
  
    } catch (err) {
      setError("Failed to update donation. Please try again.");
      console.error("Error:", err);
    } finally {
      setIsLoading(false);
    }
  };
  const generateDonationReceipt = (donation) => {
    try {
      if (!donation) {
        console.error("No donation data provided for receipt generation");
        return;
      }
      
      const doc = new jsPDF();
      doc.setFontSize(22);
      doc.setTextColor(59, 130, 246);
      doc.text('Donation Receipt', 105, 20, { align: 'center' });
      doc.setFontSize(14);
      doc.setTextColor(0, 0, 0);
      doc.text('Thank you for your generous contribution!', 105, 30, { align: 'center' });
      doc.setDrawColor(200, 200, 200);
      doc.line(20, 35, 190, 35);
      doc.setFontSize(12);
      doc.setTextColor(60, 60, 60);
      
      const categoryName = categories.find(c => c.id === donation.category)?.name || 'General';
      const donationDate = donation.donationDate 
        ? new Date(donation.donationDate).toLocaleDateString() 
        : new Date().toLocaleDateString();
      
      const donationInfo = [
        ['Receipt Date', donationDate],
        ['Donor Name', donation.donorName || 'Anonymous'],
        ['Email', donation.donorEmail || 'Not provided'],
        ['Donation Amount', `LKR ${donation.amount || 0}`],
        ['Donation Category', categoryName],
        ['Message', donation.message || 'No message']
      ];
      
      let yPos = 50;
      donationInfo.forEach(([label, value]) => {
        doc.setFont(undefined, 'bold');
        doc.text(`${label}:`, 20, yPos);
        doc.setFont(undefined, 'normal');
        doc.text(value, 70, yPos);
        yPos += 10;
      });
      
      doc.setDrawColor(200, 200, 200);
      doc.line(20, yPos + 5, 190, yPos + 5);
      doc.setFontSize(10);
      doc.text('Your donation helps us in our mission to reunite lost pets with their families.', 105, yPos + 15, { align: 'center' });
      doc.text('Tax Receipt ID: ' + (donation._id || 'TEMP-' + new Date().getTime()), 105, yPos + 25, { align: 'center' });
      doc.setFontSize(8);
      doc.text('This is an official receipt for your tax-deductible contribution.', 105, 280, { align: 'center' });
      
      const fileName = `Donation_Receipt_${donation.donorName || 'Anonymous'}_${new Date().getTime()}.pdf`;
      doc.save(fileName);
      return true;
    } catch (error) {
      console.error("Error generating PDF:", error);
      return false;
    }
  };

  useEffect(() => {
    async function fetchDonations() {
      try {
        setDonationsLoading(true);
        setDonationsError(null);

        const response = await getAllDonations();
        console.log("Full API Response:", response);

        const donationsArray = response?.response && Array.isArray(response.response) 
          ? response.response 
          : [];

        console.log("Extracted Donations:", donationsArray);
        setDonations(donationsArray);
      } catch (error) {
        console.error("Error fetching donations:", error);
        setDonationsError("Failed to load donations. Please try again later.");
        setDonations([]);
      } finally {
        setDonationsLoading(false);
      }
    }

    fetchDonations();
  }, []);

  const PaymentGateway = () => {
    const [step, setStep] = useState(0);
    const [formValues, setFormValues] = useState({
      cardName: '',
      cardNumber: '',
      cardExpiry: '',
      cardCvc: '',
      email: formData.email || '',
      street: '',
      city: '',
      state: '',
      zip: '',
      country: '',
      message: formData.message || ''
    });

    const handleNext = async () => {
      if (step < 2) setStep(step + 1);
    };

    const handleCancel = () => {
      setShowPaymentGateway(false);
      setIsLoading(false);
    };

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormValues({
        ...formValues,
        [name]: value
      });
    };

    const handleFinalSubmit = (e) => {
      e.preventDefault();
      handlePaymentSubmit(formValues);
    };

    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)'
        }}
      >
        <motion.div 
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          style={{
            backgroundColor: 'white',
            width: '100%',
            maxWidth: '28rem',
            padding: '2rem',
            borderRadius: '0.5rem',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1e3a8a' }}>
              {step === 0 ? 'Card Details' : step === 1 ? 'Billing Address' : 'Confirm Donation'}
            </h2>
            <button onClick={handleCancel} style={{ background: 'none', border: 'none', fontSize: '1.25rem', cursor: 'pointer', color: '#64748b' }}>×</button>
          </div>

          <form onSubmit={handleFinalSubmit}>
            {step === 0 && (
              <div style={{ display: 'grid', gap: '1rem' }}>
                <input name="cardName" value={formValues.cardName} onChange={handleInputChange} placeholder="Cardholder Name" style={{ width: '100%', padding: '0.75rem', border: '1px solid #e2e8f0', borderRadius: '0.5rem' }} />
                <input name="cardNumber" value={formValues.cardNumber} onChange={handleInputChange} placeholder="Card Number" style={{ width: '100%', padding: '0.75rem', border: '1px solid #e2e8f0', borderRadius: '0.5rem' }} />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <input name="cardExpiry" value={formValues.cardExpiry} onChange={handleInputChange} placeholder="MM/YY" style={{ width: '100%', padding: '0.75rem', border: '1px solid #e2e8f0', borderRadius: '0.5rem' }} />
                  <input name="cardCvc" value={formValues.cardCvc} onChange={handleInputChange} placeholder="CVC" style={{ width: '100%', padding: '0.75rem', border: '1px solid #e2e8f0', borderRadius: '0.5rem' }} />
                </div>
              </div>
            )}
            {step === 1 && (
              <div style={{ display: 'grid', gap: '1rem' }}>
                <input name="email" value={formValues.email} onChange={handleInputChange} placeholder="Email" style={{ width: '100%', padding: '0.75rem', border: '1px solid #e2e8f0', borderRadius: '0.5rem' }} />
                <input name="street" value={formValues.street} onChange={handleInputChange} placeholder="Street Address" style={{ width: '100%', padding: '0.75rem', border: '1px solid #e2e8f0', borderRadius: '0.5rem' }} />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <input name="city" value={formValues.city} onChange={handleInputChange} placeholder="City" style={{ width: '100%', padding: '0.75rem', border: '1px solid #e2e8f0', borderRadius: '0.5rem' }} />
                  <input name="state" value={formValues.state} onChange={handleInputChange} placeholder="State" style={{ width: '100%', padding: '0.75rem', border: '1px solid #e2e8f0', borderRadius: '0.5rem' }} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <input name="zip" value={formValues.zip} onChange={handleInputChange} placeholder="ZIP Code" style={{ width: '100%', padding: '0.75rem', border: '1px solid #e2e8f0', borderRadius: '0.5rem' }} />
                  <input name="country" value={formValues.country} onChange={handleInputChange} placeholder="Country" style={{ width: '100%', padding: '0.75rem', border: '1px solid #e2e8f0', borderRadius: '0.5rem' }} />
                </div>
              </div>
            )}
            {step === 2 && (
              <div style={{ display: 'grid', gap: '1.5rem' }}>
                <div style={{ backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '0.5rem' }}>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>Donation Summary</h3>
                  <div style={{ display: 'grid', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Amount:</span><span style={{ fontWeight: '600' }}>LKR {formData.amount}</span></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Category:</span><span>{categories.find(c => c.id === formData.category)?.name}</span></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Card:</span><span>**** **** **** {formValues.cardNumber.slice(-4)}</span></div>
                  </div>
                </div>
                <textarea name="message" value={formValues.message} onChange={handleInputChange} placeholder="Personal message (optional)" style={{ width: '100%', padding: '0.75rem', border: '1px solid #e2e8f0', borderRadius: '0.5rem', minHeight: '6rem' }} />
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem', gap: '1rem' }}>
              {step > 0 ? (
                <button type="button" onClick={() => setStep(step - 1)} style={{ padding: '0.75rem 1.5rem', color: '#3b82f6', border: '1px solid #3b82f6', borderRadius: '0.5rem', backgroundColor: 'white', cursor: 'pointer', flex: 1 }}>Back</button>
              ) : (
                <button type="button" onClick={handleCancel} style={{ padding: '0.75rem 1.5rem', color: '#64748b', border: '1px solid #e2e8f0', borderRadius: '0.5rem', backgroundColor: 'white', cursor: 'pointer', flex: 1 }}>Cancel</button>
              )}
              {step < 2 ? (
                <button type="button" onClick={handleNext} style={{ padding: '0.75rem 1.5rem', backgroundColor: '#3b82f6', color: 'white', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', flex: 1 }}>Continue</button>
              ) : (
                <button type="submit" style={{ padding: '0.75rem 1.5rem', backgroundColor: '#10b981', color: 'white', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', flex: 1 }}>Complete Donation</button>
              )}
            </div>
          </form>
        </motion.div>
      </motion.div>
    );
  };

  const DonationSuccessModal = () => {
    const [pdfGenerating, setPdfGenerating] = useState(false);

    const handleDownloadReceipt = () => {
      setPdfGenerating(true);
      try {
        const success = generateDonationReceipt(submittedDonation);
        if (!success) console.error("Failed to generate PDF");
      } catch (err) {
        console.error("Error generating PDF:", err);
      } finally {
        setPdfGenerating(false);
      }
    };

    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      >
        <motion.div 
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          style={{ backgroundColor: 'white', width: '100%', maxWidth: '28rem', padding: '2rem', borderRadius: '0.5rem', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)', textAlign: 'center' }}
        >
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#16a34a' }}>Donation Successful!</h2>
          <p style={{ marginBottom: '1.5rem' }}>Thank you for your generous support of {categories.find(c => c.id === formData.category)?.name || 'our cause'}.</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
            <button onClick={handleDownloadReceipt} disabled={pdfGenerating} style={{ padding: '0.5rem 1.5rem', backgroundColor: '#2563eb', color: 'white', borderRadius: '0.5rem', cursor: pdfGenerating ? 'wait' : 'pointer', opacity: pdfGenerating ? 0.7 : 1 }}>
              {pdfGenerating ? 'Generating...' : 'Download Receipt'}
            </button>
            <button onClick={() => setDonationSubmitted(false)} style={{ padding: '0.5rem 1.5rem', color: '#2563eb', border: '1px solid #2563eb', borderRadius: '0.5rem', cursor: 'pointer' }}>Close</button>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  const EditDonorModal = () => {
    const [donorToEdit, setDonorToEdit] = useState(null);
  
    useEffect(() => {
      if (showEditModal && donations.length > 0) {
        // Get the first donation (most recent) when modal opens
        setDonorToEdit(donations[0]);
      }
    }, [showEditModal, donations]);
  
    if (!showEditModal || !donorToEdit) return null;
  
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0, 
          zIndex: 50, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          backgroundColor: 'rgba(0, 0, 0, 0.5)' 
        }}
      >
        <motion.div 
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.9 }}
          style={{ 
            backgroundColor: 'white', 
            width: '100%', 
            maxWidth: '28rem', 
            padding: '2rem', 
            borderRadius: '0.5rem', 
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' 
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1e3a8a' }}>Edit Donor</h2>
            <button 
              onClick={() => setShowEditModal(false)} 
              style={{ background: 'none', border: 'none', fontSize: '1.25rem', cursor: 'pointer', color: '#64748b' }}
            >
              ×
            </button>
          </div>
  
          <form onSubmit={handleEditSubmit((data) => handleEditDonor(data, donorToEdit._id))}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#444' }}>Name</label>
              <input 
                {...registerEdit("donorName")} 
                defaultValue={donorToEdit.donorName || ''} 
                style={{ width: '100%', padding: '0.75rem', border: '1px solid #e2e8f0', borderRadius: '0.5rem' }} 
              />
              {editErrors.donorName && <p style={{ color: '#e53935', fontSize: '0.875rem' }}>{editErrors.donorName.message}</p>}
            </div>
  
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#444' }}>Email</label>
              <input 
                {...registerEdit("donorEmail")} 
                defaultValue={donorToEdit.donorEmail || ''} 
                style={{ width: '100%', padding: '0.75rem', border: '1px solid #e2e8f0', borderRadius: '0.5rem' }} 
              />
              {editErrors.donorEmail && <p style={{ color: '#e53935', fontSize: '0.875rem' }}>{editErrors.donorEmail.message}</p>}
            </div>
  
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#444' }}>Amount</label>
              <input 
                type="number" 
                {...registerEdit("amount", { valueAsNumber: true })} 
                defaultValue={donorToEdit.amount || 0} 
                style={{ width: '100%', padding: '0.75rem', border: '1px solid #e2e8f0', borderRadius: '0.5rem' }} 
              />
              {editErrors.amount && <p style={{ color: '#e53935', fontSize: '0.875rem' }}>{editErrors.amount.message}</p>}
            </div>
  
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#444' }}>Category</label>
              <select 
                {...registerEdit("category")} 
                defaultValue={donorToEdit.category || 'shelter'} 
                style={{ width: '100%', padding: '0.75rem', border: '1px solid #e2e8f0', borderRadius: '0.5rem' }}
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
              {editErrors.category && <p style={{ color: '#e53935', fontSize: '0.875rem' }}>{editErrors.category.message}</p>}
            </div>
  
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#444' }}>Message (Optional)</label>
              <textarea 
                {...registerEdit("message")} 
                defaultValue={donorToEdit.message || ''} 
                style={{ width: '100%', padding: '0.75rem', border: '1px solid #e2e8f0', borderRadius: '0.5rem', minHeight: '4rem' }} 
              />
              {editErrors.message && <p style={{ color: '#e53935', fontSize: '0.875rem' }}>{editErrors.message.message}</p>}
            </div>
  
            {error && <p style={{ color: '#e53935', marginBottom: '1rem' }}>{error}</p>}
  
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
              <button 
                type="button" 
                onClick={() => setShowEditModal(false)} 
                style={{ padding: '0.75rem 1.5rem', color: '#64748b', border: '1px solid #e2e8f0', borderRadius: '0.5rem', backgroundColor: 'white', cursor: 'pointer', flex: 1 }}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                disabled={isLoading} 
                style={{ padding: '0.75rem 1.5rem', backgroundColor: '#10b981', color: 'white', borderRadius: '0.5rem', border: 'none', cursor: isLoading ? 'wait' : 'pointer', flex: 1, opacity: isLoading ? 0.7 : 1 }}
              >
                {isLoading ? 'Updating...' : 'Update'}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div className="donation-page" style={{ fontFamily: '"Poppins", sans-serif', maxWidth: '1200px', margin: '0 auto', padding: '40px 20px', backgroundColor: '#f8fafc' }}>
      <header style={{ textAlign: 'center', marginBottom: '60px', background: 'linear-gradient(135deg, rgba(58, 123, 213, 0.1), rgba(0, 210, 255, 0.1))', padding: '40px 20px', borderRadius: '16px' }}>
        <h1 style={{ color: '#3a7bd5', marginBottom: '20px', fontSize: '2.5rem', fontWeight: 700 }}>Help Pets Find Their Way Home</h1>
        <p style={{ color: '#555', fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto 30px' }}>Your donation directly supports our mission to reunite lost pets with their families and find forever homes for those in need.</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ backgroundColor: '#3a7bd5', color: 'white', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold' }}>5K+</div>
            <span>Pets Reunited</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ backgroundColor: '#3a7bd5', color: 'white', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold' }}>LKR.100K</div>
            <span>Raised in 2025</span>
          </div>
        </div>
      </header>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', marginBottom: '60px', justifyContent: 'center' }}>
        {categories.map((category) => (
          <div key={category.id} style={{ flex: '1 1 300px', borderRadius: '12px', backgroundColor: '#ffffff', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)', transition: 'transform 0.3s ease, box-shadow 0.3s ease', cursor: 'pointer', maxWidth: '350px' }} onClick={() => setFormData({...formData, category: category.id})}>
            <div style={{ height: '180px', overflow: 'hidden' }}>
              <img src={category.image} alt={category.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} />
            </div>
            <div style={{ padding: '20px' }}>
              <h3 style={{ color: '#3a7bd5', marginBottom: '10px', fontSize: '1.25rem' }}>{category.name}</h3>
              <p style={{ color: '#666', marginBottom: '20px', lineHeight: '1.6' }}>{category.description}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: '2px solid #3a7bd5', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: formData.category === category.id ? '#3a7bd5' : 'transparent' }}>
                  {formData.category === category.id && <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'white' }}></div>}
                </div>
                <span style={{ color: formData.category === category.id ? '#3a7bd5' : '#666', fontWeight: formData.category === category.id ? 600 : 400 }}>{formData.category === category.id ? 'Selected' : 'Select this cause'}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', alignItems: 'flex-start' }}>
        <div style={{ flex: '1 1 500px' }}>
          <h2 style={{ color: '#3a7bd5', marginBottom: '30px', fontSize: '1.75rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ display: 'inline-flex', backgroundColor: 'rgba(58, 123, 213, 0.1)', borderRadius: '50%', width: '40px', height: '40px', justifyContent: 'center', alignItems: 'center' }}>💙</span>
            Make a Donation
          </h2>
          <form onSubmit={handleDonationSubmit} style={{ backgroundColor: '#ffffff', padding: '30px', borderRadius: '16px', boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)' }}>
            {error && (
              <div style={{ color: '#e53935', backgroundColor: '#ffebee', padding: '10px 15px', borderRadius: '8px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span>⚠️</span>
                <span>{error}</span>
              </div>
            )}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#444', fontWeight: 500 }}>Full Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #e0e0e0', fontSize: '16px', transition: 'border-color 0.3s ease', outline: 'none' }} placeholder="Enter your name" />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#444', fontWeight: 500 }}>Email Address</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #e0e0e0', fontSize: '16px', transition: 'border-color 0.3s ease', outline: 'none' }} placeholder="Enter your email" />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#444', fontWeight: 500 }}>Donation Amount</label>
              <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #e0e0e0', borderRadius: '8px', overflow: 'hidden' }}>
                <div style={{ padding: '12px 16px', backgroundColor: 'rgba(58, 123, 213, 0.1)', color: '#3a7bd5', fontWeight: 600 }}>LKR</div>
                <input type="number" name="amount" value={formData.amount} onChange={handleChange} required min="1" style={{ flex: 1, padding: '12px 16px', border: 'none', fontSize: '16px', outline: 'none' }} placeholder="Enter amount" />
              </div>
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                {[500, 1000, 1500, 2000].map(amount => (
                  <button type="button" key={amount} onClick={() => setFormData({...formData, amount: amount})} style={{ flex: 1, padding: '8px', border: '1px solid #e0e0e0', borderRadius: '8px', backgroundColor: formData.amount === amount.toString() ? 'rgba(58, 123, 213, 0.1)' : 'white', color: formData.amount === amount.toString() ? '#3a7bd5' : '#555', fontWeight: formData.amount === amount.toString() ? 600 : 400, cursor: 'pointer' }}>LKR.{amount}</button>
                ))}
              </div>
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#444', fontWeight: 500 }}>Donation Category</label>
              <select name="category" value={formData.category} onChange={handleChange} style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #e0e0e0', fontSize: '16px', transition: 'border-color 0.3s ease', outline: 'none', appearance: 'none', backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px top 50%', backgroundSize: '12px auto', paddingRight: '40px' }}>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div style={{ marginBottom: '30px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#444', fontWeight: 500 }}>Message (Optional)</label>
              <textarea name="message" value={formData.message} onChange={handleChange} rows="4" style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #e0e0e0', fontSize: '16px', transition: 'border-color 0.3s ease', outline: 'none', resize: 'vertical' }} placeholder="Share why you're supporting our cause..." />
            </div>
            <button type="submit" disabled={isLoading} style={{ background: 'linear-gradient(135deg, #3a7bd5, #00d2ff)', color: 'white', border: 'none', padding: '14px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, width: '100%', fontSize: '16px', boxShadow: '0 4px 15px rgba(58, 123, 213, 0.3)', transition: 'all 0.3s ease', opacity: isLoading ? 0.7 : 1 }}>
              {isLoading ? 'Processing...' : 'Proceed to Payment'}
            </button>
          </form>
        </div>

        <div style={{ flex: '1 1 400px' }}>
          <h2 style={{ color: '#3a7bd5', marginBottom: '30px', fontSize: '1.75rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ display: 'inline-flex', backgroundColor: 'rgba(58, 123, 213, 0.1)', borderRadius: '50%', width: '40px', height: '40px', justifyContent: 'center', alignItems: 'center' }}>👏</span>
            Recent Donors
          </h2>
          {donationsLoading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '208px' }}>
              <div>Loading donations...</div>
            </div>
          ) : donationsError ? (
            <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '0.5rem', textAlign: 'center', color: '#ef4444' }}>
              <p>{donationsError}</p>
            </div>
          ) : !Array.isArray(donations) || donations.length === 0 ? (
            <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '0.5rem', textAlign: 'center' }}>
              <p style={{ color: '#666' }}>No donations yet. Be the first to contribute!</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '600px', overflowY: 'auto', paddingRight: '10px' }}>
              {[...donations].sort((a, b) => new Date(b.donationDate || b.createdAt) - new Date(a.donationDate || a.createdAt)).map((donation, index) => (
                <div key={index} style={{ backgroundColor: 'white', padding: '1.25rem', borderRadius: '0.5rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', transition: 'transform 0.2s ease' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ width: '3rem', height: '3rem', borderRadius: '50%', backgroundColor: '#dbeafe', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#2563eb', fontWeight: 'bold', fontSize: '1.125rem' }}>
                        {donation?.donorName?.charAt(0) || 'D'}
                      </div>
                      <div>
                        <h3 style={{ color: '#1e293b', fontWeight: '600', fontSize: '1.125rem' }}>{donation.donorName || 'Anonymous Donor'}</h3>
                        <p style={{ color: '#64748b', fontSize: '0.875rem' }}>{donation.donorEmail || 'No email provided'}</p>
                      </div>
                    </div>
                    <span style={{ background: 'linear-gradient(to right, #3b82f6, #06b6d4)', color: 'white', padding: '0.5rem 1rem', borderRadius: '9999px', fontWeight: 'bold' }}>
                      LKR. {donation.amount || '0'}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b', fontSize: '0.875rem', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px dashed #cbd5e1' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ width: '0.625rem', height: '0.625rem', borderRadius: '50%', backgroundColor: donation.category === 'shelter' ? '#10b981' : donation.category === 'food' ? '#f97316' : donation.category === 'medical' ? '#3b82f6' : '#ec4899' }}></span>
                      {categories.find((cat) => cat.id === donation.category)?.name || 'General Donation'}
                    </span>
                    <span>{donation.donationDate ? new Date(donation.donationDate).toLocaleDateString() : new Date(donation.createdAt).toLocaleDateString()}</span>
                  </div>
                  {index === 0 && (
                    <button 
                    onClick={() => {
                      console.log("Edit button clicked for donor:", donation._id);
                      setShowEditModal(true);
                    }} 
                    style={{ marginTop: '1rem', padding: '0.5rem 1rem', backgroundColor: '#f59e0b', color: 'white', borderRadius: '0.5rem', border: 'none', cursor: 'pointer' }}
                  >
                    Edit
                  </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div style={{ marginTop: '60px', padding: '30px', borderRadius: '16px', backgroundColor: 'rgba(58, 123, 213, 0.05)', textAlign: 'center' }}>
        <h3 style={{ color: '#3a7bd5', marginBottom: '15px', fontSize: '1.5rem' }}>Every Donation Makes a Difference</h3>
        <p style={{ color: '#666', maxWidth: '800px', margin: '0 auto 20px', lineHeight: '1.6' }}>
          Join our community of pet lovers who are helping reunite lost pets with their families. Your generosity helps us maintain our alert systems, support shelter partners, and provide emergency medical care.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
          {petImages.map((image, index) => (
            <img key={index} src={image} alt={`Happy pet ${index + 1}`} style={{ borderRadius: '10px', width: '100px', height: '100px', objectFit: 'cover' }} />
          ))}
        </div>
      </div>

      {showPaymentGateway && <PaymentGateway />}
      {donationSubmitted && <DonationSuccessModal />}
      {showEditModal && <EditDonorModal />}
    </div>
  );
};

export default DonationPage;