var get = require('request');
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

        var data = JSON.parse(body);
        response.render('detail', data);
    });
};