import MaxWidthWrapper from "@/components/Wrappers/MaxWidthWrapper";
import AdminTestEditor from "../../_components/AdminTestEditor";
import { demoJSON } from "@/constants/demoTestJson";
import { getAuthUser } from "@/utils/authUtil";
import { connectDB } from "@/MongoDB/db";
import { Subject } from "@/MongoDB/models/subject.model";
import SelectSubject from "./_components/SelectSubject";

const page = async () => {
  const user = await getAuthUser();
  if (!user || user.role !== "admin") {
    return <div>Unauthorized</div>;
  }
  await connectDB();
  const subjects = await Subject.find().lean();

  return (
    <MaxWidthWrapper>
      <h1 className="heading">Add Test</h1>

      <div className="mt-8">
        <SelectSubject
          subjects={subjects.map((s) => ({ ...s, _id: s._id.toString() }))}
        />
        <AdminTestEditor defaultJSON={demoJSON} />
      </div>
    </MaxWidthWrapper>
  );
};

export default page;
