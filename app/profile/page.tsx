import LogoutButton from "@/components/LogoutButton";
import MaxWidthWrapper from "@/components/Wrappers/MaxWidthWrapper";
import { getAuthUser } from "@/utils/authUtil";
import { notFound } from "next/navigation";
import TestsTaken from "./_components/TestsTaken";

const page = async () => {
  const user = await getAuthUser();
  if (!user) return notFound();
  return (
    <MaxWidthWrapper>
      <UserProfile user={user} />
      <TestsTaken/>
    </MaxWidthWrapper>
  );
};

const UserProfile = ({ user }: { user: any }) => {
  return (
    <div>
      <div>Username: {user?.name}</div>
      <LogoutButton />
    </div>
  );
};

export default page;
