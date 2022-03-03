import React from "react";
import ButtonDanger from "./danger";
import ButtonPrimary from "./primary";
import ButtonSecondary from "./secondary";

interface ButtonProps {
  type?: "primary" | "secondary" | "danger";
  onClick?(): void;
  children?: React.ReactNode;
  className?: string;
}

export default function Button(props: ButtonProps) {
  switch (props.type) {
    case "secondary":
      return <ButtonSecondary {...props} />;

    case "danger":
      return <ButtonDanger {...props} />;

    default:
      return <ButtonPrimary {...props} />;
  }
}
