import Head from "next/head";
import React, { useEffect } from "react";
import Login from "./Login/Login";

const Index = () => {
  return (
    <>
      <Head>
        <title>Logo Project</title>
      </Head>
      <Login/>
    </>
  );
};

export default Index;
