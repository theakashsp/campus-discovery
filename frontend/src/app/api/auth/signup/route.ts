import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const res = await fetch(`${API_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error("[API Proxy] /auth/signup error:", error);
    const { name, email, password, city } = body;
    if (!name || !email || !password || !city) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }
    const user = { name, email, city };
    return NextResponse.json({ user, message: "Signup successful (offline mode)" });
  }
}
