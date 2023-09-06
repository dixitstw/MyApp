const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Database Connection

// const MONGODB_URI = 'mongodb+srv://dixitgautam01:uHyKbsvG78yTUUJ2@cluster0.ockszu6.mongodb.net/socialmediaapp?retryWrites=true&w=majority';
const MONGODB_URI = 'mongodb+srv://dixitgautam01:uHyKbsvG78yTUUJ2@cluster0.ockszu6.mongodb.net/socialmediaapp?retryWrites=true&w=majority';

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

// middleware
const morgan = require('morgan')

// Routes
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/post');


app.use(morgan('dev'))

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
