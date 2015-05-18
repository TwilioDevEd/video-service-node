$(function() {
    // Immediately show video widget
    $('.video-widget').show();

    // Immediately initiate outbound call to the endpoint
    $(document).on('endpointCreated', function(e, endpoint) {
        endpoint.createConversation(ticketEndpoint).then(showVideoStreams);
    });

    // On hangup, just hide video widget
    $(document).on('conversationLeft', function() {
        $('.video-widget').hide();
    });
});