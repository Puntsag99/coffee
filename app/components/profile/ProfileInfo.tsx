"use client";

import Image from "next/image";
import { stepOneInfo } from "@/app/lib";
import { useRef, useState } from "react";
<<<<<<< HEAD
import { saveProfile } from "@/app/actions";
=======
import { useFormState } from "react-dom";
>>>>>>> 7d9b0606d3b7cd52c9d8ddbd09a15860188eb78d
import { Input } from "@/components/ui/input";
import { StepProps } from "@/app/profile/page";
import { Button } from "@/components/ui/button";
import { schemaStep, submitProfile } from "@/app/actions";

export const ProfileInfo = ({ addStep }: StepProps) => {
  const [previewLink, setPreviewLink] = useState("");
<<<<<<< HEAD
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const result = await saveProfile(formData);

    if (!result.success && result.errors) {
      setErrors(result.errors);
    } else {
      setErrors({});
      addStep();
    }
  };
=======
  const [proInfo, setProInfo] = useState(stepOneInfo);
  const initialState = {
    errors: {},
    success: false,
    message: "",
    data: {},
  };

  const [state, formAction] = useFormState(submitProfile, initialState);

  const inputImageRef = useRef<HTMLInputElement | null>(null);
>>>>>>> 7d9b0606d3b7cd52c9d8ddbd09a15860188eb78d

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

<<<<<<< HEAD
  const handleChange = (field: string) => {
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
=======
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
>>>>>>> 7d9b0606d3b7cd52c9d8ddbd09a15860188eb78d
  };

  return (
    <form
<<<<<<< HEAD
      onSubmit={handleSubmit}
=======
      action={formAction}
>>>>>>> 7d9b0606d3b7cd52c9d8ddbd09a15860188eb78d
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
<<<<<<< HEAD

        <div
          className={` ${errors.photo ? "border-red-500" : "border-gray-300"}  border border-dashed w-40 h-40 rounded-full flex justify-center items-center`}
=======
        {errors.photo && <p className="text-red-500 text-sm">{errors.photo}</p>}

        <div
          className={`${errors.photo ? "border-red-500" : "border-gray-300"}  border border-dashed w-40 h-40 rounded-full flex justify-center items-center `}
>>>>>>> 7d9b0606d3b7cd52c9d8ddbd09a15860188eb78d
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
        {errors.photo && <p className="text-red-500 text-sm">{errors.photo}</p>}
      </div>

      <div className="flex flex-col gap-y-3">
        <div className="flex flex-col gap-y-2">
          <p className="font-medium text-sm">Name</p>
          <Input
<<<<<<< HEAD
            onChange={() => handleChange("name")}
            placeholder="Enter your name here"
            name="name"
=======
            name="name"
            value={proInfo.name}
            onChange={handleChange}
            placeholder="Enter your name here"
>>>>>>> 7d9b0606d3b7cd52c9d8ddbd09a15860188eb78d
            className={`${errors.name ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>
        <div className="flex flex-col gap-y-2 justify-start">
          <p className="font-medium text-sm">About</p>
          <textarea
<<<<<<< HEAD
            onChange={() => handleChange("about")}
            placeholder="Write about yourself here"
            className={`h-[131px] border rounded-md ${errors.about ? "border-red-500" : "border-gray-300"} `}
            name="about"
=======
            name="about"
            value={proInfo.about}
            onChange={handleChange}
            placeholder="Write about yourself here"
            className={`${errors.about ? "border-red-500" : "border-gray-300"} h-[131px] border rounded-md`}
>>>>>>> 7d9b0606d3b7cd52c9d8ddbd09a15860188eb78d
          />
          {errors.about && (
            <p className="text-red-500 text-sm">{errors.about}</p>
          )}
        </div>

        <div className="flex flex-col gap-y-2">
          <p className="font-medium text-sm">Social media URL</p>
          <Input
<<<<<<< HEAD
            onChange={() => handleChange("social")}
            placeholder="https://"
            name="social"
=======
            placeholder="https://"
            type="url"
            name="social"
            onChange={handleChange}
            value={proInfo.social}
>>>>>>> 7d9b0606d3b7cd52c9d8ddbd09a15860188eb78d
            className={`${errors.social ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.social && (
            <p className="text-red-500 text-sm">{errors.social}</p>
          )}
        </div>
      </div>

<<<<<<< HEAD
      <Button className="bg-gray-400" type="submit">
=======
      <Button className="bg-gray-400" onClick={handleSubmit}>
>>>>>>> 7d9b0606d3b7cd52c9d8ddbd09a15860188eb78d
        Continue
      </Button>
    </form>
  );
};
