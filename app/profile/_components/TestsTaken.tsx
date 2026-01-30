import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectDB } from "@/MongoDB/db";
import { Test } from "@/MongoDB/models/test.model";
import { TestStats } from "@/MongoDB/models/testStats.model";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";

const TestsTaken = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return <div>Not authenticated</div>;
  }

  await connectDB();

  const testsSummary = await TestStats.aggregate([
    { $match: { user: new mongoose.Types.ObjectId(session.user.id) } },

    {
      $group: {
        _id: "$test",
        attempts: { $sum: 1 },
        bestScore: { $max: "$score" },
        avgAccuracy: { $avg: "$accuracy" },
        avgTime: { $avg: "$timeTaken" },
      },
    },

    {
      $lookup: {
        from: "tests",
        localField: "_id",
        foreignField: "_id",
        as: "test",
      },
    },

    { $unwind: "$test" },

    {
      $project: {
        testId: "$_id",
        attempts: 1,
        bestScore: 1,
        avgAccuracy: { $round: ["$avgAccuracy", 2] },
        avgTime: { $round: ["$avgTime", 2] },
        test: {
          title: "$test.name",
          totalQuestions: { $size: "$test.questions" },
        },
      },
    },
  ]);


  type TestSummary = {
    testId: string;
    attempts: number;
    bestScore: number;
    avgAccuracy: number;
    avgTime: number;
    test: {
      title: string;
      totalQuestions: number;
    };
  };

  return (
    <div>
      <div>{testsSummary.length} tests</div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-4 gap-4">
        {testsSummary.map((test: TestSummary) => (
          <div
            key={test.testId}
            className="border border-gray-200 p-4 rounded-lg"
          >
            <div>{test.test.title}</div>
            <div>{test.test.totalQuestions} questions</div>
            <div>{test.attempts} attempts</div>
            <div>{test.bestScore} best score</div>
            <div>{test.avgAccuracy}% avg accuracy</div>
            <div>{test.avgTime} avg time</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestsTaken;
