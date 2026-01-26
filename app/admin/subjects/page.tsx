import DataCard from "@/components/DataCard";
import MaxWidthWrapper from "@/components/Wrappers/MaxWidthWrapper";
import { connectDB } from "@/MongoDB/db";
import { Subject } from "@/MongoDB/models/subject.model";
import SubjectCard from "./_components/SubjectCard";

const page = async () => {
  try {
    await connectDB();
    const allSubjects = await Subject.find().lean();
    console.log(allSubjects);

    return (
      <MaxWidthWrapper>
        <h1 className="heading">Manage Subjects</h1>
        <p className="description">Manage subjects for tests</p>

        {/* RENDERING ALL SUBJECTS  */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {allSubjects.map((subject) => (
            <SubjectCard
              key={subject._id}
              title={subject.name}
              description={subject.description}
              color={subject.color}
              tags={subject.tags || []}
              createdAt={new Date(subject.createdAt).toLocaleDateString(
                "en-US",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                },
              )}
              testsLength={subject.tests?.length || 0}
            />
          ))}
        </div>

        {/* OPTIONS */}
        <div className="mt-8 grid grid-cols-4 gap-4">
          <DataCard
            title="Add subject"
            description="Add a new subject"
            href="/admin/subjects/add-subject"
          />
          <DataCard
            title="Update subject"
            description="Update a subject"
            href="/admin/subjects/update-subject"
          />
          <DataCard
            title="Delete subject"
            description="Delete a subject"
            href="/admin/subjects/delete-subject"
          />
        </div>
      </MaxWidthWrapper>
    );
  } catch (error) {
    console.error(error);
    return "server error refresh the page";
  }
};

export default page;
