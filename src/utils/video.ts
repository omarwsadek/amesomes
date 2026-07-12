// Figure out how to embed a video from a pasted link.
// Supports YouTube, Vimeo, and direct video files (.mp4/.webm/.mov).
type VideoEmbed =
  | { kind: "iframe"; src: string }
  | { kind: "file"; src: string }
  | null;

export function videoEmbed(url: string | undefined): VideoEmbed {
  if (!url) return null;
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./, "");

    // YouTube
    if (host === "youtube.com" || host === "m.youtube.com") {
      const id = u.searchParams.get("v");
      if (id) return { kind: "iframe", src: `https://www.youtube.com/embed/${id}` };
    }
    if (host === "youtu.be") {
      const id = u.pathname.slice(1);
      if (id) return { kind: "iframe", src: `https://www.youtube.com/embed/${id}` };
    }

    // Vimeo
    if (host === "vimeo.com") {
      const id = u.pathname.split("/").filter(Boolean)[0];
      if (id) return { kind: "iframe", src: `https://player.vimeo.com/video/${id}` };
    }

    // Direct video file
    if (/\.(mp4|webm|mov)$/i.test(u.pathname)) {
      return { kind: "file", src: url };
    }
  } catch {
    return null;
  }
  return null;
}
