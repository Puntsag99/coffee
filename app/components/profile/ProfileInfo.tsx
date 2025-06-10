"use client";

import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { useRef, useState } from "react";
import { saveProfile } from "@/app/actions";
import { Input } from "@/components/ui/input";
import { StepProps } from "@/app/profile/page";
import { Button } from "@/components/ui/button";

export const ProfileInfo = ({ addStep }: StepProps) => {
  const [previewLink, setPreviewLink] = useState("");
  const inputImageRef = useRef<HTMLInputElement | null>(null);
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const { user } = useUser();
  const userId = user?.id;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!userId) return;

    const form = event.currentTarget;
    const formData = new FormData(form);

    const result = await saveProfile(formData, userId);

    if (!result.success && result.errors) {
      setErrors(result.errors);
    } else {
      setErrors({});
      addStep();
    }
  };

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

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = event.target;
    const name = target.name;

    if (!name) return;

    if (
      name === "photo" &&
      target instanceof HTMLInputElement &&
      target.files &&
      target.files.length > 0
    ) {
      const file = target.files[0];
      setPreviewLink(URL.createObjectURL(file));
    }

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      className="flex flex-col gap-y-6 w-[510px]"
    >
      <p className="text-2xl font-semibold">Complete your profile page</p>
      <div className="flex flex-col gap-y-3">
        <p className="font-medium text-sm">Add photo</p>
        <input
          name="photo"
          ref={inputImageRef}
          type="file"
          hidden
          onChange={handleInputChange}
        />

        <div
          className={`${errors.photo ? "border-red-500" : "border-gray-300"} border border-dashed w-40 h-40 rounded-full flex justify-center items-center`}
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
            <Image width={28} height={28} alt="camera" src="/img/Vector.png" />
          )}
        </div>
        {errors.photo && <p className="text-red-500 text-sm">{errors.photo}</p>}
      </div>

      <div className="flex flex-col gap-y-3">
        <div className="flex flex-col gap-y-2">
          <p className="font-medium text-sm">Name</p>
          <Input
            onChange={handleChange}
            placeholder="Enter your name here"
            name="name"
            className={errors.name ? "border-red-500" : "border-gray-300"}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>
        <div className="flex flex-col gap-y-2 justify-start">
          <p className="font-medium text-sm">About</p>
          <textarea
            onChange={handleChange}
            placeholder="Write about yourself here"
            className={`h-[131px] border rounded-md ${
              errors.about ? "border-red-500" : "border-gray-300"
            }`}
            name="about"
          />
          {errors.about && (
            <p className="text-red-500 text-sm">{errors.about}</p>
          )}
        </div>
        <div className="flex flex-col gap-y-2">
          <p className="font-medium text-sm">Social media URL</p>
          <Input
            onChange={handleChange}
            placeholder="https://"
            name="social"
            className={
              errors.socialMediaURL ? "border-red-500" : "border-gray-300"
            }
          />
          {errors.socialMediaURL && (
            <p className="text-red-500 text-sm">{errors.socialMediaURL}</p>
          )}
        </div>
      </div>

      <Button className="bg-gray-400" type="submit">
        Continue
      </Button>
    </form>
  );
};
