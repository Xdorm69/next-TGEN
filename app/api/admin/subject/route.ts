import { subjectSchema, SubjectSchema } from "@/lib/validator/subject";
import { connectDB } from "@/MongoDB/db";
import { Subject } from "@/MongoDB/models/subject.model";
import { getAuthUser } from "@/utils/authUtil";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthUser();
    if (!user || user.role !== "admin") {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    await connectDB();

    const subjectData = await request.json();
    const parsedSubjectData = subjectSchema.safeParse(subjectData);

    if (!parsedSubjectData.success) {
      return Response.json({ error: "Invalid subject data" }, { status: 400 });
    }

    const subject = await Subject.create(parsedSubjectData.data);

    return Response.json(subject);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
