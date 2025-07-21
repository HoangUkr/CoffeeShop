const validation = {
  validateEmail: (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  },
  validateDate: (dateStr) => {
    const pattern = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD format
    if (!pattern.test(dateStr)) {
      return false; // Invalid format
    }
    const date = new Date(dateStr);
    const isValidFormat = !isNaN(date.getTime());
    return isValidFormat;
  },
  validatePhoneNumber: (phone) => {
    const pattern = /^\+?[0-9\s\-]{7,15}$/;

    return pattern.test(String(phone).toLowerCase());
  },
};
export default validation;
