import { Button } from "@/components/ui/button";
import MaxWidthWrapper from "@/components/Wrappers/MaxWidthWrapper";
import { API_URL } from "@/utils/urlUtils";
import axios from "axios";
import Link from "next/link";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const p = await params;
  const id = p.id;

  const { data } = await axios.get(`${API_URL}/test/${id}`);
  const { _id, name, subject, description, totalQuestions, difficulty } = data;

  return (
    <MaxWidthWrapper>
      <h1>Test Name: {name}</h1>
      <p>Test Subject: {subject}</p>
      <p>Test Description: {description}</p>
      <p>Total Questions: {totalQuestions}</p>
      <p>Difficulty: {JSON.stringify(difficulty)}</p>

      <Link href={`/test/${id}/taketest`}>
        <Button className="mt-4">Take Test</Button>
      </Link>
    </MaxWidthWrapper>
  );
};

export default page;
