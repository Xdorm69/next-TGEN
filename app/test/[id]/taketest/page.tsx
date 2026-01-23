import MaxWidthWrapper from "@/components/Wrappers/MaxWidthWrapper";
import { API_URL } from "@/utils/urlUtils";
import axios from "axios";
import TakeTestClient from "./_components/TakeTestClient";

const TakeTestPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const p = await params;
  const id = p.id;
  const test = await axios.get(`${API_URL}/test/${id}/taketest`);
  return (
    <MaxWidthWrapper>
      <TakeTestClient test={test.data} startTime={new Date(Date.now())} />
    </MaxWidthWrapper>
  );
};

export default TakeTestPage;
