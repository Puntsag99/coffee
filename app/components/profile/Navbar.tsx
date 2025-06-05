"use client";

import Image from "next/image";
import { SignOutButton, useAuth } from "@clerk/nextjs";

export const Navbar = () => {
  const { isSignedIn } = useAuth();

  return (
    <div className="flex py-4 px-20 justify-between absolute w-full">
      <div className="flex gap-x-2 items-center justify-center">
        <Image width={24} height={24} alt="fags" src="/img/coffee.svg" />
        <p className="font-normal text-base ">Buy Me Coffee</p>
      </div>
      {isSignedIn && (
        <div className="w-[100px] h-10 bg-[#f4f4f5] rounded-md flex justify-center items-center cursor-pointer hover:bg-[#e4e4e7] transition">
          <SignOutButton redirectUrl="/">
            <span className="text-sm text-black">Logout</span>
          </SignOutButton>
        </div>
      )}
    </div>
  );
};
