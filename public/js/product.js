// Get a query parameter from the current page
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

$(function() {
    var initial = 'Need Help? Chat with Support Now!';
    var waiting = 'Waiting for the next available agent...';

    $('.btn').on('click', function(e) {
        e.preventDefault();
        $btn = $(this);
        $btn.html(waiting);

        // Create support request
        $.ajax({
            url: '/tickets',
            method: 'POST',
            data: {
                endpoint: window.endpointId,
                productUrl: getParameterByName('url')
            },
            dataType: 'json'
        }).done(function(data) {
            alert(data.message);
        }).fail(function() {
            $btn.html(initial);
            alert('Oops! There was a problem. Please try again.');
        });
    });
});