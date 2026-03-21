import {
  SignInButton,
  SignOutButton,
  UserButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import Link from "next/link";

export const Navigation = () => {
  return (
    <nav className="bg-background border-b border-(--foreground)/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="shrink-0">
            <h1 className="text-xl font-semibold text-foreground">
              Next.js App
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <SignedOut>
              <SignInButton mode="modal" />
            </SignedOut>
            {/* <UserButton /> */}
            <SignedIn>
              <Link href="/user-profile">Profile</Link>
              <SignOutButton />
            </SignedIn>
          </div>
        </div>
      </div>
    </nav>
  );
};
