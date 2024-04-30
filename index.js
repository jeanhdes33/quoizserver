const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const cookieParser = require('cookie-parser');
const { METHODS } = require('http');

dotenv.config();

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('DB connected'))
  .catch((err) => console.error('DB not connected', err));

const corsOptions = {
  
  origin: 'https://quoiz.vercel.app/' // Autorise les requêtes depuis ce domaine
  credentials: true,
  methods: ["POST", "GET"],
};

app.get("/", (req, res) => {
  res.json("Hello");
})

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use('/', require('./routes/authRoutes'));

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
