import MaxWidthWrapper from "@/components/Wrappers/MaxWidthWrapper";
import axios from "axios";
import { API_URL } from "@/utils/urlUtils";
import TestCard from "@/app/test/_components/TestCard";
import { TestSchema } from "../../_components/DeleteTestCard";

const page = async () => {
  const { data } = await axios.get(API_URL + "/test", {
    withCredentials: true,
  });
  const tests: TestSchema[] = data.allTests;

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
              author={test.author.name}
              dateCreated={new Date(test.createdAt).toLocaleString()}
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
