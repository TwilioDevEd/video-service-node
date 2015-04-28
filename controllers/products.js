var get = require('request');
var swapi = 'http://swapi.co/api/starships';

// List all products
exports.list = function(request, response) {
    get(swapi, function(err, nodeClientResponse, body) {
        if (err) {
            return response.status(500, err);
        }

        var data = JSON.parse(body);
        response.render('index', data);
    });
};