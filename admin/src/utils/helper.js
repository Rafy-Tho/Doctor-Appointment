// Function to format the date eg. ( 20_01_2000 => 20 Jan 2000 )
export const slotDateFormat = (slotDate) => {
  const date = new Date(slotDate);

  const day = date.getUTCDate();
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getUTCFullYear();

  return `${day} ${month} ${year}`;
};
// Function to calculate the age eg. ( 20_01_2000 => 24 )
export const calculateAge = (dob) => {
  const today = new Date();
  const birthDate = new Date(dob);
  let age = today.getFullYear() - birthDate.getFullYear();
  return age;
};
