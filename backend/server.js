const express = require('express');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const parcRoutes = require('./routes/parcRoutes');
const voitureRoutes = require('./routes/voitureRoutes');

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to steg.' });
});

const db = require('./models/');

db.sequelize.sync({ force: true }).then(() => {
  console.log('Drop and Resync Db');
});

app.use('/api/user', userRoutes);
app.use('/api/parc', parcRoutes);
app.use('/api/voiture', voitureRoutes);

// set port, listen for requests
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
