"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Profile = () => {
  const inputImageRef = useRef<HTMLInputElement | null>(null);
  const [previewLink, setPreviewLink] = useState("");

  const openBrowse = () => {
    inputImageRef.current?.click();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = Array.from(files)[0];
      setPreviewLink(URL.createObjectURL(file));
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col">
      <div className="flex flex-col gap-y-6">
        <p className="text-2xl font-semibold">Complete your profile page</p>
        <div className="flex flex-col gap-y-3">
          <p className="font-medium text-sm">Add photo</p>
          <input
            ref={inputImageRef}
            type="file"
            hidden
            onChange={handleInputChange}
          />
          <div
            className="border border-dashed w-40 h-40 rounded-full flex justify-center items-center "
            onClick={openBrowse}
          >
            {previewLink ? (
              <div className="relative w-40 h-40 rounded-full overflow-hidden">
                <Image
                  src={previewLink}
                  alt="profile"
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <Image
                width={28}
                height={28}
                alt="camera"
                src="/img/camera.png"
              />
            )}
          </div>
        </div>
        <div className="flex flex-col gap-y-3">
          <div className="flex flex-col gap-y-2">
            <p className="font-medium text-sm">Name</p>
            <Input placeholder="Enter your name here" />
          </div>
          <div className="flex flex-col gap-y-2">
            <p className="font-medium text-sm">About</p>
            <Input placeholder="Write about yourself here" />
          </div>
          <div className="flex flex-col gap-y-2">
            <p className="font-medium text-sm">Social media URL</p>
            <Input placeholder="https://" />
          </div>
        </div>
        <Button className="bg-gray-400">Continue</Button>
      </div>
    </div>
  );
};

export default Profile;
