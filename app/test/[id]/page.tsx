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

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const p = await params;
  const id = p.id;

  const { data } = await axios.get(`${API_URL}/test/${id}`);
  const { name, subject, description, totalQuestions, difficulty } = data;

  return (
    <MaxWidthWrapper>
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-1 text-center">
          <h1 className="heading">{name}</h1>
          <p className="text-muted-foreground">{subject}</p>
        </div>

        {/* Test Card */}
        <Card>
          <CardHeader>
            <CardTitle>Test Overview</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Stats */}
            <div className="flex flex-wrap gap-3">
              <Badge variant="secondary">
                Total Questions: {totalQuestions}
              </Badge>

              <Badge variant="outline">Easy: {difficulty.easy}</Badge>
              <Badge variant="outline">Medium: {difficulty.medium}</Badge>
              <Badge variant="outline">Hard: {difficulty.hard}</Badge>
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
          </CardContent>
        </Card>
      </div>
    </MaxWidthWrapper>
  );
};

export default page;
