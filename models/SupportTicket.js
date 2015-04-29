var mongoose = require('mongoose');

var SupportTicketSchema = new mongoose.Schema({
    endpoint: String,
    productUrl: String,
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

var SupportTicket = mongoose.model('SupportTicket', SupportTicketSchema);
module.exports = SupportTicket;