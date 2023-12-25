import { useUsers } from "@/utils/user-list-hook";
import React, { useEffect } from "react";
import { useGetAuth } from "@/utils/auth-hook";
import UserCard from "@/components/user/user-card";
import Button from "@/components/general/button";
import EditUser from "../components/user/edit-user-modal";
import AddUser from "@/components/user/add-user-modal";

export default function HomePage() {
  const auth = useGetAuth();
  const user = useUsers();
  const [show, setShow] = React.useState<boolean>(false);
  const [editId, setEditId] = React.useState<number | undefined>();

  if (auth?.user?.role) {
    return (
      <main className="flex flex-col w-full space-y-4 overflow-auto bg-background text-onBackground p-4">
        <AddUser show={show} setShow={setShow} />
        <EditUser editId={editId} setEditId={setEditId} userList={user.users} />
        <div className="flex justify-center gap-4">
          <div className="max-w-sm w-full space-y-4 flex flex-col items-center">
            <div>
              Logged In User:{" "}
              <span className="font-bold">
                {auth?.user?.firstName} {auth?.user?.lastName}
              </span>
            </div>
            <p>{auth?.user?.email}</p>
            <p>Role: {auth?.user?.role}</p>
            <div className="flex gap-4">
              <Button
                onClick={() => {
                  setShow(true);
                }}
              >
                add user
              </Button>
              <Button
                onClick={() => {
                  auth.logout();
                }}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center pt-20 space-y-5 text-center ">
          {user.users?.map((user, index) => {
            return <UserCard user={user} key={index} setEditId={setEditId} />;
          })}
        </div>
      </main>
    );
  } else {
    return (
      <div
        onClick={() => {
          window.location.reload();
        }}
      >
        refresh
      </div>
    );
  }
}
