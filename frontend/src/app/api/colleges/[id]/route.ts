import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    const res = await fetch(`${API_URL}/colleges/${id}`, {
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      return NextResponse.json({ message: "College not found" }, { status: 404 });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(`[API Proxy] /colleges/${id} error:`, error);
    const { colleges } = await import("@/data/colleges");
    const college = colleges.find(c => c.id === parseInt(id));
    if (!college) return NextResponse.json({ message: "College not found" }, { status: 404 });
    return NextResponse.json(college);
  }
}
