import MaxWidthWrapper from "@/components/Wrappers/MaxWidthWrapper";
import { TestType } from "@/Types/TestType";
import axios from "axios";
import { API_URL } from "@/utils/urlUtils";
import TestCard from "@/app/test/_components/TestCard";

const page = async () => {
  const { data } = await axios.get(API_URL + "/test", {
    withCredentials: true,
  });
  const tests: TestType[] = data.allTests;

  return (
    <MaxWidthWrapper>
      <h2 className="heading">Available Tests to update</h2>
      <p className="description w-2xl">Below are some of the available tests</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        {tests.length > 0 ? (
          tests.map((test) => (
            <TestCard
              admin={true}
              key={test._id}
              {...test}
              questionsCount={test.questions.length}
            />
          ))
        ) : (
          <p className="description">No tests available</p>
        )}
      </div>
    </MaxWidthWrapper>
  );
};

export default page;
