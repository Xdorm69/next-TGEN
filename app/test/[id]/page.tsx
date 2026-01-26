import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import MaxWidthWrapper from "@/components/Wrappers/MaxWidthWrapper";
import { API_URL } from "@/utils/urlUtils";
import axios from "axios";
import Link from "next/link";
import { capText } from "@/utils/textUtils";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const p = await params;
  const id = p.id;

  const { data } = await axios.get(`${API_URL}/test/${id}`);
  const {
    name,
    subject,
    subjectColor,
    description,
    totalQuestions,
    difficulty,
  } = data;

  return (
    <MaxWidthWrapper>
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center flex items-center justify-center gap-2">
          <span
            style={{ backgroundColor: subjectColor }}
            className="w-3 h-3 rounded-full inline-block"
          />
          <h1 className="heading">{name}</h1>
        </div>

        {/* Test Card */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Test Overview</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>

          <CardContent>
            <Badge className="mb-2" style={{ background: subjectColor }}>
              {capText(subject)}
            </Badge>
            <div className="space-y-4">
              {/* Stats */}
              <div className="flex flex-wrap gap-3">
                <Badge variant="secondary">
                  Total Questions: {totalQuestions}
                </Badge>

                <Badge
                  variant="outline"
                  className="bg-green-500/20 border-green-500"
                >
                  Easy: {difficulty.easy}
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-yellow-500/20 border-yellow-500"
                >
                  Medium: {difficulty.medium}
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-red-500/20 border-red-500"
                >
                  Hard: {difficulty.hard}
                </Badge>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Link href={`/test/${id}/taketest`} className="flex-1">
                  <Button className="w-full">🚀 Take Test</Button>
                </Link>

                <Link href={`/test/${id}/leaderboard`} className="flex-1">
                  <Button variant="outline" className="w-full">
                    🏆 View Leaderboard
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MaxWidthWrapper>
  );
};

export default page;
