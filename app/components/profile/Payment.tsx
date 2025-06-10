import { Input } from "@/components/ui/input";
import { StepProps } from "@/app/profile/page";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { allCountries, month, years } from "@/app/lib";

export const Payment = ({ previousStep }: StepProps) => {
  return (
    <div className="w-[510px] flex flex-col gap-y-12">
      <div className="flex flex-col gap-y-[6px]">
        <h3 className="text-2xl font-normal">How would you like to be paid?</h3>
        <p className="font-normal text-sm text-[#71717A]">
          Enter location and payment details
        </p>
      </div>

      <div className="flex flex-col gap-y-2 ">
        <p className="text-sm font-medium">Select country</p>
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a country" />
          </SelectTrigger>
          <SelectContent>
            {allCountries.map((county) => (
              <SelectItem key={county} value={county}>
                {county}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-x-3  ">
        <div className="flex flex-col gap-y-2 w-1/2">
          <p className="text-sm font-medium">First name </p>
          <Input placeholder="Enter your name here" />
        </div>

        <div className="flex flex-col gap-y-2 w-1/2">
          <p className="text-sm font-medium">Last Name </p>
          <Input placeholder="Enter your name here" />
        </div>
      </div>

      <div className="flex flex-col gap-y-2">
        <p className="text-sm font-medium">Enter card number</p>
        <Input placeholder="XXXX-XXXX-XXXX-XXXX" />
      </div>

      <div className="flex gap-x-4 ">
        <div className="flex flex-col gap-y-2 w-[170px]">
          <p className="text-sm font-medium">Expires</p>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              {month.map((moon) => (
                <SelectItem key={moon} value={moon}>
                  {moon}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-y-2 w-[170px]">
          <p className="text-sm font-medium">Year</p>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-y-2">
          <p className="text-sm font-medium">CVC</p>
          <Input type="select" placeholder="CVC" />
        </div>
      </div>

      <div className="flex gap-x-3">
        <Button className="bg-gray-400 w-1/2" onClick={previousStep}>
          Back
        </Button>
        <Button className="bg-gray-400 w-1/2">Continue</Button>
      </div>
    </div>
  );
};
