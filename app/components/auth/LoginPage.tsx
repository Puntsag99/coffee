"use client";

import Image from "next/image";

export const LoginPage = () => {
  return (
    <div className="w-1/2 bg-amber-400 flex flex-col">
      <div className="flex flex-grow flex-col gap-y-10 items-center justify-center">
        <Image width={240} height={240} alt="img" src="/img/illustration.svg" />
        <div className="flex flex-col gap-y-3  items-center">
          <h3 className="text-2xl  text-black">Fund your creative work</h3>
          <p className="text-base ">
            Accept support. Start a membership. Setup a shop. It’s easier than
            you think.
          </p>
        </div>
      </div>
    </div>
  );
};
