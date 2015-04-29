var get = require('request');
var SupportTicket = require('../models/SupportTicket');

// Helper to fail with an error response
function fail(response, err) {
    response.status(500).send(err);
}

// Create a new support ticket
exports.create = function(request, response) {
    var ticket = new SupportTicket({
        endpoint: request.body.endpoint,
        productUrl: request.body.productUrl
    });

    ticket.save(function(err) {
        if (err) return fail(response, err);
        response.send({
            message: 'Hang tight, an agent will be with you shortly!'
        });
    });
};

// List support tickets
exports.list = function(request, response) {
    SupportTicket.find({}).sort('createdAt').exec(function(err, docs) {
        if (err) return fail(response, err);
        response.render('tickets', {
            tickets: docs
        });
    });
};

// Show a support ticket and remove it from the queue (not very RESTful I know)
exports.show = function(request, response) {
    SupportTicket.findById(request.params.id, function(err, ticket) {
        if (err) return fail(response, err);

        if (!ticket) return response.status(404).send('ticket not found');

        // Once we have the ticket, fetch product information
        get(ticket.productUrl, function(err, ncr, body) {
            if (err || !ticket) return fail(response, err);

            // Parse JSON response from Star Wars API
            var ship = JSON.parse(body);

            // Finally, we remove the ticket from the queue - we assume (for
            // demonstration purposes) if this URL is visited, the support 
            // ticket is handled.
            ticket.remove(function(err) {
                if (err || !ticket) return fail(response, err);

                // render template with ticket and product data
                response.render('ticket', {
                    ticket: ticket,
                    ship: ship
                });
            });
        });
    });
};