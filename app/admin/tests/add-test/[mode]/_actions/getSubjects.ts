"use server";

import { connectDB } from "@/MongoDB/db";
import { Subject } from "@/MongoDB/models/subject.model";

export async function getSubjects() {
  try {
    await connectDB();
    const subjects = await Subject.find({}, { name: 1 }).lean();
    return subjects.map((s) => ({
      _id: s._id.toString(),
      name: s.name,
    }));
    
  } catch (error) {
    console.log(error);
    return [];
  }
}
