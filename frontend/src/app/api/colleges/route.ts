import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function GET(req: NextRequest) {
  try {
    const params = new URL(req.url).searchParams.toString();
    const res = await fetch(`${API_URL}/colleges?${params}`, {
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Backend request failed" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("[API Proxy] /colleges error:", error);
    const { colleges } = await import("@/data/colleges");
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");
    const query = searchParams.get("query")?.toLowerCase() || "";
    const state = searchParams.get("state") || "";
    const city = searchParams.get("city") || "";
    const type = searchParams.get("type") || "";
    const course = searchParams.get("course") || "";
    const maxFees = searchParams.get("maxFees") || "";

    let filtered = [...colleges];
    if (query) {
      filtered = filtered.filter(c =>
        c.name.toLowerCase().includes(query) ||
        c.city.toLowerCase().includes(query) ||
        c.state.toLowerCase().includes(query) ||
        c.type.toLowerCase().includes(query) ||
        c.courses.some(cr => cr.name.toLowerCase().includes(query) ||
          (cr.eligibility && cr.eligibility.toLowerCase().includes(query))
        ) ||
        (c.admission && c.admission.exams && c.admission.exams.some(
          (exam: string) => exam.toLowerCase().includes(query)
        ))
      );
    }
    if (state) filtered = filtered.filter(c => c.state === state);
    if (city) filtered = filtered.filter(c => c.city === city);
    if (type) filtered = filtered.filter(c => c.type === type);
    if (course) filtered = filtered.filter(c => c.courses.some(cr => cr.name.toLowerCase().includes(course.toLowerCase())));
    if (maxFees) filtered = filtered.filter(c => c.fees_max <= parseInt(maxFees));

    const total = filtered.length;
    const totalPages = Math.ceil(total / limit);
    const start = (page - 1) * limit;
    const data = filtered.slice(start, start + limit);

    return NextResponse.json({ data, meta: { total, totalPages, page, limit } });
  }
}
