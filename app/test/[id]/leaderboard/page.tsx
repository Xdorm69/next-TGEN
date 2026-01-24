import MaxWidthWrapper from "@/components/Wrappers/MaxWidthWrapper";

import axios from "axios";
import { API_URL } from "@/utils/urlUtils";
import { LeaderboardTable } from "./leaderboard-table";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function LeaderboardPage({ params }: Props) {
  const id = (await params).id;

  const res = await axios.get(`${API_URL}/test/${id}/leaderboard`);
  const leaderboard = res.data.leaderboard;

  return (
    <MaxWidthWrapper>
      <div className="space-y-6">
        <h1 className="heading text-center">🏆 Leaderboard</h1>
        <LeaderboardTable data={leaderboard} />
      </div>
    </MaxWidthWrapper>
  );
}
