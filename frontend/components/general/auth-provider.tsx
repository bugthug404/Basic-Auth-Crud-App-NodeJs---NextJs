import { useGetAuth } from "@/utils/auth-hook";
import { loaderOpenState } from "@/utils/loader-open-state";
import { useSetAtom } from "jotai";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

export function AuthProvider(props: { children: React.ReactNode }) {
  const setLoaderOpen = useSetAtom(loaderOpenState);
  const auth = useGetAuth();
  const router = useRouter();
  const publicpath = [
    "/",
    "/signin",
    "/signup",
    "/forgot-password",
    "/reset-password",
  ];

  useEffect(() => {
    setLoaderOpen(true);
    console.log("auth controller", auth);
    let isPublicRoute = publicpath.includes(router.pathname);

    if (auth.user && isPublicRoute) {
      router.push("/home");
      return;
    } else if (!auth.user && !isPublicRoute) {
      router.push("/signin");
    }
    setLoaderOpen(false);
  }, [auth, router.pathname]);

  if (auth.user && !publicpath.includes(router.pathname)) {
    return <>{props.children}</>;
  } else if (!auth.user?.token && publicpath.includes(router.pathname)) {
    return <>{props.children}</>;
  } else {
    return <>{props.children}</>;
  }
}
