const http = require('http');

const PORT = 3000;

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    if (req.method === 'GET' && req.url === '/welcome') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        const responseData = {
            message: "Welcome to the basic HTTP server!"
        };
        res.end(JSON.stringify(responseData));
    }
    else if (req.method === 'POST' && req.url === '/data') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            try {
                const userData = JSON.parse(body);

                if (userData.name && userData.age !== undefined) {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    const responseMessage = {
                        message: `Hello ${userData.name}, your age is ${userData.age}`
                    };
                    res.end(JSON.stringify(responseMessage));
                } else {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: "Missing 'name' or 'age' in request body." }));
                }
            } catch (error) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: "Invalid JSON in request body." }));
            }
        });
    }
    else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: "Route not found." }));
    }
});

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/`);
    console.log(`Try: GET http://localhost:${PORT}/welcome`);
    console.log(`Try: POST http://localhost:${PORT}/data with JSON body: {"name": "Sara", "age": 25}`);
});
