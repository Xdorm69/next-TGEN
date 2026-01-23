import { NextResponse } from "next/server";
import mongoose from "mongoose";

import { connectDB } from "@/MongoDB/db";
import { TestStats } from "@/MongoDB/models/testStats.model";
import { User } from "@/MongoDB/models/user.model";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ testId: string }> },
) {
  try {
    await connectDB();

    const p = (await params);
    const testId = p.testId;

    const leaderboard = await TestStats.aggregate([
      // 1️⃣ Only attempts for this test
      {
        $match: {
          test: new mongoose.Types.ObjectId(testId),
        },
      },

      // 2️⃣ Group by user → pick best values
      {
        $group: {
          _id: "$user",
          bestScore: { $max: "$score" },
          bestAccuracy: { $max: "$accuracy" },
          bestTimeTaken: { $min: "$timeTaken" },
        },
      },

      // 3️⃣ Sort leaderboard
      {
        $sort: {
          bestScore: -1,
          bestAccuracy: -1,
          bestTimeTaken: 1,
        },
      },

      // 4️⃣ Join user info
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },

      // 5️⃣ Flatten user array
      { $unwind: "$user" },

      // 6️⃣ Shape final response
      {
        $project: {
          _id: 0,
          userId: "$user._id",
          name: "$user.name",
          email: "$user.email",
          score: "$bestScore",
          accuracy: "$bestAccuracy",
          timeTaken: "$bestTimeTaken",
        },
      },
    ]);

    return NextResponse.json({ leaderboard });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to fetch leaderboard" },
      { status: 500 },
    );
  }
}
