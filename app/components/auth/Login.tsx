"use client";

import { SignIn } from "@clerk/nextjs";

export const Login = () => {
  return (
    <div className="flex w-1/2 flex-col font-normal justify-center">
      <div className="flex flex-col items-center gap-y-6 ">
        <p className="text-2xl">Welcome back</p>
        <SignIn routing="hash" forceRedirectUrl="/profile" />
      </div>
    </div>
  );
};
