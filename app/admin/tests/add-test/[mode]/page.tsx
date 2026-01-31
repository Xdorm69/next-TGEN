import AddTestExcel from "../_components/AddTestExcel";
import AddTestForm from "../_components/AddTestForm";
import { AddTestJson } from "../_components/AddTestJson";
import { getSubjects } from "./_actions/getSubjects";

const page = async ({ params }: { params: Promise<{ mode: string }> }) => {
  const p = await params;
  const mode = p.mode;
  
  const subjects = await getSubjects();
  
  if (mode === "json") return <AddTestJson />;
  else if (mode === "excel") return <AddTestExcel subjects={subjects} />;
  else return <AddTestForm />;
};

export default page;
