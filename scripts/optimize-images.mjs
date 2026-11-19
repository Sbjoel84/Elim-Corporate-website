// Resizes and compresses website images in place.
//   npm run optimize-images
// Run it again whenever new photos are added. Files that are already small are
// skipped, and a file is only replaced if the optimised version is smaller.
import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';

const DIRS = ['public/assets', 'src/assets/images'];
const MAX_WIDTH = 1920;
const SKIP_BELOW_BYTES = 400 * 1024;

async function* walk(dir) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (/\.(jpe?g|png)$/i.test(entry.name)) yield full;
  }
}

let before = 0;
let after = 0;

for (const dir of DIRS) {
  for await (const file of walk(dir)) {
    const original = await fs.readFile(file);
    before += original.length;
    if (original.length < SKIP_BELOW_BYTES) {
      after += original.length;
      continue;
    }

    // rotate() applies the camera's EXIF orientation before metadata is stripped.
    let pipeline = sharp(original).rotate().resize({ width: MAX_WIDTH, withoutEnlargement: true });
    pipeline = /\.png$/i.test(file)
      ? pipeline.png({ compressionLevel: 9, palette: true, quality: 90 })
      : pipeline.jpeg({ quality: 78, mozjpeg: true, progressive: true });
    const optimised = await pipeline.toBuffer();

    if (optimised.length < original.length) {
      await fs.writeFile(file, optimised);
      after += optimised.length;
      console.log(`${file}: ${(original.length / 1e6).toFixed(1)} MB -> ${(optimised.length / 1e6).toFixed(2)} MB`);
    } else {
      after += original.length;
    }
  }
}

console.log(`\nTotal: ${(before / 1e6).toFixed(1)} MB -> ${(after / 1e6).toFixed(1)} MB`);
