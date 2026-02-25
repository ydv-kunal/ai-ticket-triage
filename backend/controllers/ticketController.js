const ticketService = require('../services/ticketService');

// POST analyze ticket
const analyzeTicketController = async (req, res) => {
  try {
    console.log("➡️ Request received");
    const { message } = req.body;
    console.log("Message:", message);


    if (!message || message.trim() === '') {
      return res.status(400).json({ error: 'Message is required' });
    }

    const result = await ticketService.analyzeAndSaveTicket(message);
    console.log("✅ Ticket saved");

    res.status(200).json({
      success: true,
      data: result
    });

  } catch (error) {
    console.error('Analyze error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// GET all tickets
const getTicketsController = async (req, res) => {
  try {
    const tickets = await ticketService.getAllTickets();

    res.status(200).json({
      success: true,
      data: tickets
    });

  } catch (error) {
    console.error('Fetch error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

//Delete ticket
const Ticket = require('../models/Ticket');
const deleteTicketController = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await Ticket.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({ error: "Ticket not found" });
        }

        res.status(200).json({
            success: true,
            message: "Ticket deleted"
        });

    } catch (error) {
        console.error("Delete error:", error);
        res.status(500).json({ error: "Server error" });
    }
};

module.exports = {
  analyzeTicketController,
  getTicketsController,
  deleteTicketController
};