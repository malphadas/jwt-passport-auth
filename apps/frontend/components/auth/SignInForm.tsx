"use client";
import React, { useActionState } from "react";
import { Label } from "../ui/Label";
import { Input } from "../ui/Input";
import Link from "next/link";
import SubmitButton from "../ui/SubmitButton";
import { signIn } from "@/lib/auth";

const SignInForm = () => {
  const [state, action] = useActionState(signIn, undefined);
  return (
    <form action={action}>
      <div className="flex flex-col gap-2 w-64">
        {state?.message && (
          <p className="text-sm text-red-500">{state.message}</p>
        )}
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            placeholder="m@example.com"
            type="email"
          />
        </div>
        {state?.error?.email && (
          <p className="text-sm text-red-500">{state.error.email}</p>
        )}
        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" name="password" />
        </div>
        {state?.error?.password && (
          <p className="text-sm text-red-500">{state.error.password}</p>
        )}
        <Link className="text-sm underline" href="#">
          Forgot your password?
        </Link>
        <SubmitButton>Sign In</SubmitButton>
        <div className="flex justify-between text-sm">
          <Link className="text-sm underline" href="/auth/signup">
            Don't have an account?
          </Link>
        </div>
      </div>
    </form>
  );
};

export default SignInForm;
