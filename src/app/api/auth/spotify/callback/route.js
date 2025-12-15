import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "No code provided" }, { status: 400 });
  }

  const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        Buffer.from(
          process.env.SPOTIFY_CLIENT_ID +
            ":" +
            process.env.SPOTIFY_CLIENT_SECRET
        ).toString("base64"),
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
    }),
  });

  const data = await tokenRes.json();

  if (!tokenRes.ok) {
    console.error(data);
    return NextResponse.json(data, { status: 500 });
  }

  const response = NextResponse.redirect(
    new URL("/mood", req.url)
  );

  // 🔐 Store token securely (cookie)
  response.cookies.set("spotify_access_token", data.access_token, {
    httpOnly: true,
    secure: false, // set true in production
    path: "/",
    maxAge: data.expires_in,
  });

  response.cookies.set("spotify_refresh_token", data.refresh_token, {
    httpOnly: true,
    secure: false,
    path: "/",
  });

  return response;
}
