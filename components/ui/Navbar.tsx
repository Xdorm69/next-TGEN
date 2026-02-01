import Link from "next/link";
import { Button } from "./button";
import { capText } from "@/utils/textUtils";
import { getAuthUser } from "@/utils/authUtil";
import MobileNav from "./MobileNav";
import { Badge } from "./badge";
import { User } from "lucide-react";
import MaxWidthWrapper from "../Wrappers/MaxWidthWrapper";
import Image from "next/image";

const Navbar = async () => {
  const navbarItems = ["test", "practice", "leaderboard"];
  const user = await getAuthUser();

  return (
    <nav className="mx-auto w-full fixed top-0 z-50 backdrop-blur-lg bg-white/5">
      <MaxWidthWrapper className="py-3">
        <div className="flex items-center justify-between">
          {/* LEFT */}
          <Link href="/" className="flex gap-1">
            <Image src="/logo.png" alt="Logo" width={30} height={20} />
            <h1 className="font-mono font-bold text-xl">TGEN</h1>
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex gap-2 font-sans">
            {navbarItems.map((item) => (
              <Link href={`/${item}`} key={item}>
                <Button variant="ghost">{capText(item)}</Button>
              </Link>
            ))}
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-2">
            {user ? (
              <Link href="/profile">
                <Badge className="rounded-full size-8 bg-muted-foreground">
                  <User className="size-4" />
                </Badge>
              </Link>
            ) : (
              <Link href="/login">
                <Button variant="secondary">Sign In</Button>
              </Link>
            )}
          </div>

          {/* MOBILE NAV */}
          <div className="md:hidden">
            <MobileNav isLoggedIn={!!user} />
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
