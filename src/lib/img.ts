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
    .filter((f) => EXTS.includes(path.extname(f).toLowerCase()) && !/@\d+w\./.test(f))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((f) => '/' + path.posix.join(dir.replace(/^\//, ''), f));
}

/** Smaller responsive copies saved next to an image as name@1200w.webp, name@2400w.webp. Returns a srcset string or undefined. */
export function srcsetFor(src: string, fullWidth: number): string | undefined {
  const ext = path.extname(src);
  const stem = src.slice(0, -ext.length);
  const parts: string[] = [];
  for (const w of [1200, 2400]) {
    if (fs.existsSync(path.join(PUBLIC, `${stem}@${w}w${ext}`.replace(/^\//, '')))) parts.push(`${stem}@${w}w${ext} ${w}w`);
  }
  if (!parts.length) return undefined;
  parts.push(`${src} ${fullWidth}w`);
  return parts.join(', ');
}
