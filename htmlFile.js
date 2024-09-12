const http = require("http");
const fs = require('fs').promises;

const host = 'localhost';
const port = 8000;

const requestListener = function (req, res) {
    if (req.url === "/") {
        // Serve the HTML file that includes the image
        fs.readFile(__dirname + "/index.html")
        .then(contents => {
            res.setHeader("Content-Type", "text/html");
            res.writeHead(200);
            res.end(contents);
        })
        .catch(err => {
            console.error(err);
            res.setHeader("Content-Type", "text/plain");
            res.writeHead(500);
            res.end("Server Error");
        });
    } else if (req.url === "/2024-07-19_16-46-06_2850.png") {
        // Serve the image file
        fs.readFile(__dirname + "/2024-07-19_16-46-06_2850.png")
        .then(contents => {
            res.setHeader("Content-Type", "png");
            res.writeHead(200);
            res.end(contents);
        })
        .catch(err => {
            console.error(err);
            res.setHeader("Content-Type", "text/plain");
            res.writeHead(500);
            res.end("Server Error");
        });
    } else {
        // Handle 404 for other paths
        res.setHeader("Content-Type", "text/plain");
        res.writeHead(404);
        res.end("Not Found");
    }
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
