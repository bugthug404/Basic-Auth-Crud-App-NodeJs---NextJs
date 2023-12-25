import React from "react";
import Input from "@/components/general/input";
import { useUser } from "@/utils/user-hook";
import { UserModel } from "@/utils/types/user-model";

export default function EditUser(props: {
  editId?: number;
  setEditId: React.Dispatch<React.SetStateAction<number | undefined>>;
  userList?: UserModel[];
}) {
  const userControl = useUser();
  const firstNameRef = React.useRef<HTMLInputElement>(null);
  const lastNameRef = React.useRef<HTMLInputElement>(null);
  const emailRef = React.useRef<HTMLInputElement>(null);
  const mobileRef = React.useRef<HTMLInputElement>(null);
  const professionRef = React.useRef<HTMLInputElement>(null);
  const addressRef = React.useRef<HTMLInputElement>(null);
  const roleRef = React.useRef<HTMLInputElement>(null);

  const user = props.userList?.find((user) => user.id === props.editId);
  return (
    <>
      {props.editId && (
        <div className="fixed top-0 left-0 bg-black/50 font-bold flex flex-col space-y-4 justify-center items-center h-screen w-full">
          <div className="max-w-sm w-full bg-white flex flex-col p-4 rounded-xl">
            <div className="flex flex-col space-y-2  w-full ">
              {/* convert above input to Input */}
              <div className="text-center text-3xl font-semibold mb-10">
                Edit User
              </div>
              <Input
                placeholder="First name"
                value={user?.firstName ?? ""}
                Ref={firstNameRef}
              />
              <Input
                placeholder="Last name"
                value={user?.lastName ?? ""}
                Ref={lastNameRef}
              />
              <Input
                placeholder="Email"
                value={user?.email ?? ""}
                Ref={emailRef}
              />
              <Input
                placeholder="Mobile"
                value={user?.mobile ?? ""}
                Ref={mobileRef}
              />
              <Input
                placeholder="Profession"
                value={user?.profession ?? ""}
                Ref={professionRef}
              />
              <Input
                placeholder="Address"
                value={user?.address ?? ""}
                Ref={addressRef}
              />
              <Input
                placeholder="user, admin"
                value={user?.role ?? ""}
                Ref={roleRef}
              />
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
                  };
                  props.editId &&
                    userControl.editUser(props.editId.toString(), data);
                }}
              >
                Submit
              </button>
              <button
                className="bg-red-100 px-6 py-2 rounded-xl active:bg-red-200 "
                onClick={() => {
                  props.setEditId(undefined);
                }}
              >
                close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
