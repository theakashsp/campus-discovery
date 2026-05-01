import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, password, city } = body;

  if (!name || !email || !password || !city) {
    return NextResponse.json({ message: "All fields are required" }, { status: 400 });
  }

  const user = { name, email, city };

  return NextResponse.json({ user, message: "Signup successful" });
}
