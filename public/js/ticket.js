$(function() {
    // Immediately show video widget
    $('.video-widget').show();

    // Immediately initiate outbound call to the endpoint
    $(document).on('endpointCreated', function(e, endpoint) {
        endpoint.createConversation(ticketEndpoint)
            .done(showVideoStreams, function(error) {
            // Failed to set up outbound call
            alert('Sorry, could not create outbound call :(');
        });
    });
});