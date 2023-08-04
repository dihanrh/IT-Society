const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const electionRoutes = require('./routes/electionRoutes');
const authRouter = require('./routes/authController');




const app = express();
const PORT = process.env.PORT || 3000 ;
const MONGODB_URI = 'mongodb://127.0.0.1:27017/electionDB';



const corsOptions = {
  origin: 'http://localhost:5173',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(electionRoutes);
app.use('/api', authRouter);


// Check for successful connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
  console.log('Connected to the database');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



  // Connect to the MongoDB database -  registrationDB
mongoose.connect('mongodb://127.0.0.1:27017/registrationDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});



