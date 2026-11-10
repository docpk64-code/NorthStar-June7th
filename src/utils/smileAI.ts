export const SMILE_CONSENT_VERSION = '2026-11-10';
export const SMILE_STATUS_URL = '/.netlify/functions/smile-status';
export const SMILE_GENERATE_URL = '/.netlify/functions/smile-generate';

// Re-encode in the browser to strip EXIF metadata, names and GPS before transmission.
export async function prepareSmilePhoto(url: string): Promise<string> {
  const image = new Image(); image.src = url; await image.decode();
  const canvas = document.createElement('canvas');
  // Square letterboxing preserves the entire photo and matches the output dimensions.
  canvas.width = 1024; canvas.height = 1024;
  const context = canvas.getContext('2d'); if (!context) throw new Error('Photo preparation is unavailable in this browser.');
  context.fillStyle = '#faf9f6'; context.fillRect(0, 0, 1024, 1024);
  const scale = Math.min(1024 / image.naturalWidth, 1024 / image.naturalHeight);
  const width = Math.round(image.naturalWidth * scale), height = Math.round(image.naturalHeight * scale);
  context.drawImage(image, (1024 - width) / 2, (1024 - height) / 2, width, height);
  const result = canvas.toDataURL('image/jpeg', 0.88);
  if (!result.startsWith('data:image/jpeg;base64,') || result.length > 2_600_000) throw new Error('Please choose a smaller smile photo.');
  return result;
}
