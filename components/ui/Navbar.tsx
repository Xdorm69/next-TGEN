import Link from "next/link";
import { Button } from "./button";
import { capText } from "@/utils/textUtils";
import { getAuthUser } from "@/utils/authUtil";
import LogoutButton from "../LogoutButton";
import MobileNav from "./MobileNav";

const Navbar = async () => {
  const navbarItems = ["test", "practice", "leaderboard"];
  const user = await getAuthUser();

  return (
    <div className="max-w-6xl py-4 px-2 mx-auto">
      <div className="flex items-center justify-between">
        {/* LEFT */}
        <Link href="/">
          <h1 className="font-mono font-bold">TGEN</h1>
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex gap-2 font-sans">
          {navbarItems.map((item) => (
            <Link href={`/${item}`} key={item}>
              <Button variant="ghost">{capText(item)}</Button>
            </Link>
          ))}

          {user ? (
            <LogoutButton />
          ) : (
            <Link href="/login">
              <Button variant="secondary">Login</Button>
            </Link>
          )}
        </div>

        {/* MOBILE NAV */}
        <div className="md:hidden">
          <MobileNav isLoggedIn={!!user} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
