// Accepts a normal Drive share link (or a bare file ID) and returns a
// direct image URL. Non-Drive URLs pass through unchanged.
export function driveImage(url?: string, width = 1000): string {
  if (!url) return "";
  const match =
    url.match(/\/file\/d\/([^/]+)/) ||
    url.match(/[?&]id=([^&]+)/) ||
    url.match(/^([\w-]{25,})$/);
  return match
    ? `https://drive.google.com/thumbnail?id=${match[1]}&sz=w${width}`
    : url;
}