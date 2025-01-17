import Link from "next/link";

import { Button } from "@/components/ui/button";
import Logo from "@/components/ui/Logo";

const NotFound = () => {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center space-y-6 pb-32 text-center">
      <div className="flex w-full max-w-7xl flex-col items-center justify-center px-5 py-3">
        <Link
          href="/"
          className="text-5xl font-bold text-primary sm:text-5xl md:text-5xl lg:text-6xl"
        >
          <Logo />
        </Link>
      </div>
      <h1 className="text-4xl font-extrabold sm:text-5xl lg:text-6xl">
        404. That&apos;s an error.
      </h1>
      <h2 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
        Page Not Found
      </h2>
      <p className="px-2 text-base text-gray-500 sm:text-lg lg:text-xl">
        Sorry, the page you are looking for doesn&apos;t exist,
        <br /> or is currently under construction.
      </p>
      <Link href="/">
        <Button className="px-6 py-6">Go Back Home</Button>
      </Link>
    </main>
  );
};

export default NotFound;
