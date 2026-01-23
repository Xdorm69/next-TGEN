import { connectDB } from "@/MongoDB/db";
import { getUserId } from "@/utils/UserUtils";
import { NextResponse } from "next/server";
import { Test } from "@/MongoDB/models/test.model";

export async function GET() {
  await connectDB();
  const id = getUserId();
  const allTests = await Test.find({}, {
    name: 1,
    subject:1,
    description:1,
    "questions._id": 1
  }).lean();

  return NextResponse.json({ allTests }, { status: 200 });
}
