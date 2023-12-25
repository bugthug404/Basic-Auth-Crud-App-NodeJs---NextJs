import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { UserModel } from "@/utils/types/user-model";
import { useUser } from "@/utils/user-hook";
import LabeledInput from "../general/labeled-input";
import Button from "../general/button";

const schema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  mobile: z.string().min(10),
  profession: z.string(),
  address: z.string(),
  role: z.string(),
  password: z.string(),
});

export default function AddUser(props: {
  show?: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const userControl = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: any) => {
    console.log(data);
    props.show && userControl.addUser(data);
  };

  return (
    <>
      {props.show && (
        <div className="fixed top-0 left-0 bg-black/50 font-bold flex flex-col space-y-4 h-screen w-full p-10 overflow-auto">
          <div className="max-w-sm w-full bg-white flex flex-col p-4 rounded-xl m-auto">
            <div className="flex flex-col space-y-2   w-full ">
              {/* convert above input to Input */}
              <div className="text-center text-3xl font-semibold mb-5">
                Create New User
              </div>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <LabeledInput
                  label="First Name"
                  register={{
                    ...register("firstName"),
                  }}
                  error={errors.firstName?.message}
                />
                <LabeledInput
                  label="Last Name"
                  register={{
                    ...register("lastName"),
                  }}
                  error={errors.lastName?.message}
                />
                <LabeledInput
                  label="Email"
                  register={{
                    ...register("email"),
                  }}
                  error={errors.email?.message}
                />
                <LabeledInput
                  label="Mobile"
                  register={{
                    ...register("mobile"),
                  }}
                  error={errors.mobile?.message}
                />
                <LabeledInput
                  label="Profession"
                  register={{
                    ...register("profession"),
                  }}
                  error={errors.profession?.message}
                />
                <LabeledInput
                  label="Address"
                  register={{
                    ...register("address"),
                  }}
                  error={errors.address?.message}
                />
                <LabeledInput
                  label="Role"
                  register={{
                    ...register("role"),
                  }}
                  error={errors.role?.message}
                />
                <LabeledInput
                  label="Password"
                  register={{
                    ...register("password"),
                  }}
                  error={errors.password?.message}
                />
                <div className="mt-4 flex justify-evenly">
                  <Button type="submit">Submit</Button>
                  <Button onClick={() => props.setShow(false)}>Close</Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
