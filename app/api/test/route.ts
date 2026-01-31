import { connectDB } from "@/MongoDB/db";
import { NextResponse } from "next/server";
import { Test } from "@/MongoDB/models/test.model";
import "@/MongoDB/models/user.model";

export async function GET() {
  await connectDB();
  const allTests = await Test.find(
    {},
    {
      name: 1,
      subject: 1,
      description: 1,
      "questions._id": 1,
      createdAt: 1,
      updatedAt: 1,
      author: 1,
    },
  )
    .populate("author", "name")
    .lean();

  return NextResponse.json(
    {
      allTests: allTests.map((test) => ({
        ...test,
        _id: test._id.toString(),
      })),
    },
    { status: 200 },
  );
}
