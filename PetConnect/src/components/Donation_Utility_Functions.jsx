import { useState } from 'react';

// Initial donation categories
export const donationCategories = [
  { 
    id: 'shelter', 
    name: 'Shelter & Rescue', 
    description: 'Help provide shelter and rescue services for abandoned pets',
    image: '/api/placeholder/350/180'
  },
  { 
    id: 'food', 
    name: 'Food & Supplies', 
    description: 'Support the provision of food and essential supplies for animals in need',
    image: '/api/placeholder/350/180'
  },
  { 
    id: 'medical', 
    name: 'Medical Care', 
    description: 'Contribute to medical treatments, vaccinations, and surgeries for injured animals',
    image: '/api/placeholder/350/180'
  }
];

// Function to validate donation form
export const validateDonationForm = (formData) => {
  const errors = {};

  // Name validation
  if (!formData.name.trim()) {
    errors.name = 'Name is required';
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formData.email.trim()) {
    errors.email = 'Email is required';
  } else if (!emailRegex.test(formData.email)) {
    errors.email = 'Invalid email format';
  }

  // Amount validation
  const amount = parseFloat(formData.amount);
  if (isNaN(amount) || amount <= 0) {
    errors.amount = 'Amount must be a positive number';
  }

  // Category validation
  if (!donationCategories.some(cat => cat.id === formData.category)) {
    errors.category = 'Invalid donation category';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Function to format currency
export const formatCurrency = (amount, locale = 'en-LK', currency = 'LKR') => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency
  }).format(amount);
};

// Hook for managing donation form state
export const useDonationForm = (initialState = {}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    amount: '',
    category: 'shelter',
    message: '',
    ...initialState
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear specific error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      amount: '',
      category: 'shelter',
      message: ''
    });
    setErrors({});
  };

  const handleSubmit = (e, onSuccessCallback) => {
    e.preventDefault();
    
    const validationResult = validateDonationForm(formData);
    
    if (validationResult.isValid) {
      // Process donation - could include API call, local storage, etc.
      const newDonation = {
        ...formData,
        id: Date.now(),
        date: new Date().toISOString().split('T')[0]
      };
      
      // Call success callback with new donation
      if (onSuccessCallback) {
        onSuccessCallback(newDonation);
      }
      
      resetForm();
    } else {
      setErrors(validationResult.errors);
    }
  };

  return {
    formData,
    errors,
    handleChange,
    handleSubmit,
    resetForm
  };
};

// Function to get pet image placeholders
export const getPetImages = () => {
  return [
    '/api/placeholder/100/100',
    '/api/placeholder/100/100',
    '/api/placeholder/100/100',
    '/api/placeholder/100/100'
  ];
};