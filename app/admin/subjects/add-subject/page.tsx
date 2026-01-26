// app/admin/subjects/add/page.tsx
import MaxWidthWrapper from "@/components/Wrappers/MaxWidthWrapper";
import { connectDB } from "@/MongoDB/db";
import { Subject } from "@/MongoDB/models/subject.model";
import { ALL_COLORS } from "@/constants/colors";
import { AddSubjectForm } from "./_components/SubjectForm";

const AddSubjectPage = async () => {
  try {
    await connectDB();

    const subjects = await Subject.find({}, { color: 1 }).lean();
    const usedColors = subjects.map((s) => s.color);

    const availableColors = ALL_COLORS.filter(
      (color) => !usedColors.includes(color),
    );

    return (
      <MaxWidthWrapper>
        <h1 className="heading">Add Subject</h1>
        <p className="description">Add a new subject</p>

        <AddSubjectForm availableColors={availableColors} />
      </MaxWidthWrapper>
    );
  } catch (error) {
    console.error(error);
    return (
      <MaxWidthWrapper>
        <h1 className="heading">Add Subject</h1>
        <p className="description">Add a new subject</p>

        <AddSubjectForm availableColors={[]} />
      </MaxWidthWrapper>
    );
  }
};

export default AddSubjectPage;
