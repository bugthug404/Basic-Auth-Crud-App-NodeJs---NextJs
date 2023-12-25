import { Inter } from "@next/font/google";
import React, { useState } from "react";
import { useGetAuth } from "../utils/auth-hook";
import Input from "@/components/general/input";
import Link from "next/link";

export default function SignUp() {
  const firstNameRef = React.useRef<HTMLInputElement>(null);
  const lastNameRef = React.useRef<HTMLInputElement>(null);
  const emailRef = React.useRef<HTMLInputElement>(null);
  const mobileRef = React.useRef<HTMLInputElement>(null);
  const professionRef = React.useRef<HTMLInputElement>(null);
  const addressRef = React.useRef<HTMLInputElement>(null);
  const roleRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);

  const auth = useGetAuth();
  return (
    <>
      <div className="bg-gray- 800 font-bold flex flex-col space-y-4 justify-center items-center h-screen w-full">
        <div className="flex flex-col space-y-2 max-w-sm w-full">
          {/* convert above input to Input */}
          <div className="text-center text-3xl font-semibold mb-10">
            SignUp Form
          </div>
          <Input placeholder="First name" value="Jelly" Ref={firstNameRef} />
          <Input placeholder="Last name" value="Bean" Ref={lastNameRef} />
          <Input placeholder="Email" value="bob@mail.com" Ref={emailRef} />
          <Input placeholder="Mobile" value="9876543210" Ref={mobileRef} />
          <Input placeholder="Profession" value="student" Ref={professionRef} />
          <Input placeholder="Address" value="some address" Ref={addressRef} />
          <Input placeholder="user, admin" value="user" Ref={roleRef} />
          <Input placeholder="Password" value="password" Ref={passwordRef} />
        </div>

        <div className="flex gap-x-4 pt-2">
          <button
            className="bg-blue-100 px-6 py-2 rounded-xl active:bg-red-200"
            onClick={() => {
              const data = {
                firstName: firstNameRef.current?.value,
                lastName: lastNameRef.current?.value,
                email: emailRef.current?.value,
                mobile: mobileRef.current?.value,
                profession: professionRef.current?.value,
                address: addressRef.current?.value,
                role: roleRef.current?.value,
                password: passwordRef.current?.value,
              };
              auth.signup(data);
            }}
          >
            Submit
          </button>
          <button
            className="bg-red-100 px-6 py-2 rounded-xl active:bg-red-200 "
            onClick={() => {
              auth.testApiCall();
            }}
          >
            Api call
          </button>
        </div>
        <p className="text-sm">
          <Link href="/signin"> go to Sign in</Link>
        </p>
      </div>
    </>
  );
}
