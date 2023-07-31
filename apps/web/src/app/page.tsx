import { Suspense } from "react";
import { auth } from "@gob-dojo/auth";

import { SignIn, SignOut } from "~/components/auth";
import Kingdom from "~/components/kingdom";

export default function HomePage() {
  return (
    <main className="flex h-screen flex-col items-center text-white">
      <div className="container mt-12 flex flex-col items-center justify-center gap-4 px-4 py-8">
        <AuthShowcase />
        <Kingdom />
      </div>
    </main>
  );
}

async function AuthShowcase() {
  const session = await auth();

  if (!session) {
    return (
      <SignIn
        provider="email"
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
      >
        Sign in with email
      </SignIn>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {session && <span>Logged in as {session.user.name}</span>}
      </p>

      <SignOut className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20">
        Sign out
      </SignOut>
    </div>
  );
}
