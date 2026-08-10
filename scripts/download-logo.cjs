const https = require('https');
const fs = require('fs');
const path = require('path');

const url = 'https://www.reggi.in/wp-content/uploads/2025/02/668504c8e4-REGGI-LOGO-NEW-for-trademark-2.jpg';
const dest = path.join(__dirname, '../public/images/reggi-logo.jpg');

// Ensure parent dir exists
const dir = path.dirname(dest);
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

console.log('Downloading logo from:', url);
const file = fs.createWriteStream(dest);

https.get(url, (response) => {
  if (response.statusCode !== 200) {
    console.error(`Failed to download: Status Code ${response.statusCode}`);
    process.exit(1);
  }
  response.pipe(file);
  file.on('finish', () => {
    file.close(() => {
      console.log('Download completed successfully. Saved to:', dest);
    });
  });
}).on('error', (err) => {
  fs.unlink(dest, () => {});
  console.error('Error downloading file:', err.message);
  process.exit(1);
});
