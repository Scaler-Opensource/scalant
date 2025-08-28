export function isHtmlEmpty(html) {
  if (!html) return true;
  const cleaned = html
    .replace(/<br\s*\/?>(?=<\/p>)/gi, '')
    .replace(/<p>\s*<\/p>/gi, '')
    .replace(/\s/g, '');
  return !cleaned || cleaned === '' || cleaned === '<p></p>';
}
