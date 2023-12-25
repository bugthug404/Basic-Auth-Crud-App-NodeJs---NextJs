import { loaderOpenState } from "@/utils/loader-open-state";
import { useAtomValue } from "jotai";
import React from "react";

export function LoadingScreen() {
  const open = useAtomValue(loaderOpenState);

  return (
    <>
      {open && (
        <div
          className={` fixed inset-0 flex items-center justify-center h-screen w-full bg-white/95`}
        >
          <div className="dots-bars-6"></div>
        </div>
      )}
    </>
  );
}

export function Loader() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="dots-bars-6"></div>
    </div>
  );
}
