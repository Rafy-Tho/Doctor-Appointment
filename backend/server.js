const express = require('express');
const cors = require('cors');
const connectDB = require('./configs/database');
const ENV = require('./configs/env');
const notFound = require('./middleware/notFound');
const errorMiddleware = require('./middleware/errorMiddleware');
const userRouter = require('./routes/userRoute');
const connectCloudinary = require('./configs/cloudinary');
const doctorRouter = require('./routes/doctorRoute');
const adminRouter = require('./routes/adminRoute');
const morgan = require('morgan');
// configure environment variables

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: [ENV.CLIENT_URL_1, ENV.CLIENT_URL_2],
  }),
);

// configure cloudinary
connectCloudinary();
// Morgan middleware
app.use(morgan('dev'));
// route
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/doctor', doctorRouter);
app.use('/api/v1/user', userRouter);

// middleware handler error
app.use(notFound);
app.use(errorMiddleware);

const port = ENV.PORT || 5000;
console.log(ENV.STRIPE_SECRET_KEY);
const server = async () => {
  try {
    await connectDB();
    if (ENV.NODE_ENV === 'development')
      app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
      });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
server();
