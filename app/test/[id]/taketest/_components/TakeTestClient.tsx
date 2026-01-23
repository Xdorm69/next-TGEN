"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { TestStatsPage } from "./TestStats";
import { API_URL } from "@/utils/urlUtils";
import axios from "axios";

type Option = {
  _id: string;
  title: string;
};

type Question = {
  _id: string;
  title: string;
  options: Option[];
};

type Props = {
  test: {
    _id: string;
    name: string;
    subject: string;
    description: string;
    questions: Question[];
  };
  startTime: Date;
};

type Result = {
  score: number;
  accuracy: number;
};

export default function TakeTestClient({ test, startTime }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<Result | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const currentQuestion = test.questions[currentIndex];

  /* ---------- Option select ---------- */
  const handleOptionClick = (optionId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion._id]: optionId,
    }));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if submitting
      if (submitting) return;

      /* ---------- Option select: 1-4 ---------- */
      if (["1", "2", "3", "4"].includes(e.key)) {
        const index = Number(e.key) - 1;
        const option = currentQuestion.options[index];

        if (option) {
          handleOptionClick(option._id);
        }
      }

      /* ---------- Enter = next / submit ---------- */
      if (e.key === "Enter") {
        if (answers[currentQuestion._id]) {
          nextQuestion();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentQuestion, answers, submitting]);

  /* ---------- Submit test ---------- */
  const submitTest = async () => {
    try {
      setSubmitting(true);

      const timeTaken = (Date.now() - startTime.getTime()) / 1000;

      const res = await axios.post(`${API_URL}/test/${test._id}/submit`, {
        answers,
        timeTaken,
        testId: test._id,
        test,
      });

      const data = await res.data;

      setResult({
        score: data.score,
        accuracy: data.accuracy,
      });
    } catch (err) {
      console.error(err);
      alert("Something went wrong while submitting the test");
    } finally {
      setSubmitting(false);
    }
  };

  /* ---------- Next / Finish ---------- */
  const nextQuestion = async () => {
    if (currentIndex === test.questions.length - 1) {
      await submitTest();
    } else {
      setCurrentIndex((i) => i + 1);
    }
  };

  /* ---------- Result screen ---------- */
  if (result) {
    return (
      <TestStatsPage
        score={result.score}
        accuracy={result.accuracy}
        timeTaken={(Date.now() - startTime.getTime()) / 1000}
      />
    );
  }

  /* ---------- Question screen ---------- */
  return (
    <div className="space-y-6 relative">
      <div
        style={{
          width: (currentIndex / test.questions.length) * 100 + "%",
          height: "2px",
          backgroundColor: "#008000",
          display: "block",
          position: "absolute",
          top: -20,
          left: 0,
        }}
      />
      <h1 className="heading">{test.name}</h1>

      <div>
        <p className="text-sm text-muted-foreground">
          Question {currentIndex + 1} / {test.questions.length}
        </p>
        <h2 className="text-xl font-semibold">{currentQuestion.title}</h2>
      </div>

      {/* Options */}
      <div className="grid grid-cols-2 gap-4">
        {currentQuestion.options.map((opt) => {
          const selected = answers[currentQuestion._id] === opt._id;

          return (
            <button
              key={opt._id}
              onClick={() => handleOptionClick(opt._id)}
              className={`border rounded-lg p-4 text-left transition
                ${
                  selected
                    ? "border-primary bg-primary/10"
                    : "hover:border-primary/50"
                }
              `}
            >
              {opt.title}
            </button>
          );
        })}
      </div>

      <Button
        onClick={nextQuestion}
        disabled={!answers[currentQuestion._id] || submitting}
      >
        {currentIndex === test.questions.length - 1
          ? submitting
            ? "Submitting..."
            : "Finish Test"
          : "Next Question"}
      </Button>
    </div>
  );
}
