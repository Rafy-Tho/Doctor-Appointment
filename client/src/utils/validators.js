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
