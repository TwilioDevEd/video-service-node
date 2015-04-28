var products = require('./products');
var s = require('underscore.string');

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

    // Product detail page
    app.get('/products', products.detail);
};