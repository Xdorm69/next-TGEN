import { NextResponse } from "next/server";
import * as XLSX from "xlsx";

export async function GET() {
  // Example JSON (can be DB data)
  const data = [
    {
      question: "demo quiestion1",
      difficulty: "easy",
      tags: "tag1,tag2",
      option_1: "A",
      option_2: "B",
      option_3: "C",
      option_4: "D",
      answer: 1,
    },
    {
      question: "demo quiestion2",
      difficulty: "medium",
      tags: "tag1,tag2",
      option_1: "A",
      option_2: "B",
      option_3: "C",
      option_4: "D",
      answer: 2,
    },
  ];

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  const buffer = XLSX.write(workbook, {
    type: "buffer",
    bookType: "xlsx",
  });

  return new NextResponse(buffer, {
    headers: {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": 'attachment; filename="data.xlsx"',
    },
  });
}
