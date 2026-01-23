"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";

const TestCard = ({
  _id,
  name,
  description,
  admin,
  questionsCount,

}: {
  _id: string;
  name: string;
  description: string;
  admin?: boolean;
  questionsCount: number;

}) => {
  const router = useRouter();
  return (
    <Card
      onClick={() =>
        admin
          ? router.push(`/admin/update-test/${_id}`)
          : router.push(`/test/${_id}`)
      }
    >
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Available Questions: {questionsCount}</p>
      </CardContent>
    </Card>
  );
};

export default TestCard;
