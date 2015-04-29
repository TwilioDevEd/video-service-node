var s = require('underscore.string');
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

    // Render home page (product list)
    app.get('/', products.list);

    // Product detail page, which should include a capability token
    app.get('/products', token, products.detail);

    // Create a support ticket
    app.post('/tickets', supportTickets.create);
};