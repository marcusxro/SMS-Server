const express = require('express');
const app = express();
const port = 8080;

// Serve a simple HTML page at the root URL
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Simple Express Server</title>
    </head>
    <body>
        <h1>Hello from Express!</h1>
        <p>This is a simple HTML page served by Express.</p>
    </body>
    </html>
  `);
});

// Start the server
app.listen(8080, () => {
  console.log(`Server is running at http://localhost:${8080}`);
});
