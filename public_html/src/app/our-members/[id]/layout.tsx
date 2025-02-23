import React from "react";

interface NewLayoutProps {
  children: React.ReactNode;
}

const NewLayout: React.FC<NewLayoutProps> = ({ children }) => {
  return <>{children}</>;
};

export default NewLayout;
