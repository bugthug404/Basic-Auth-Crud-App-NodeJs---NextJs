import axios from "axios";
import { loaderOpenState } from "./loader-open-state";
import { UserModel } from "./types/user-model";
import { useQuery } from "react-query";
import { useGetAuth } from "./auth-hook";
import { useSetAtom } from "jotai";

export function useUsers() {
  const auth = useGetAuth();
  const setLoader = useSetAtom(loaderOpenState);

  const { data, refetch } = useQuery(
    "userlist",
    () => {
      setLoader(true);
      return axios.get<{ users: UserModel[] }>(
        `${process.env.NEXT_PUBLIC_API}user/list`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
    },
    {
      enabled: !!auth?.token,
      onSuccess: () => {
        setLoader(false);
      },
      refetchOnWindowFocus: false,
    }
  );

  return { users: data?.data.users, refetch };
}
