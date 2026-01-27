import { connectDB } from "@/MongoDB/db";
import { Subject } from "@/MongoDB/models/subject.model";
import { Test } from "@/MongoDB/models/test.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();
    const p = await params;
    const id = p.id;
    const test = await Test.findById(id, {
      name: 1,
      subject: 1,
      description: 1,
      tags: 1,
      "questions.difficulty": 1,
    })
      .populate("subject", "name color")
      .lean();

    if (!test) {
      return NextResponse.json({ message: "Test not found" }, { status: 404 });
    }

    const difficultyCount = {
      easy: 0,
      medium: 0,
      hard: 0,
    };

    for (const q of test.questions) {
      if (q.difficulty in difficultyCount) {
        difficultyCount[q.difficulty as keyof typeof difficultyCount]++;
      }
    }

    return NextResponse.json({
      _id: test._id,
      name: test.name,
      subject: test.subject.name,
      subjectColor: test.subject.color,
      description: test.description,
      totalQuestions: test.questions.length,
      difficulty: difficultyCount,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
