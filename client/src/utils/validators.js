export const validateSignup = ({ name, email, password }) => {
  const errors = {};

  // Name
  if (!name.trim()) {
    errors.name = 'Full name is required';
  } else if (name.trim().length < 3) {
    errors.name = 'Name must be at least 3 characters';
  } else if (name.trim().length > 20) {
    errors.name = 'Name must be at most 20 characters';
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
  } else if (password.length < 8) {
    errors.password = 'Password must be at least 8 characters';
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
  } else if (password.length < 8) {
    errors.password = 'Password must be at least 8 characters';
  }

  return errors;
};

export function validateUpdateProfile(values) {
  const errors = {};
  const address = values.address || {};

  if (!values.name.trim()) {
    errors.name = 'Name is required';
  } else if (values.name.trim().length < 3) {
    errors.name = 'Name must be at least 3 characters';
  } else if (values.name.trim().length > 20) {
    errors.name = 'Name must be at most 20 characters';
  }

  if (!values.phone.trim()) {
    errors.phone = 'Phone is required';
  } else if (!/^\d{10,15}$/.test(values.phone)) {
    errors.phone = 'Invalid phone number';
  }

  if (!address.line1.trim()) {
    errors.line1 = 'Address line 1 is required';
  }

  if (!address.line2.trim()) {
    errors.line2 = 'Address line 2 is required';
  }

  if (values.gender === 'Not Selected') {
    errors.gender = 'Please select gender';
  }

  if (!values.dob) {
    errors.dob = 'Date of birth is required';
  } else {
    const today = new Date();
    const birthDate = new Date(values.dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    if (age < 15) {
      errors.dob = 'You must be at least 15 years old';
    } else if (age > 100) {
      errors.dob = 'Invalid date of birth';
    }
  }

  return errors;
}
