import React, { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  type?: "text" | "number";
  name?: string;
}

const TextField = React.forwardRef<HTMLInputElement, Props>(
  ({ label = "", name = "", type = "text", ...otherInputAttrs }, ref) => {
    const id = React.useId();

    return (
      <div className="input-group">
        {/* Form Label */}
        <label
          className="input-group-text"
          htmlFor={id}
        >
          {label}
        </label>
        {/* Input Element */}
        <input
          className="form-control focus-ring focus-ring-secondary"
          id={id}
          name={name}
          ref={ref}
          type={type}
          {...otherInputAttrs}
        />
      </div>
    );
  },
);

export default TextField;
