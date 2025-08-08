export const validateLeaveForm = (formData) => {
  const errors = {};
  
  if (!formData.leaveType?.trim()) {
    errors.leaveType = 'Leave type is required';
  }
  
  if (!formData.startDate) {
    errors.startDate = 'Start date is required';
  } else if (new Date(formData.startDate) < new Date().setHours(0,0,0,0)) {
    errors.startDate = 'Start date cannot be in the past';
  }
  
  if (!formData.endDate) {
    errors.endDate = 'End date is required';
  } else if (formData.startDate && new Date(formData.startDate) > new Date(formData.endDate)) {
    errors.endDate = 'End date must be after start date';
  }
  
  if (!formData.reason?.trim()) {
    errors.reason = 'Reason is required';
  } else if (formData.reason.trim().length < 10) {
    errors.reason = 'Reason must be at least 10 characters long';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateLogin = (userId) => {
  if (!userId) {
    return {
      isValid: false,
      error: 'Please select a user'
    };
  }
  
  return {
    isValid: true,
    error: null
  };
};