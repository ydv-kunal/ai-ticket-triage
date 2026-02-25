const express = require('express');
const router = express.Router();

const {
  analyzeTicketController,
  getTicketsController,
  deleteTicketController
} = require('../controllers/ticketController');

// POST analyze ticket
router.post('/analyze', analyzeTicketController);

// GET all tickets
router.get('/', getTicketsController);

 // DELETE ticket
router.delete('/:id', deleteTicketController);

module.exports = router;