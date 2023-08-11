import React from "react";

interface Props {
  children: React.ReactNode;
}

const Container: React.FC<Props> = ({ children = "" }) => {
  return (
    <div
      className="container my-4"
      style={{ maxWidth: 900 }}
    >
      {children}
    </div>
  );
};

export default Container;
