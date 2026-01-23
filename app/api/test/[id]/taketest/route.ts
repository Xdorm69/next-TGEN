import { connectDB } from "@/MongoDB/db";
import { Test } from "@/MongoDB/models/test.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  await connectDB();
  const p = await params;
  const id = p.id;
  const test = await Test.findById(id).lean();

  if (!test) {
    return NextResponse.json({ message: "Test not found" }, { status: 404 });
  }

  return NextResponse.json({
    _id: test._id,
    name: test.name,
    subject: test.subject,
    description: test.description,
    questions: test.questions,
  });
}
