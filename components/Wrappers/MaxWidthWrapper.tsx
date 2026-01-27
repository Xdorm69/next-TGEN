import React from "react";

const MaxWidthWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-w-6xl py-4 px-2 md:px-4 lg:px-2 mx-auto">
      {children}
    </div>
  );
};

export default MaxWidthWrapper;
