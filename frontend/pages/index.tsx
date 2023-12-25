// import { ButtonBase } from "@scaptorcom/relic-ui-react";
import React, { useEffect } from "react";
import { useGetAuth } from "../utils/auth-hook";
import { useRouter } from "next/router";

export default function Index() {
  const auth = useGetAuth();
  const router = useRouter();

  useEffect(() => {
    if (!auth.isLoggedIn) {
      router.push("/signin");
    }
  }, [auth]);

  return <div>loading...</div>;
}
