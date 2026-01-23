import { connectDB } from "@/MongoDB/db";
import { Test } from "@/MongoDB/models/test.model";
import { notFound } from "next/navigation";
import React from "react";
import AdminTestEditor from "../../_components/AdminTestEditor";
import MaxWidthWrapper from "@/components/Wrappers/MaxWidthWrapper";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const p = await params;
  const id = p.id;

  await connectDB();
  const test = await Test.findById(id);

  if (!test) {
    return notFound();
  }
  return (
    <MaxWidthWrapper>
        <h1 className="heading">Update test</h1>
      <div className="mt-8">
        <AdminTestEditor defaultJSON={JSON.stringify(test)} testId={id} />
      </div>
    </MaxWidthWrapper>
  );
};

export default page;
