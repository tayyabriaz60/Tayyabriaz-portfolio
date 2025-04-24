const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 12001;

const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.pdf': 'application/pdf',
    '.txt': 'text/plain',
};

const server = http.createServer((req, res) => {
    console.log(`${req.method} ${req.url}`);

    // Handle CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle OPTIONS request for CORS preflight
    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    // Normalize URL path
    let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
    
    // Check if path exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            // If path doesn't exist, return 404
            res.writeHead(404);
            res.end('404 Not Found');
            return;
        }

        // Check if path is a directory
        fs.stat(filePath, (err, stats) => {
            if (err) {
                res.writeHead(500);
                res.end('Internal Server Error');
                return;
            }

            if (stats.isDirectory()) {
                // If path is a directory, try to serve index.html
                filePath = path.join(filePath, 'index.html');
            }

            // Read file
            fs.readFile(filePath, (err, data) => {
                if (err) {
                    res.writeHead(500);
                    res.end('Internal Server Error');
                    return;
                }

                // Determine content type
                const ext = path.extname(filePath);
                const contentType = MIME_TYPES[ext] || 'application/octet-stream';

                // Send response
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(data);
            });
        });
    });
});

server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://localhost:${PORT}/`);
    console.log(`Access from outside at https://work-2-ehyduzsvefpupssz.prod-runtime.all-hands.dev/`);
});