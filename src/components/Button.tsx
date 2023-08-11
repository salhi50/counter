import React, { ButtonHTMLAttributes, Children } from "react";

type ButtonContrast = "low" | "high";
type ButtonSize = "sm" | "lg" | "";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  contrast?: ButtonContrast;
  size?: ButtonSize;
  className?: string;
}

const Button = React.forwardRef<HTMLButtonElement, Props>(
  ({ children = "", contrast = "low", className = "", size = "", ...otherAttributes }, ref) => {
    const btnClass = React.useMemo(() => {
      const otherClasses = className.length > 0 ? className : "";
      const sizeClass = size === "sm" ? "btn-sm" : size === "lg" ? "btn-lg" : "";
      let mainClass: string;
      switch (contrast) {
        case "low":
          mainClass = "btn btn-light border";
          break;
        case "high":
          mainClass = "btn btn-secondary";
          break;
        default:
          mainClass = "btn";
      }
      return `${mainClass} ${sizeClass} ${otherClasses}`;
    }, [contrast, className]);

    return (
      <>
        <button
          className={btnClass}
          {...otherAttributes}
          ref={ref}
        >
          {children}
        </button>
      </>
    );
  },
);

export default Button;
