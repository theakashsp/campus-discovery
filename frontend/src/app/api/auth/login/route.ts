import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, password } = body;

  if (!email || !password) {
    return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
  }

  // Mock auth — accept any valid-looking credentials
  const user = {
    name: email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase()),
    email,
    city: "Bangalore",
  };

  return NextResponse.json({ user, message: "Login successful" });
}
