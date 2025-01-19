"use client";

import Link from "next/link";

import SearchField from "@/components/SearchField";
import UserButton from "@/components/MenuButton";
import Logo from "../../components/ui/Logo";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-10 bg-card shadow-sm">
      <div className="mx-auto flex max-w-7xl flex-nowrap items-center justify-between px-5 py-3">
        <div className="flex items-center gap-5 pr-5">
          <Link href="/" className="text-2xl font-bold text-primary">
            <Logo />
          </Link>

          <SearchField />
        </div>

        {/* Temporary Start ---> */}
        {/* <div className="mr-4 hidden text-center md:inline-block lg:inline-block">
            <div className="flex flex-col text-foreground">
              <Link href={`/users/${user.username}`} className="font-bold">
                @{user.username}
              </Link>
              <span
                className="text-sm"
                style={{
                  fontFamily: "'Courier New', 'Lucida Console', monospace",
                }}
              >
                <div className="flex items-center justify-center">
                  <span className="mr-1">☉</span>
                  <span className="mr-3">♍</span>
                  <span className="mr-1">☾</span>
                  <span className="mr-3">♈</span>
                  <span className="mr-1">↟</span>
                  <span>♌</span>
                </div>
              </span>
            </div>
          </div> */}
        {/* <--- Temporary End */}
        <UserButton />
      </div>
    </header>
  );
};

export default Navbar;
