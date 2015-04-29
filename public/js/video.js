// Create window-scope variable for support convo
var supportConversation;

// incoming or outgoing, display streams on screen
function showVideoStreams(conversation) {
    // show local video
    var localVideoElement = $('.me').get(0);

    // create a localStream object to mute and end
    supportConversation = conversation;
    conversation.localStream.attach(localVideoElement);

    conversation.on('participantJoined', function(participant) {
        // show participant video
        var remoteVideoElement = $('.main').get(0);
        participant.stream.attach(remoteVideoElement);
    });
}

// Initialize twilio video components
$(function() {
    // Create endpoint for current person, using the capability token
    // already created in the window scope
    new Twilio.Endpoint.createWithToken(token).then(function(endpoint) {
        // automatically answer any incoming calls
        endpoint.on('invite', function(invite) {
            invite.accept().then(function(conversation) {
                $(document).trigger('inviteAccepted');
                showVideoStreams(conversation);
            });
        });

        // Fire event on the document with endpoint when created
        $(document).trigger('endpointCreated', endpoint);

    }, function(error) {
        alert('Sorry, there was a problem connecting to Twilio :(');
    });
});