const Ticket = require('../models/Ticket');
const analyzeTicket = require('../analyzer/ticketAnalyzer');

// analyze + save ticket
const analyzeAndSaveTicket = async (message) => {
  const analysis = analyzeTicket(message);

  const newTicket = new Ticket({
    message,
    category: analysis.category,
    priority: analysis.priority,
    urgency: analysis.urgency,
    keywords: analysis.keywords,
    confidence: analysis.confidence
  });

  await newTicket.save();

  return newTicket;
};

// get all tickets
const getAllTickets = async () => {
  const tickets = await Ticket.find().sort({ createdAt: -1 });
  return tickets;
};

module.exports = {
  analyzeAndSaveTicket,
  getAllTickets
};