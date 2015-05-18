// Create window-scope variable for support convo
var supportConversation;

// incoming or outgoing, display streams on screen
function showVideoStreams(conversation) {
    supportConversation = conversation;

    // Attach to DOM
    conversation.localMedia.attach('.me');

    // Listen for participants
    conversation.on('participantConnected', function(participant) {
        participant.media.attach('.main');
    });

    conversation.on('participantDisconnected', function(participant) {
        conversation.localMedia.stop();
        conversation.leave();
        $('.video-widget').hide();
    });
}

// Initialize twilio video components
$(function() {

    // Create video endpoint with token generated on server
    var endpoint = new Twilio.Endpoint(window.token);

    // Automatically accept any incoming calls
    endpoint.on('invite', function(invitation) {
        $(document).trigger('inviteAccepted', endpoint);
        invitation.accept().then(showVideoStreams);
    });

    // Fire event on the document with endpoint when created
    setTimeout(function() {
        $(document).trigger('endpointCreated', endpoint);
    },1);

    // Listen for incoming calls
    endpoint.listen();
});