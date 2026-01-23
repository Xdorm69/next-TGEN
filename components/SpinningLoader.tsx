import React from "react";
import { Loader } from "lucide-react";

const SpinningLoader = () => {
  return (
    <div className="animate-spin">
      <Loader className="size-5 text-blue-600" />
    </div>
  );
};

export default SpinningLoader;
