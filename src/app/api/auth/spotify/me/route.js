import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    const token = cookies().get("spotify_access_token")?.value;

    if (!token) {
        return NextResponse.json({ error: "No token" }, { status: 401 });
    }

    const res = await fetch("https://api.spotify.com/v1/me", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await res.json();
    return NextResponse.json(data);
}
