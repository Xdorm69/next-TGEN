"use client";

import { useSession, signOut } from "next-auth/react";
import { Button } from "./ui/button";

const NavbarAuthButton = () => {
  const { data: session, status } = useSession();

  // optional: prevent flicker
  if (status === "loading") return null;

  if (!session) {
    return null; // or Login button
  }

  return (
    <Button onClick={() => signOut({ callbackUrl: "/login" })}>Logout</Button>
  );
};

export default NavbarAuthButton;
