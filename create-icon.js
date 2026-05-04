const fs = require('fs');
const path = require('path');

// ICO file creator (creates 256x256 icon)
const width = 256;
const height = 256;

// Create a simple icon with a gear pattern
const pixels = [];
const cx = width / 2, cy = height / 2;
for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
        const dx = x - cx, dy = y - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx);
        const tooth = Math.sin(angle * 8) > 0.5;
        
        // Gear shape: center circle + teeth
        if (dist < 60 || (dist < 90 && tooth)) {
            pixels.push(0x00, 0x7B, 0xFF, 0xFF); // Blue gear
        } else if (dist < 100) {
            pixels.push(0x00, 0x00, 0x00, 0x00); // Transparent
        } else {
            pixels.push(0x00, 0x00, 0x00, 0x00); // Transparent
        }
    }
}

const pixelData = Buffer.from(pixels);

// ICO header
const numImages = 1;
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); // Reserved
header.writeUInt16LE(1, 2); // Type: ICO
header.writeUInt16LE(numImages, 4);

// Image directory entry
const dirEntry = Buffer.alloc(16);
dirEntry.writeUInt8(width, 0);
dirEntry.writeUInt8(height, 1);
dirEntry.writeUInt8(0, 2); // Palette
dirEntry.writeUInt8(0, 3); // Reserved
dirEntry.writeUInt16LE(1, 4); // Color planes
dirEntry.writeUInt16LE(32, 6); // Bits per pixel
dirEntry.writeUInt32LE(pixelData.length + 40, 8); // Size of image data
dirEntry.writeUInt32LE(22, 12); // Offset (6 + 16 = 22)

// BITMAPINFOHEADER
const bmpHeader = Buffer.alloc(40);
bmpHeader.writeUInt32LE(40, 0); // Header size
bmpHeader.writeInt32LE(width, 4);
bmpHeader.writeInt32LE(height * 2, 8); // Height (including XOR and AND masks)
bmpHeader.writeUInt16LE(1, 12); // Planes
bmpHeader.writeUInt16LE(32, 14); // Bits per pixel
bmpHeader.writeUInt32LE(0, 16); // Compression (BI_RGB)

// AND mask (all transparent) - 1 bit per pixel
const andMask = Buffer.alloc(Math.ceil(width / 8) * height, 0xFF);

// Combine all
const ico = Buffer.concat([header, dirEntry, bmpHeader, pixelData, andMask]);

fs.writeFileSync(path.join(__dirname, 'data', 'gear.ico'), ico);
console.log('Icon created: data/gear.ico');
