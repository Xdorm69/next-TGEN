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
      <h1 className="heading">Welcome {user.name ? user.name : "ADMIN"}</h1>
      <p className="description">
        You are logged in as an admin. You can manage tests and users.
      </p>

      <div className="mt-8 grid grid-cols-4 gap-4">
        <DataCard title="Add test" description="Add a new test" href="/admin/tests/add-test"/>
        <DataCard title="Update test" description="Update a test" href="/admin/tests/update-test"/>
        <DataCard title="Delete test" description="Delete a test" href="/admin/tests/delete-test"/>
      </div>
    </MaxWidthWrapper>
  );
};

export default AdminPage;
