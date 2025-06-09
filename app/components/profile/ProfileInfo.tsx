"use client";

import Image from "next/image";
import { stepOneInfo } from "@/app/lib";
import { useRef, useState } from "react";
import { useFormState } from "react-dom";
import { Input } from "@/components/ui/input";
import { StepProps } from "@/app/profile/page";
import { Button } from "@/components/ui/button";
import { schemaStep, submitProfile } from "@/app/actions";

export const ProfileInfo = ({ addStep }: StepProps) => {
  const [previewLink, setPreviewLink] = useState("");
  const [proInfo, setProInfo] = useState(stepOneInfo);
  const initialState = {
    errors: {},
    success: false,
    message: "",
    data: {},
  };

  const [state, formAction] = useFormState(submitProfile, initialState);

  const inputImageRef = useRef<HTMLInputElement | null>(null);

  const openBrowse = () => {
    inputImageRef.current?.click();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = Array.from(files)[0];
      const imageUrl = URL.createObjectURL(file);
      setPreviewLink(imageUrl);
      setProInfo((prev) => ({
        ...prev,
        photo: imageUrl,
      }));
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setProInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const result = schemaStep.safeParse(proInfo);
    if (!result.success) {
      const fieldErrors: Partial<Record<string, string>> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0]] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    addStep();
  };

  return (
    <form
      action={formAction}
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
        {errors.photo && <p className="text-red-500 text-sm">{errors.photo}</p>}

        <div
          className={`${errors.photo ? "border-red-500" : "border-gray-300"}  border border-dashed w-40 h-40 rounded-full flex justify-center items-center `}
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
            <Image width={28} height={28} alt="camera" src="/img/camera.png" />
          )}
        </div>
      </div>

      <div className="flex flex-col gap-y-3">
        <div className="flex flex-col gap-y-2">
          <p className="font-medium text-sm">Name</p>
          <Input
            name="name"
            value={proInfo.name}
            onChange={handleChange}
            placeholder="Enter your name here"
            className={`${errors.name ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>
        <div className="flex flex-col gap-y-2 justify-start">
          <p className="font-medium text-sm">About</p>
          <textarea
            name="about"
            value={proInfo.about}
            onChange={handleChange}
            placeholder="Write about yourself here"
            className={`${errors.about ? "border-red-500" : "border-gray-300"} h-[131px] border rounded-md`}
          />
          {errors.about && (
            <p className="text-red-500 text-sm">{errors.about}</p>
          )}
        </div>

        <div className="flex flex-col gap-y-2">
          <p className="font-medium text-sm">Social media URL</p>
          <Input
            placeholder="https://"
            type="url"
            name="social"
            onChange={handleChange}
            value={proInfo.social}
            className={`${errors.social ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.social && (
            <p className="text-red-500 text-sm">{errors.social}</p>
          )}
        </div>
      </div>

      <Button className="bg-gray-400" onClick={handleSubmit}>
        Continue
      </Button>
    </form>
  );
};
