import React from "react";

export default function Button({
  className,
  onClick,
  children,
  type = "button",
}: {
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  type?: "button" | "submit" | "reset";
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`font-semibold px-10 py-2 rounded-xl cursor-pointer select-none bg-zinc-200 active:bg-red-200 ${className}`}
    >
      {children}
    </button>
  );
}
