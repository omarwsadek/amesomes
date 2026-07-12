// Step 2 of GitHub login for the CMS.
// GitHub redirects here with a ?code=... which we exchange for an access
// token, then hand back to the CMS window via postMessage (the format
// Sveltia/Decap CMS expects). Runs as a Vercel serverless function.
export default async function handler(req, res) {
  const clientId = process.env.OAUTH_GITHUB_CLIENT_ID;
  const clientSecret = process.env.OAUTH_GITHUB_CLIENT_SECRET;
  const code = req.query.code;

  if (!clientId || !clientSecret) {
    res.status(500).send("Missing GitHub OAuth environment variables.");
    return;
  }

  let content;
  try {
    const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
      }),
    });
    const data = await tokenRes.json();

    if (data.access_token) {
      content = {
        token: data.access_token,
        provider: "github",
      };
    } else {
      content = { error: data.error || "No access token returned" };
    }
  } catch (err) {
    content = { error: String(err) };
  }

  const status = content.error ? "error" : "success";
  const payload = JSON.stringify(content);

  const html = `<!doctype html><html><body><script>
    (function () {
      function receiveMessage(e) {
        window.opener.postMessage(
          'authorization:github:${status}:${payload.replace(/'/g, "\\'")}',
          e.origin
        );
        window.removeEventListener('message', receiveMessage, false);
      }
      window.addEventListener('message', receiveMessage, false);
      window.opener.postMessage('authorizing:github', '*');
    })();
  </script>
  <p>Completing sign-in… you can close this window.</p>
  </body></html>`;

  res.setHeader("Content-Type", "text/html");
  res.status(200).send(html);
}
