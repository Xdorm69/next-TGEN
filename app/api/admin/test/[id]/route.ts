import { connectDB } from "@/MongoDB/db";
import { Test } from "@/MongoDB/models/test.model";
import { getAuthUser } from "@/utils/authUtil";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const user = await getAuthUser();
    if (!user || user.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const p = await params;
    const id = p.id;

    if (!id)
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });

    await connectDB();
    const body = await req.json();
    const test = await Test.findByIdAndUpdate(id, body);

    if (!test)
      return NextResponse.json({ message: "Test not found" }, { status: 404 });

    return NextResponse.json({ message: "Test updated" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
