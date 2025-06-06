"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { ProfileInfo, Payment } from "../components";

export type StepProps = {
  addStep: () => void;
  previousStep: () => void;
};

const Profile = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const addStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const previousStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const Step = [ProfileInfo, Payment][currentStep];

  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
        >
          <Step addStep={addStep} previousStep={previousStep} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Profile;
