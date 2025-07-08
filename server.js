const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 8080;

// Handle Next.js image optimization route
app.get('/_next/image', (req, res) => {
  const urlParam = req.query.url;
  if (urlParam) {
    const normalizedUrl = urlParam.startsWith('/') ? urlParam.slice(1) : urlParam;
    const filePathWithoutQuery = normalizedUrl.split('?')[0];
    const filePath = path.join(__dirname, 'public', filePathWithoutQuery);

    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      res.sendFile(filePath);
    } else {
      res.status(404).send('Image not found');
    }
  } else {
    res.status(404).send('Image not found');
  }
});

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Fallback: serve index.html for all routes (SPA behavior)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Mac Desktop server running at http://localhost:${port}`);
});
