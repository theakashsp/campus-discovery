import { NextRequest, NextResponse } from "next/server";
import { colleges } from "@/data/colleges";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query")?.toLowerCase() || "";

  if (!query) return NextResponse.json({ data: colleges.slice(0, 12), meta: { total: colleges.length } });

  const results = colleges.filter(c =>
    c.name.toLowerCase().includes(query) ||
    c.city.toLowerCase().includes(query) ||
    c.state.toLowerCase().includes(query) ||
    c.courses.some(cr => cr.name.toLowerCase().includes(query))
  );

  return NextResponse.json({ data: results, meta: { total: results.length } });
}
