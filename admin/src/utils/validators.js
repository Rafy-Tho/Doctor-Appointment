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
  } else if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(password)
  )
    errors.password = 'Password must be strong';

  return errors;
};

export const doctorFormValidate = (name, value) => {
  let error = '';

  switch (name) {
    case 'name':
      if (!value.trim()) error = 'Name is required';
      else if (value.length < 3) error = 'Name must be at least 3 characters';
      else if (value.length > 20) error = 'Name must be at most 20 characters';
      break;

    case 'email':
      if (!value) error = 'Email is required';
      else if (!/^\S+@\S+\.\S+$/.test(value)) error = 'Invalid email format';
      break;

    case 'password':
      if (!value) error = 'Password is required';
      else if (value.length < 8)
        error = 'Password must be at least 8 characters';
      else if (
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(value)
      )
        error = 'Password must be strong';
      break;

    case 'fees':
      if (!value) error = 'Fees is required';
      else if (value <= 0) error = 'Fees must be greater than 0';
      break;

    case 'degree':
      if (!value.trim()) error = 'Degree is required';
      break;

    case 'address1':
      if (!value.trim()) error = 'Address is required';
      break;

    case 'address2':
      if (!value.trim()) error = 'Address is required';
      break;

    case 'about':
      if (!value.trim()) error = 'About is required';
      else if (value.length < 10)
        error = 'About must be at least 10 characters';
      else if (value.length > 200)
        error = 'About must be at most 200 characters';
      break;

    case 'speciality':
      if (!value.trim()) error = 'Speciality is required';
      break;

    case 'image':
      if (value === null) error = 'Image is required';
      break;

    default:
      break;
  }

  return error;
};
export const doctorUpdateProfileValidate = (name, value) => {
  let error = '';

  switch (name) {
    case 'fees':
      if (!value) error = 'Fees is required';
      else if (value <= 0) error = 'Fees must be greater than 0';
      break;

    case 'line1':
      if (!value.trim()) error = 'Address is required';
      break;

    case 'line2':
      if (!value.trim()) error = 'Address is required';
      break;

    case 'available':
      if (value === null) error = 'Available is required';
      break;

    default:
      break;
  }

  return error;
};
