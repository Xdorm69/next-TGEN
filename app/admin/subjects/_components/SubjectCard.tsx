import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { capText } from "@/utils/textUtils";

const SubjectCard = ({
  title,
  description,
  color,
  createdAt,
  tags,
  testsLength,
}: {
  title: string;
  description: string;
  color: string;
  createdAt: string;
  tags: string[];
  testsLength: number;
}) => {
  return (
    <Card
      className="

        relative overflow-hidden
        transition-all duration-200
        hover:shadow-lg hover:-translate-y-1
        cursor-pointer
      "
    >
      {/* Accent bar */}
      <div
        className="absolute left-0 top-0 h-full w-2"
        style={{ backgroundColor: color }}
      />

      <CardHeader className="pl-6">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <div className="flex justify-between w-full items-start">
            <div>
              <span
                className="inline-block h-3 w-3 rounded-full font-sans mr-1"
                style={{ backgroundColor: color }}
              />
              {capText(title)}
            </div>
            <div>
                <Badge variant={'ghost'} className="border border-emerald-300">
                    <span className="mr-1 size-2 bg-green-400 rounded-full" />
                    <p>Tests: {testsLength}</p>
                </Badge>
            </div>
          </div>
        </CardTitle>

        <CardDescription className="line-clamp-2 text-sm">
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent className="pl-6 space-y-3">
        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-muted px-3 py-1 text-xs"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <p className="text-xs text-muted-foreground">Created on {createdAt}</p>
      </CardContent>
    </Card>
  );
};

export default SubjectCard;
