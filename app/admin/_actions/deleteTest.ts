"use server";

import { connectDB } from "@/MongoDB/db";
import { Test } from "@/MongoDB/models/test.model";
import { getAuthUser } from "@/utils/authUtil";
import { revalidatePath } from "next/cache";

export async function deleteTest(_: any, formData: FormData) {
  try {
    const user = await getAuthUser();
    if (!user || user.role !== "admin") {
      throw new Error("Unauthorized");
    }
    const id = formData.get("testId");
    await connectDB();
    await Test.findByIdAndDelete(id);
    revalidatePath("/admin/delete-test");
  } catch (error) {
    console.log(error);
    throw error;
  }
}
