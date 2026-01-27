import SpinningLoader from "@/components/SpinningLoader";
import React from "react";

const loading = () => {
  return (
    <div className="z-10 absolute top-0 left-0 w-full h-full flex items-center justify-center">
      <SpinningLoader />
    </div>
  );
};

export default loading;
