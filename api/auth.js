// Step 1 of GitHub login for the CMS.
// Redirects the user to GitHub to authorize, then GitHub sends them back
// to /api/callback. Runs as a Vercel serverless function.
export default function handler(req, res) {
  const clientId = process.env.OAUTH_GITHUB_CLIENT_ID;
  if (!clientId) {
    res.status(500).send("Missing OAUTH_GITHUB_CLIENT_ID environment variable.");
    return;
  }

  const host = req.headers.host;
  const redirectUri = `https://${host}/api/callback`;
  const state = Math.random().toString(36).slice(2);

  const url =
    "https://github.com/login/oauth/authorize" +
    `?client_id=${encodeURIComponent(clientId)}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}` +
    "&scope=repo" +
    `&state=${state}`;

  res.writeHead(302, { Location: url });
  res.end();
}
