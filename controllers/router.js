// Map routes to controller functions
module.exports = function(app) {
    // Render home page
    app.get('/', function(request, response) {
        response.send('hello world.');
    });
};