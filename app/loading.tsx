import SpinningLoader from "@/components/SpinningLoader";
import React from "react";

const loading = () => {
  return (
    <div className="fixed inset-0 z-50 w-screen h-screen bg-background flex items-center justify-center">
      <SpinningLoader />
    </div>
  );
};

export default loading;
