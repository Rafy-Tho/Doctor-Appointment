const connectDB = require('./configs/database');
const doctors = require('./configs/doctors');
const Doctor = require('./models/Doctor');
const bcrypt = require('bcrypt');

// Connect to Mong
connectDB();
// Seed function
const seedDoctors = async () => {
  try {
    // Optional: Clear existing doctors
    await Doctor.deleteMany();
    console.log('Old doctors removed');

    const hashedDoctors = await Promise.all(
      doctors.map(async (doc) => ({
        ...doc,
        password: await bcrypt.hash(doc.password, 10),
      })),
    );

    await Doctor.insertMany(hashedDoctors);
    console.log('Doctors seeded successfully');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedDoctors();
