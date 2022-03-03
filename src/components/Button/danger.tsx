import React from "react";

interface ButtonProps {
  onClick?(): void;
  children?: React.ReactNode;
  className?: string;
}

export default function ButtonDanger(props: ButtonProps) {
  return (
    <button
      type="button"
      className={`font-mono inline-flex justify-center px-4 py-2 text-sm font-medium text-indigo-100 bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500 ${props.className}`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
