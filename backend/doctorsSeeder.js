const connectDB = require('./configs/database');
const doctors = require('./configs/doctors');
const Doctor = require('./models/Doctor');

// Connect to Mong
connectDB();
// Seed function
const seedDoctors = async () => {
  try {
    // Optional: Clear existing doctors
    await Doctor.deleteMany();
    console.log('Old doctors removed');

    // Insert new doctors
    await Doctor.insertMany(doctors);
    console.log('Doctors seeded successfully');

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedDoctors();
