const express = require('express');
const favicon = require('express-favicon');
const path = require('path');

// Current UTC time in the format
//    yyyy-mm-dd'T'HH:MM:ss'Z'
// Example: 2019-12-18T21:14:07Z
const dateFormat = require('dateformat');
function time() {
  return dateFormat("isoUtcDateTime");
};

const PORT = process.env.PORT || 3000;
const buildPath = path.join(__dirname, '..', 'build');
const faviconPath = path.join(buildPath, 'favicon.ico');

const app = express();
app.use(favicon(faviconPath));
app.use(express.static(__dirname));
app.use(express.static(buildPath));
app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});
app.listen(PORT, () => {
  console.log(`Server started at ${time()} on port ${PORT}.`);
});
