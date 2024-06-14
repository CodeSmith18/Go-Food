const express = require('express');
const connectDB = require('./db');
const cors = require('cors');
const app = express();
const port = 5000;
const LogInCollection = require("./db");

// Set up CORS middleware
app.use(cors({
  origin: ["https://go-food-front-rosy.vercel.app"], // Allow requests from these origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept']
}));

app.use(express.json());

app.use('/api', require("./routes/CreateUser"));
app.use('/api', require("./routes/DisplayData"));
app.use('/api', require("./routes/OrderData"));

app.get('/', (req, res) => {
  res.send('Hello World!')
}); 

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ message: 'Page Not Found' });
});

const startServer = async () => {
  await connectDB();
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}

startServer();
