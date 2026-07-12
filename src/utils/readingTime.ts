// Rough reading-time estimate from raw markdown/body text.
// ~200 words per minute; always at least "1 min read".
export function readingTime(text: string | undefined): string {
  const words = (text ?? "").trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}
