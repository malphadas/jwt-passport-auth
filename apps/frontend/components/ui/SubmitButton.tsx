"use client";
import React, { PropsWithChildren } from "react";
import { Button } from "./Button";
import { useFormStatus } from "react-dom";

const SubmitButton = ({ children }: PropsWithChildren) => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      aria-disabled={pending}
      className="w-full mt-2 bg-black text-white cursor-pointer"
    >
      {pending ? "Submitting..." : children}
    </Button>
  );
};

export default SubmitButton;
