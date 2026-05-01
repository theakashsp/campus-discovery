import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function GET(req: NextRequest) {
  const params = new URL(req.url).searchParams.toString();

  try {
    const res = await fetch(`${API_URL}/search?${params}`, {
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Backend request failed" }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("[API Proxy] /search error:", error);
    // Fallback to local data
    const { colleges } = await import("@/data/colleges");
    const query = new URL(req.url).searchParams.get("query")?.toLowerCase() || "";

    if (!query) return NextResponse.json({ data: colleges.slice(0, 12), meta: { total: colleges.length } });

    const results = colleges.filter(c =>
      c.name.toLowerCase().includes(query) ||
      c.city.toLowerCase().includes(query) ||
      c.state.toLowerCase().includes(query) ||
      c.courses.some(cr => cr.name.toLowerCase().includes(query))
    );

    return NextResponse.json({ data: results, meta: { total: results.length } });
  }
}
