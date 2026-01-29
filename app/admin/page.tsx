import React from "react";
import { getAuthUser } from "@/utils/authUtil";
import MaxWidthWrapper from "@/components/Wrappers/MaxWidthWrapper";
import DataCard from "@/components/DataCard";

const AdminPage = async () => {
  const user = await getAuthUser();
  if (!user || user.role !== "admin") {
    return <div>Unauthorized</div>;
  }
  return (
    <MaxWidthWrapper>
      <h1 className="heading">Welcome {user.name ? user.name: "ADMIN"}</h1>
      <p className="description">
        You are logged in as an admin. You can manage tests and users.
      </p>

      <div className="mt-8 grid grid-cols-4 gap-4">
        <DataCard
          title="Manage Tests"
          description="Add, update, and delete tests"
          href="/admin/tests/"
        />
        <DataCard
          title="Manage Subjects"
          description="Add, update, and delete subjects"
          href="/admin/subjects/"
        />
      </div>
    </MaxWidthWrapper>
  );
};

export default AdminPage;
