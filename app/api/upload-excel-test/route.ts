import { ExcelUploadSchema } from "@/app/admin/tests/add-test/_components/AddTestExcel";
import { connectDB } from "@/MongoDB/db";
import { Subject } from "@/MongoDB/models/subject.model";
import { Test } from "@/MongoDB/models/test.model";
import { getAuthUser } from "@/utils/authUtil";
import { NextResponse } from "next/server";
import * as XLSX from "xlsx";
import mongoose from "mongoose";

type JsonRow = {
  question: string;
  difficulty: string;
  tags: string; // comma separated
  option_1: string;
  option_2: string;
  option_3: string;
  option_4: string;
  answer: number; // 1 | 2 | 3 | 4
};

export async function POST(req: Request) {
  try {
    const user = await getAuthUser();
    if (!user || user.role !== "admin") {
      return NextResponse.json(
        { success: false, message: "Unauthorized access" },
        { status: 401 },
      );
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const subject = formData.get("subject") as string;

    if (!file) {
      return NextResponse.json(
        { success: false, message: "Excel file is required" },
        { status: 400 },
      );
    }

    await connectDB();

    if (!mongoose.Types.ObjectId.isValid(subject)) {
      return NextResponse.json(
        { success: false, message: "Invalid subject ID" },
        { status: 400 },
      );
    }

    const isSubjectValid = await Subject.findById(subject);
    if (!isSubjectValid) {
      return NextResponse.json(
        { success: false, message: "Selected subject does not exist" },
        { status: 404 },
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const workbook = XLSX.read(buffer, { type: "buffer" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];

    const jsonData = XLSX.utils.sheet_to_json<JsonRow>(sheet);

    if (jsonData.length === 0) {
      return NextResponse.json(
        { success: false, message: "Excel sheet is empty" },
        { status: 400 },
      );
    }

    const questions = jsonData.map((row, index) => {
      if (!row.question || !row.answer) {
        throw new Error(`Invalid data at row ${index + 2}`);
      }

      return {
        title: row.question.trim(),
        difficulty: row.difficulty.toLowerCase(),
        tags: row.tags ? row.tags.split(",").map((t) => t.trim()) : [],
        options: [
          { title: row.option_1, isCorrect: row.answer === 1 },
          { title: row.option_2, isCorrect: row.answer === 2 },
          { title: row.option_3, isCorrect: row.answer === 3 },
          { title: row.option_4, isCorrect: row.answer === 4 },
        ],
      };
    });

    await Test.create({
      name: title,
      subject,
      description,
      questions,
      author: user.id,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Test uploaded successfully",
        count: questions.length,
      },
      { status: 201 },
    );
  } catch (err: any) {
    console.error(err);

    return NextResponse.json(
      {
        success: false,
        message: err.message || "Something went wrong while uploading test",
      },
      { status: 500 },
    );
  }
}

