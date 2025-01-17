import Link from "next/link";

import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <main className="flex min-h-screen w-full flex-col items-center space-y-6 pt-10 text-center">
      <h1 className="text-4xl font-extrabold sm:text-5xl lg:text-6xl">
        404. That's an error.
      </h1>
      <h2 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
        Page Not Found
      </h2>
      <p className="px-2 text-base text-gray-500 sm:text-lg lg:text-xl">
        Sorry, this user doesn&apos;t exist,
        <br /> or may have blocked you.
      </p>
      <Link href="/">
        <Button className="px-6 py-6">Go Back Home</Button>
      </Link>
    </main>
  );
};

export default NotFound;
