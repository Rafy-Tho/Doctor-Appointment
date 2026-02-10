const doctors = [
  {
    name: 'Dr. Richard James',
    email: 'richard.james@example.com',
    password: 'StrongPass123!',
    speciality: 'General physician',

    degree: 'MBBS',
    experience: '4 Years',
    about:
      'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
    fees: 50,
    address: {
      line1: '17th Cross, Richmond',
      line2: 'Circle, Ring Road, London',
    },
    available: true,
    role: 'doctor',
    date: Date.now(),
    image:
      'https://res.cloudinary.com/dmuu7x5vm/image/upload/v1770691201/doc1_aatart.png',
  },
  {
    name: 'Dr. Emily Larson',
    email: 'emily.larson@example.com',
    password: 'StrongPass123!',

    speciality: 'Gynecologist',
    degree: 'MBBS',
    experience: '3 Years',
    about:
      'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
    fees: 60,
    address: {
      line1: '27th Cross, Richmond',
      line2: 'Circle, Ring Road, London',
    },
    available: true,
    role: 'doctor',
    date: Date.now(),
    image:
      'https://res.cloudinary.com/dmuu7x5vm/image/upload/v1770691201/doc2_o9owqm.png',
  },
  {
    name: 'Dr. Sarah Patel',
    email: 'sarah.patel@example.com',
    password: 'StrongPass123!',

    speciality: 'Dermatologist',
    degree: 'MBBS',
    experience: '1 Years',
    about:
      'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
    fees: 30,
    address: {
      line1: '37th Cross, Richmond',
      line2: 'Circle, Ring Road, London',
    },
    available: true,
    role: 'doctor',
    date: Date.now(),
    image:
      'https://res.cloudinary.com/dmuu7x5vm/image/upload/v1770691201/doc3_xcuokr.png',
  },
  {
    name: 'Dr. Christopher Lee',
    email: 'christopher.lee@example.com',
    password: 'StrongPass123!',

    speciality: 'Pediatricians',
    degree: 'MBBS',
    experience: '2 Years',
    about:
      'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
    fees: 40,
    address: {
      line1: '47th Cross, Richmond',
      line2: 'Circle, Ring Road, London',
    },
    available: true,
    role: 'doctor',
    date: Date.now(),
    image:
      'https://res.cloudinary.com/dmuu7x5vm/image/upload/v1770691202/doc4_qa3zsx.png',
  },
  {
    name: 'Dr. Jennifer Garcia',
    email: 'jennifer.garcia@example.com',
    password: 'StrongPass123!',

    speciality: 'Neurologist',
    degree: 'MBBS',
    experience: '4 Years',
    about:
      'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
    fees: 50,
    address: {
      line1: '57th Cross, Richmond',
      line2: 'Circle, Ring Road, London',
    },
    available: true,
    role: 'doctor',
    date: Date.now(),
    image:
      'https://res.cloudinary.com/dmuu7x5vm/image/upload/v1770691202/doc8_xxtiy6.png',
  },
  {
    name: 'Dr. Andrew Williams',
    email: 'andrew.williams@example.com',
    password: 'StrongPass123!',

    speciality: 'Neurologist',
    degree: 'MBBS',
    experience: '4 Years',
    about:
      'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
    fees: 50,
    address: {
      line1: '57th Cross, Richmond',
      line2: 'Circle, Ring Road, London',
    },
    available: true,
    role: 'doctor',
    date: Date.now(),
    image:
      'https://res.cloudinary.com/dmuu7x5vm/image/upload/v1770691202/doc6_y4w7qh.png',
  },
  {
    name: 'Dr. Christopher Davis',
    email: 'christopher.davis@example.com',
    password: 'StrongPass123!',

    speciality: 'General physician',
    degree: 'MBBS',
    experience: '4 Years',
    about:
      'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
    fees: 50,
    address: {
      line1: '17th Cross, Richmond',
      line2: 'Circle, Ring Road, London',
    },
    available: true,
    role: 'doctor',
    date: Date.now(),
    image:
      'https://res.cloudinary.com/dmuu7x5vm/image/upload/v1770691202/doc9_mlbnsu.png',
  },
  {
    name: 'Dr. Timothy White',
    email: 'timothy.white@example.com',
    password: 'StrongPass123!',

    speciality: 'Gynecologist',
    degree: 'MBBS',
    experience: '3 Years',
    about:
      'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
    fees: 60,
    address: {
      line1: '27th Cross, Richmond',
      line2: 'Circle, Ring Road, London',
    },
    available: true,
    role: 'doctor',
    date: Date.now(),
    image:
      'https://res.cloudinary.com/dmuu7x5vm/image/upload/v1770691203/doc10_y5xlo1.png',
  },
  {
    name: 'Dr. Ava Mitchell',
    email: 'ava.mitchell@example.com',
    password: 'StrongPass123!',

    speciality: 'Dermatologist',
    degree: 'MBBS',
    experience: '1 Years',
    about:
      'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
    fees: 30,
    address: {
      line1: '37th Cross, Richmond',
      line2: 'Circle, Ring Road, London',
    },
    available: true,
    role: 'doctor',
    date: Date.now(),
    image:
      'https://res.cloudinary.com/dmuu7x5vm/image/upload/v1770691204/doc7_etxieh.png',
  },
  {
    name: 'Dr. Jeffrey King',
    email: 'jeffrey.king@example.com',
    password: 'StrongPass123!',

    speciality: 'Pediatricians',
    degree: 'MBBS',
    experience: '2 Years',
    about:
      'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
    fees: 40,
    address: {
      line1: '47th Cross, Richmond',
      line2: 'Circle, Ring Road, London',
    },
    available: true,
    role: 'doctor',
    date: Date.now(),
    image:
      'https://res.cloudinary.com/dmuu7x5vm/image/upload/v1770691205/doc13_qwkxv1.png',
  },
  {
    name: 'Dr. Zoe Kelly',
    email: 'zoe.kelly@example.com',
    password: 'StrongPass123!',

    speciality: 'Neurologist',
    degree: 'MBBS',
    experience: '4 Years',
    about:
      'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
    fees: 50,
    address: {
      line1: '57th Cross, Richmond',
      line2: 'Circle, Ring Road, London',
    },
    available: true,
    role: 'doctor',
    date: Date.now(),
    image:
      'https://res.cloudinary.com/dmuu7x5vm/image/upload/v1770691205/doc14_oue8jq.png',
  },
  {
    name: 'Dr. Patrick Harris',
    email: 'patrick.harris@example.com',
    password: 'StrongPass123!',

    speciality: 'Neurologist',
    degree: 'MBBS',
    experience: '4 Years',
    about:
      'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
    fees: 50,
    address: {
      line1: '57th Cross, Richmond',
      line2: 'Circle, Ring Road, London',
    },
    available: true,
    role: 'doctor',
    date: Date.now(),
    image:
      'https://res.cloudinary.com/dmuu7x5vm/image/upload/v1770691206/doc15_yw9ito.png',
  },
  {
    name: 'Dr. Chloe Evans',
    email: 'chloe.evans@example.com',
    password: 'StrongPass123!',

    speciality: 'General physician',
    degree: 'MBBS',
    experience: '4 Years',
    about:
      'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
    fees: 50,
    address: {
      line1: '17th Cross, Richmond',
      line2: 'Circle, Ring Road, London',
    },
    available: true,
    role: 'doctor',
    date: Date.now(),
    image:
      'https://res.cloudinary.com/dmuu7x5vm/image/upload/v1770691202/doc6_y4w7qh.png',
  },
  {
    name: 'Dr. Ryan Martinez',
    email: 'ryan.martinez@example.com',
    password: 'StrongPass123!',

    speciality: 'Gynecologist',
    degree: 'MBBS',
    experience: '3 Years',
    about:
      'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
    fees: 60,
    address: {
      line1: '27th Cross, Richmond',
      line2: 'Circle, Ring Road, London',
    },
    available: true,
    role: 'doctor',
    date: Date.now(),
    image:
      'https://res.cloudinary.com/dmuu7x5vm/image/upload/v1770691205/doc13_qwkxv1.png',
  },
  {
    name: 'Dr. Amelia Hill',
    email: 'amelia.hill@example.com',
    password: 'StrongPass123!',

    speciality: 'Dermatologist',
    degree: 'MBBS',
    experience: '1 Years',
    about:
      'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
    fees: 30,
    address: {
      line1: '37th Cross, Richmond',
      line2: 'Circle, Ring Road, London',
    },
    available: true,
    role: 'doctor',
    date: Date.now(),
    image:
      'https://res.cloudinary.com/dmuu7x5vm/image/upload/v1770691203/doc5_ndr9b4.png',
  },
];

module.exports = doctors;
