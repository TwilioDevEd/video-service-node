var util = require('util');
var uuid = require('uuid');
var twilio = require('../twilio');
var config = require('../config');
var client = twilio(config.accountSid, config.authToken);

// Fetch a signing key from the Twilio REST API, which we'll use to mint our 
// access tokens below in exports.generateToken
var SIGNING_KEY_SID, SIGNING_KEY_SECRET;

// Create a signing key and store the values in module-level variables for
// later use in creating access tokens
client.signingKeys.create({
    friendlyName: 'Signal Video Test'
}, function(err, data) {
    // fire the callback right away on error
    if (err) return console.error('Error creating signing key!');

    // Store returned values from API
    SIGNING_KEY_SID = data.sid;
    SIGNING_KEY_SECRET = data.secret;
    console.log('Signing keys generated.');
});

// Middleware function to add capability token and endpoint data to the 
// rendering context for a response
module.exports = function(request, response, next) {
    var token = new twilio.AccessToken(
        // Sid for the signing key we generated on init
        SIGNING_KEY_SID,
        // your regular account SID
        process.env.TWILIO_ACCOUNT_SID
    );

    // Create a random endpoint ID
    var endpoint = uuid.v1();

    // Add the capabilities for conversation endpoints to this token, including
    // it's unique name. We'll use the default permission set of "listen" and 
    // "invite"
    token.addEndpointGrant(endpoint);

    // Authorize the client to use Twilio's NAT traversal service - for that,
    // it will need access to the "Tokens" resource
    var resUrl = 'https://api.twilio.com/2010-04-01/Accounts/%s/Tokens.json';
    var grantUrl = util.format(resUrl, process.env.TWILIO_ACCOUNT_SID);
    token.addGrant(grantUrl);

    // Generate a JWT token string that will be sent to the browser and used
    // by the Conversations SDK
    var stringTkn = token.toJwt(SIGNING_KEY_SECRET);

    // Add generated vaues as locals for when we render our template
    response.locals.endpointId = endpoint;
    response.locals.token = stringTkn;
    next();
};