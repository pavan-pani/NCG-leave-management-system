export const formatDate = (dateString) => {
  if (!dateString) return '';
  
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const getDaysCount = (startDate, endDate) => {
  if (!startDate || !endDate) return 0;
  
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end - start);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
};

export const getStatusColor = (status) => {
  switch (status) {
    case 'approved': return 'text-green-700 bg-green-100 border-green-200';
    case 'rejected': return 'text-red-700 bg-red-100 border-red-200';
    case 'pending': return 'text-yellow-700 bg-yellow-100 border-yellow-200';
    default: return 'text-gray-700 bg-gray-100 border-gray-200';
  }
};

export const generateId = () => {
  return Date.now().toString() + Math.random().toString(36)
};

export const getTodayDate = () => {
  return new Date().toISOString().split('T')[0];
};