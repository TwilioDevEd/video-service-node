var SupportTicket = require('../models/SupportTicket');

// Create a new support ticket
exports.create = function(request, response) {
    var ticket = new SupportTicket({
        endpoint: request.body.endpoint,
        productUrl: request.body.productUrl
    });

    ticket.save(function(err) {
        if (err) return response.status(500).send(err);
        response.send({
            message: 'Hang tight, an agent will be with you shortly!'
        });
    });
};