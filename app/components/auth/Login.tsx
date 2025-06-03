import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  SignedOut,
  SignInButton,
  SignUpButton,
  SignedIn,
  UserButton,
  ClerkProvider,
} from "@clerk/nextjs";
export const Login = () => {
  return (
    <div className="flex w-1/2 flex-col font-normal ">
      <div className="py-[32px] ">
        <ClerkProvider>
          <header className="flex justify-center w-[83px] h-10 bg-[#f4f4f5] rounded-md">
            <SignedOut>
              <SignUpButton />
            </SignedOut>
          </header>
        </ClerkProvider>
      </div>
      <div className="flex flex-col justify-center items-center gap-y-6 ">
        <h1 className="text-2xl">Welcome back</h1>
        <div className="flex flex-col gap-y-3">
          <div className="flex flex-col gap-y-2">
            <p className="text-sm ">Email</p>
            <Input placeholder="Enter your email" />
          </div>
          <div className="flex flex-col gap-y-2">
            <p className="text-sm ">Password</p>
            <Input placeholder="Enter your password" />
          </div>
        </div>
        <Button />
      </div>
    </div>
  );
};
