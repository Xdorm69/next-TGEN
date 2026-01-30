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
  const test = await Test.findById(id).populate("subject", "name color").lean();

  if (!test) {
    return NextResponse.json({ message: "Test not found" }, { status: 404 });
  }

  const shuffle = <T>(array: T[]) => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  return NextResponse.json({
    _id: test._id,
    name: test.name,
    subject: test.subject,
    description: test.description,
    questions: shuffle(test.questions),
  });
}
