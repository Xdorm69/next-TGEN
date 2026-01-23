"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

type Props = {
  score: number;
  accuracy: number;
  timeTaken: number;
};

export function TestStatsPage({ score, accuracy, timeTaken }: Props) {
  return (
    <div className="space-y-4 text-center">
      <h1 className="heading">Test Completed 🎉</h1>

      <p>
        Score: <strong>{score}</strong>
      </p>
      <p>
        Accuracy: <strong>{accuracy}%</strong>
      </p>
      <p>
        Time Taken: <strong>{timeTaken.toFixed(2)} seconds</strong>
      </p>

      <Link href="/test">
        <Button>Home</Button>
      </Link>
    </div>
  );
}
