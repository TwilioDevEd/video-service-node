var get = require('request');

// List endpoint for the starwars ship API
var swapi = 'http://swapi.co/api/starships';

// List all products
exports.list = function(request, response) {
    get(swapi, function(err, nodeClientResponse, body) {
        if (err) {
            return response.status(500).send(err);
        }

        var data = JSON.parse(body);
        response.render('index', data);
    });
};

// Show details for a specific product
exports.detail = function(request, response) {
    var url = request.query.url;
    get(url, function(err, nodeClientResponse, body) {
        if (err) {
            return response.status(500).send(err);
        }

        // Create template render context with the API response
        var data = {
            ship: JSON.parse(body)
        };
        data.title = data.ship.model;

        // Render jade template with product data
        response.render('detail', data);
    });
};