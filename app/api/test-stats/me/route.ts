import { connectDB } from "@/MongoDB/db";
import { TestStats } from "@/MongoDB/models/testStats.model";
import { getAuthUser } from "@/utils/authUtil";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const user = await getAuthUser();
    console.log(user);
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    await connectDB();
    const testTakenByUser = await TestStats.find({ user: user.id }).lean();
    return NextResponse.json(testTakenByUser, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
