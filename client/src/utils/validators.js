export const validateSignup = ({ name, email, password }) => {
  const errors = {};

  // Name
  if (!name.trim()) {
    errors.name = 'Full name is required';
  } else if (name.trim().length < 3) {
    errors.name = 'Name must be at least 3 characters';
  }

  // Email
  if (!email.trim()) {
    errors.email = 'Email is required';
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.email = 'Invalid email address';
    }
  }

  // Password
  if (!password) {
    errors.password = 'Password is required';
  } else if (password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }

  return errors;
};

export const validateLogin = ({ email, password }) => {
  const errors = {};

  // Email
  if (!email.trim()) {
    errors.email = 'Email is required';
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.email = 'Invalid email address';
    }
  }

  // Password
  if (!password) {
    errors.password = 'Password is required';
  } else if (password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }

  return errors;
};
export function validate(values) {
  const errors = {};

  if (!values.name.trim()) {
    errors.name = 'Name is required';
  }

  if (!values.phone.trim()) {
    errors.phone = 'Phone is required';
  } else if (!/^\d{10,15}$/.test(values.phone)) {
    errors.phone = 'Invalid phone number';
  }

  if (!values.address.line1.trim()) {
    errors.line1 = 'Address line 1 is required';
  }

  if (!values.address.line2.trim()) {
    errors.line2 = 'Address line 2 is required';
  }

  if (values.gender === 'Not Selected') {
    errors.gender = 'Please select gender';
  }

  if (!values.dob) {
    errors.dob = 'Date of birth is required';
  }

  return errors;
}
