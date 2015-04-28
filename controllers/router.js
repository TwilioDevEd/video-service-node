var products = require('./products');

// Map routes to controller functions
module.exports = function(app) {
    // Render home page (product list)
    app.get('/', products.list);
};