import Link from "next/link";
import React from "react";
import { Button } from "./button";
import { capText } from "@/utils/textUtils";
import { getAuthUser } from "@/utils/authUtil";
import LogoutButton from "../LogoutButton";

const Navbar = async () => {
  const navbarItems = ["test", "practice", "leaderboard"];
  const isLoggedIn = await getAuthUser();
  return (
    <div className="max-w-6xl py-4 px-2 mx-auto">
      <div className="flex items-center justify-between">
        {/* LEFT SIDE  */}
        <div>
          <Link href="/">
            <h1 className="font-mono font-bold">TGEN</h1>
          </Link>
        </div>

        {/* RIGHT SIDE  */}
        <div className="flex gap-2 font-sans">
          {navbarItems.map((item) => (
            <Link href={`/${item}`} key={item}>
              <Button variant="ghost">
                <h1>{capText(item)}</h1>
              </Button>
            </Link>
          ))}

          {isLoggedIn ? (
            <LogoutButton />
          ) : (
            <Link href="/login">
              <Button variant="secondary">Login</Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
