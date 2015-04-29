var s = require('underscore.string');
var moment = require('moment');
var products = require('./products');
var supportTickets = require('./support_tickets');
var token = require('../middleware/token');

// Map routes to controller functions
module.exports = function(app) {
    // Include string format helpers
    app.locals.num = function(num, digits) {
        var sigDigits = Number(digits);
        if (isNaN(sigDigits)) sigDigits = 2;
        return s.numberFormat(Number(num), sigDigits);
    };

    app.locals.timeAgo = function(time) {
        return moment(time).fromNow(true);
    };

    // Render home page (product list)
    app.get('/', products.list);

    // Product detail page, which should include a capability token
    app.get('/products', token, products.detail);

    // View all support tickets
    app.get('/tickets', supportTickets.list);

    // Show a video conversation view for a ticket
    app.get('/tickets/:id', token, supportTickets.show);

    // Create a support ticket
    app.post('/tickets', supportTickets.create);
};