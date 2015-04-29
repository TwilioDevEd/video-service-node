var mongoose = require('mongoose');

var SupportTicketSchema = new mongoose.Schema({
    endpoint: String,
    productUrl: String
});

var SupportTicket = mongoose.model('SupportTicket', SupportTicketSchema);
module.exports = SupportTicket;