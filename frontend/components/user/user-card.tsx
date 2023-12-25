import { UserModel } from "@/utils/types/user-model";
import React from "react";
import Button from "../general/button";
import { useUser } from "@/utils/user-hook";
import { useGetAuth } from "@/utils/auth-hook";

export default function UserCard({
  user,
  setEditId,
}: {
  user: UserModel;
  setEditId: React.Dispatch<React.SetStateAction<number | undefined>>;
}) {
  const userControl = useUser();
  const auth = useGetAuth();

  return (
    <div className="w-full max-w-sm py-2 pl-3 pr-2 space-y-2 border border-black rounded-xl">
      {/* <Loader /> */}
      <div className="text-xl font-bold text-left">
        {user?.firstName} {user.lastName}
      </div>
      <div className="text-left">{user?.email}</div>
      <div className="text-left">{user?.address}</div>
      <div className="text-left">{user?.mobile}</div>
      <div className={`flex gap-4 ${auth?.user?.role !== "admin" && "hidden"}`}>
        <Button
          onClick={() => {
            setEditId(user.id);
          }}
        >
          Edit
        </Button>
        <Button
          onClick={() => {
            if (window.confirm("Are you sure you want to delete this user?"))
              userControl.deleteUser(user.id.toString());
          }}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
