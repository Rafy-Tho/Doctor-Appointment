const express = require('express');
const cors = require('cors');
const connectDB = require('./configs/database');
const ENV = require('./configs/env');
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
// configure server port
const port = ENV.PORT || 3000;
// start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
