const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const sourcePath = path.join(__dirname, '../public/images/reggi-logo.jpg');
const appFaviconPath = path.join(__dirname, '../app/favicon.ico');
const publicDir = path.join(__dirname, '../public');

async function run() {
  if (!fs.existsSync(sourcePath)) {
    console.error('Source logo file not found:', sourcePath);
    process.exit(1);
  }

  console.log('Generating favicons using sharp from source:', sourcePath);

  // Read the source image. Since it is a JPEG, it's already on a white background.
  // We can convert/resize it.
  const img = sharp(sourcePath);

  // 1. Generate PNG sizes
  const sizes = [
    { size: 180, name: 'apple-touch-icon.png', dest: publicDir },
    { size: 192, name: 'icon-192.png', dest: publicDir },
    { size: 512, name: 'icon-512.png', dest: publicDir },
  ];

  for (const item of sizes) {
    const destPath = path.join(item.dest, item.name);
    await img.clone()
      .resize(item.size, item.size, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
      .png()
      .toFile(destPath);
    console.log(`Generated: ${item.name} (${item.size}x${item.size}) at ${destPath}`);
  }

  // 2. Generate multi-resolution ICO for favicon.ico (16, 32, 48)
  const icoSizes = [16, 32, 48];
  const pngBuffers = [];

  for (const size of icoSizes) {
    const data = await img.clone()
      .resize(size, size, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
      .ensureAlpha()
      .png()
      .toBuffer();
    pngBuffers.push({ width: size, height: size, data });
  }

  // Combine to ICO
  const icoBuffer = createIco(pngBuffers);
  fs.writeFileSync(appFaviconPath, icoBuffer);
  console.log(`Generated multi-resolution ICO: favicon.ico at ${appFaviconPath}`);
}

function createIco(pngBuffers) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // Reserved
  header.writeUInt16LE(1, 2); // Type: Icon (1)
  header.writeUInt16LE(pngBuffers.length, 4); // Count of images

  const directories = [];
  let currentOffset = 6 + 16 * pngBuffers.length;

  for (let i = 0; i < pngBuffers.length; i++) {
    const { width, height, data } = pngBuffers[i];
    const dir = Buffer.alloc(16);
    dir.writeUInt8(width >= 256 ? 0 : width, 0); // Width
    dir.writeUInt8(height >= 256 ? 0 : height, 1); // Height
    dir.writeUInt8(0, 2); // Color count (0 for 256+ colors)
    dir.writeUInt8(0, 3); // Reserved (0)
    dir.writeUInt16LE(1, 4); // Planes (1)
    dir.writeUInt16LE(32, 6); // Bits per pixel (32 bpp for PNG)
    dir.writeUInt32LE(data.length, 8); // Image size
    dir.writeUInt32LE(currentOffset, 12); // Image data offset

    directories.push(dir);
    currentOffset += data.length;
  }

  return Buffer.concat([
    header,
    ...directories,
    ...pngBuffers.map(b => b.data)
  ]);
}

run().catch(err => {
  console.error('Error generating favicons:', err);
  process.exit(1);
});
