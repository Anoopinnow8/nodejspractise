const http = require('http');

// Simple handler function
const handler = (req, res) => {
  const { url, method } = req;
  const { name } = new URL(req.url, `http://${req.headers.host}`).searchParams;
console.log(name,"name");
  if (url === "/api") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Welcome to the Home Page!");
  } else if (url.startsWith("/api/greet")) {
    if (name) {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end(`Hello, ${name}!`);
    } else {
      res.writeHead(400, { "Content-Type": "text/plain" });
      res.end("Please provide a name in the query");
    }
  } else if (url.startsWith("/api/about")) {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("This is the About Page.");
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Page not found.");
  }
};

// Create an HTTP server
const server = http.createServer(handler);

// Start the server
const PORT = 8000;
server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
