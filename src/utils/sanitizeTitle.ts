export default function sanitizeTitle(title: string) {
  return title
    .replace(/:/g, '')  // remove colons
    .replace(/"/g, '') // remove quotes
    .trim();            // remove leading/trailing whitespace
}
