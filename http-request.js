var HttpClient = function() {
    this.get = function(aUrl, aCallback) {
        var httpRequest = new XMLHttpRequest();
        httpRequest.onreadystatechange = function() {
            if (httpRequest.readyState == 4 && httpRequest.status == 200)
                aCallback(anHttpRequest.responseText);
        }

        httpRequest.open( "GET", aUrl, true );
        httpRequest.send( null );
    }
}
