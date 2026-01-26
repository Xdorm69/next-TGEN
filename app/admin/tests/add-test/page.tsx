import MaxWidthWrapper from "@/components/Wrappers/MaxWidthWrapper";
import AdminTestEditor from "../../_components/AdminTestEditor";
import { demoJSON } from "@/constants/demoTestJson";

const page = () => {
  return (
    <MaxWidthWrapper>
      <h1 className="heading">Add Test</h1>

      <div className="mt-8">
        <AdminTestEditor defaultJSON={demoJSON} />
      </div>
    </MaxWidthWrapper>
  );
};

export default page;
