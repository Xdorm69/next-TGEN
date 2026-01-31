"use client";
import MaxWidthWrapper from "@/components/Wrappers/MaxWidthWrapper";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const page = () => {
  const [timer, setTimer] = useState(5);

  useEffect(() => {
    const t = setTimeout(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearTimeout(t);
  }, [timer]);

  const router = useRouter();

  if (timer === 0) {
    router.push("/");
  }
  return (
    <MaxWidthWrapper>
      <div>
        <h1>OOPS!!</h1>
        <p>You are not authorized to access this page</p>
        <p>Redirecting you back to home page in {timer}</p>
      </div>
    </MaxWidthWrapper>
  );
};

export default page;
