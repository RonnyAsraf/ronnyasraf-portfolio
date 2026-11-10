import fs from 'node:fs';
import path from 'node:path';

const PUBLIC = path.resolve('public');
const EXTS = ['.webp', '.avif', '.png', '.jpg', '.jpeg', '.gif', '.mp4'];

/**
 * Resolve an image by its base path (without extension), e.g. "images/case-studies/cover/01".
 * Returns the public URL if a file exists, otherwise null (the caller renders a placeholder).
 */
export function findImage(base: string): string | null {
  const clean = base.replace(/^\//, '');
  for (const ext of EXTS) {
    if (fs.existsSync(path.join(PUBLIC, clean + ext))) return '/' + clean + ext;
  }
  return null;
}

/** List every image in a public folder, sorted naturally (1, 2, 10). */
export function listImages(dir: string): string[] {
  const full = path.join(PUBLIC, dir.replace(/^\//, ''));
  if (!fs.existsSync(full)) return [];
  return fs
    .readdirSync(full)
    .filter((f) => EXTS.includes(path.extname(f).toLowerCase()) && !f.startsWith('card'))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((f) => '/' + path.posix.join(dir.replace(/^\//, ''), f));
}
