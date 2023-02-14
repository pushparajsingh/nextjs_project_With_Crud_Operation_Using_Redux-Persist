import { useRouter } from "next/router";
import React from "react";
import Header from "./Header/Header";

const Layout = ({ children }) => {
  const Router = useRouter();
  return (
    <>
      <Header />
      <div>{children}</div>
    </>
  );
};

export default Layout;
