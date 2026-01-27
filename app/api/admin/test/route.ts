import { testSchema } from "@/lib/validator/testJson";
import { connectDB } from "@/MongoDB/db";
import { Subject } from "@/MongoDB/models/subject.model";
import { Test } from "@/MongoDB/models/test.model";
import { getAuthUser } from "@/utils/authUtil";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDB();
    const user = await getAuthUser();
    if (!user || user.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const body = await req.json();

    const test = testSchema.safeParse(body);
    if (!test.success) {
      return NextResponse.json({ message: "Invalid JSON" }, { status: 400 });
    }

    const t = await Subject.findById(test.data.subject);
    if (!t) {
      return NextResponse.json(
        { message: "Subject not found" },
        { status: 404 },
      );
    }
    
    await Test.create({ ...test.data, author: user.id });

    return NextResponse.json({ message: "Test created" }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
