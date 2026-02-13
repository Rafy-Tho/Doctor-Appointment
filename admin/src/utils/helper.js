import { months } from './constant';

// Function to format the date eg. ( 20_01_2000 => 20 Jan 2000 )
export const slotDateFormat = (slotDate) => {
  const dateArray = slotDate.split('_');
  return dateArray[0] + ' ' + months[Number(dateArray[1])] + ' ' + dateArray[2];
};

// Function to calculate the age eg. ( 20_01_2000 => 24 )
export const calculateAge = (dob) => {
  const today = new Date();
  const birthDate = new Date(dob);
  let age = today.getFullYear() - birthDate.getFullYear();
  return age;
};
