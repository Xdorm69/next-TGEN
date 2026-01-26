import { NextResponse } from "next/server";
import { connectDB } from "@/MongoDB/db";
import { getAuthUser } from "@/utils/authUtil";
import { TestStats } from "@/MongoDB/models/testStats.model";

export type WrongAnswer = {
  question: string;
  selectedOption: string;
  correctOption: string;
};

export async function POST(req: Request) {
  await connectDB();

  const user = await getAuthUser();
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { testId, answers, timeTaken, test } = await req.json();

  let correct = 0;

  const wrongAnswers: WrongAnswer[] = [];

  test.questions.forEach((q: any) => {
    const selectedOptionId = answers[q._id];
    const correctOption = q.options.find((o: any) => o.isCorrect);

    if (selectedOptionId === correctOption?._id) {
      correct++;
    } else {
      wrongAnswers.push({
        question: q.title,
        selectedOption: q.options.find((o: any) => o._id === selectedOptionId)?.title || "",
        correctOption: correctOption.title,
      });
    }
  });


  const score = correct;
  const accuracy = ((correct / test.questions.length) * 100).toFixed(2);

  await TestStats.create({
    user: user.id,
    test: test._id,
    score,
    accuracy,
    timeTaken,
    //wrongattempts has to be implemented at api level;
  });

  return NextResponse.json({
    score,
    accuracy,
    wrongAnswers,
  });
}
