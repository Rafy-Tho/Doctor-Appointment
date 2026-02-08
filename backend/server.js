const express = require('express');
const cors = require('cors');
const connectDB = require('./configs/database');
const ENV = require('./configs/env');
const notFound = require('./middleware/notFound');
const errorMiddleware = require('./middleware/errorMiddleware');
const userRouter = require('./routes/userRoute');
// configure environment variables

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:5173',
  }),
);
// configure database connection
connectDB();
// route

app.use('/api/users', userRouter);
// middleware handler error
app.use(notFound);
app.use(errorMiddleware);
// configure server port
const port = ENV.PORT || 3000;
// start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
