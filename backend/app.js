const express = require('express');
const cors = require('cors');

const ticketRoutes = require('./routes/ticketRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('AI Ticket Triage API Running');
});

app.use('/api/tickets', ticketRoutes);

module.exports = app; 