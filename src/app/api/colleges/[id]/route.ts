import { NextRequest, NextResponse } from "next/server";
import { colleges } from "@/data/colleges";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const college = colleges.find(c => c.id === parseInt(id));
  if (!college) return NextResponse.json({ message: "College not found" }, { status: 404 });
  return NextResponse.json(college);
}
