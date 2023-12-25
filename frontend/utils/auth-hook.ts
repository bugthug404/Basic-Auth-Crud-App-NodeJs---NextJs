import axios from "axios";
import { useRouter } from "next/router";
import { loaderOpenState } from "./loader-open-state";
import { useEffect, useState } from "react";
import { useSetAtom } from "jotai";
import { useToaster } from "@/components/general/toaster";
import { toast } from "react-toastify";

export function useGetAuth() {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const router = useRouter();
  const setLoader = useSetAtom(loaderOpenState);
  const [refreshCount, setRefreshCount] = useState<number>(0);

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo") as any;
    if (userInfo) {
      const u = JSON.parse(userInfo);
      setUser(u.user);
      setToken(u.token);
      setIsLoggedIn(true);
    } else {
      setUser(null);
      setIsLoggedIn(false);
    }
  }, [refreshCount]);

  function login(data: any, setApiData?: (data: any) => void) {
    setLoader(true);
    axios
      .post(`${process.env.NEXT_PUBLIC_API}login`, data, {
        headers: {
          mode: "cors",
          "Content-Type": "application/json",
          acccept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then(function (response) {
        console.log("login response token", response.data);
        if (response.data?.token) {
          localStorage.setItem("userInfo", JSON.stringify(response.data));
          router.push("/");
        }
        setLoader(false);
        toast.success("Login Successfull");
        // window.location.reload();
      })
      .catch(function (error: any) {
        toast.error("Login Failed");
        console.log("login error", error);
        setLoader(false);
      });
  }

  function signup(data: any) {
    setLoader(true);
    axios
      .post(`${process.env.NEXT_PUBLIC_API}signup`, data, {
        headers: {
          mode: "cors",
          "Content-Type": "application/json",
          acccept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((response) => {
        setLoader(false);
        if (response.status === 201 && response.data?.token) {
          router.push("/signin");
        }
      })
      .catch((error) => {
        setLoader(false);
      });
  }

  function testApiCall() {
    setLoader(true);
    axios
      .get(`${process.env.NEXT_PUBLIC_API}`, {
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {
        console.log("test then res", res);

        res.data.data && alert(`Api Response : ${res.data.data}`);
        setLoader(false);
      })
      .catch((err) => {
        console.log("test catch error : ", err);

        err.message && alert(`Api Response : ${err.message ?? "no data"}`);
        setLoader(false);
      });
  }

  function logout() {
    setLoader(true);
    localStorage.removeItem("userInfo");
    router.push("/signin");
    setLoader(false);
    window.location.reload();
    setRefreshCount((prev) => prev + 1);
  }

  return { login, signup, testApiCall, logout, isLoggedIn, user, token };
}
