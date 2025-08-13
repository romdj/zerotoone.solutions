function handler(event) {
    var request = event.request;
    var host = request.headers.host.value;
    
    // Route old.zerotoone.solutions to /old/ path
    if (host === 'old.zerotoone.solutions') {
        // Redirect to /old/ path with the current URI
        if (!request.uri.startsWith('/old/')) {
            request.uri = '/old' + request.uri;
        }
        
        // For root path, redirect to index.html
        if (request.uri === '/old/' || request.uri === '/old') {
            request.uri = '/old/index.html';
        }
    }
    
    return request;
}