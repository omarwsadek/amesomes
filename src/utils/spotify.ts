// Turn a Spotify share link (episode/show/track) into an embeddable URL.
// Accepts things like https://open.spotify.com/episode/xxxx?si=yyyy
export function spotifyEmbed(url: string | undefined): string | null {
  if (!url) return null;
  try {
    const u = new URL(url);
    if (!u.hostname.includes("spotify.com")) return null;
    let path = u.pathname;
    if (!path.startsWith("/embed")) path = "/embed" + path;
    return `https://open.spotify.com${path}`;
  } catch {
    return null;
  }
}
