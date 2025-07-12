const mongoose = require('mongoose');

// MongoDB URI directly in code as per instructions
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/calculator_history';

// Create MongoDB connection
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB connected successfully');
})
.catch((err) => {
  console.error('MongoDB connection error:', err);
});

module.exports = mongoose;
