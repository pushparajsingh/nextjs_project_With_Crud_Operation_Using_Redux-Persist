import React, { useState, useEffect } from "react";

import { useRouter } from "next/router";

import { useSelector } from "react-redux";

const isBrowser = () => typeof window !== "undefined";

const ProtectedRoutes = ({ children }) => {
  const router = useRouter();

  const { token } = useSelector((state) => ({
    token: state?.token?.token,
  }));

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 800);
  }, [loading]);

  useEffect(() => {
    setLoading(true);

    handleLoader();
  }, [logout]);

  const handleLoader = () => {
    setTimeout(() => {
      setLoading(false);
    }, 800);
  };

  let unprotectedRoutes = [
    appRoutes.HOME_PAGE,

    appRoutes.ABOUT_US_PAGE,

    appRoutes.SERVICE_PAGE,

    appRoutes.PORTFOLIO_PAGE,

    appRoutes.PORTFOLIO_DETAILS_PAGE,

    appRoutes.TEAM_PAGE,

    appRoutes.GALLERY_PAGE,

    appRoutes.CAREER_PAGE,

    appRoutes.CONTACT_US_PAGE,

    appRoutes.LOGIN_PAGE,
  ];

  let protectedRoutes = [
    appRoutes.PROFILE,

    appRoutes.DASHBOARD,

    appRoutes.TEAM_LIST,

    appRoutes.TEAM_CREATE,

    appRoutes.TEAM_UPDATE,

    appRoutes.CAREERS_LIST,

    appRoutes.CAREERS_CREATE,

    appRoutes.CAREERS_UPDATE,

    appRoutes.CLIENT_LIST,

    appRoutes.CLIENT_CREATE,

    appRoutes.CLIENT_UPDATE,

    appRoutes.CATEGORIES_LIST,

    appRoutes.CATEGORIES_UPDATE,

    appRoutes.CATEGORIES_CREATE,

    appRoutes.BLOGS_LIST,

    appRoutes.BLOGS_CREATE,

    appRoutes.BLOGS_UPDATE,

    appRoutes.COMPANY_EVENT_LIST,

    appRoutes.COMPANY_EVENT_CREATE,

    appRoutes.COMPANY_EVENT_UPDATE,
  ];

  /**

   * @var pathIsUnProtected Checks if path exists in the unprotectedRoutes routes array

   */

  const pathIsUnProtected = unprotectedRoutes.indexOf(router.pathname) === -1;

  /**

   * @var pathIsProtected Checks if path exists in the protectedRoutes routes array

   */

  const pathIsProtected = protectedRoutes.indexOf(router.pathname) === -1;

  if (loading) {
    return <FullPageLoading />;
  }

  if (isBrowser() && !isAuthenticated && pathIsUnProtected) {
    router.push(appRoutes.HOME_PAGE);
  } else if (isBrowser() && isAuthenticated && pathIsProtected) {
    router.push(appRoutes.DASHBOARD);
  }

  return children;
};

export default ProtectedRoutes;

// import * as appRoutes from "../Utilis/constants";
// import { useRouter } from "next/router";
// import { useSelector } from "react-redux";

// const isBrowser = () => typeof window !== "undefined";
// const ProtectedRoutes = ({ children }) => {
//   const router = useRouter();
//   const isAuthenticated = useSelector((state) => state?.token?.token);

//   let unprotectedRoutes = ["/Login/Login", "/User/UserForm", "/"];
//   let protectedRoutes = [
//     "/User/UserList",
//     "/Role/RoleForm",
//     "/Role/RoleList",
//     "/User/UserForm",
//   ];

//   if (
//     !isAuthenticated &&
//     (router.pathname == "/" ||
//       router.pathname == "/Login/Login" ||
//       router.pathname == "/User/UserForm")
//   ) {
//     return children;
//   } else if (
//     isAuthenticated &&
//     (router.pathname == "/User/UserList" ||
//       router.pathname == "/Role/RoleForm" ||
//       router.pathname == "/Role/RoleList" ||
//       router.pathname == "/" ||
//       router.pathname == "/User/UserForm")
//   ) {
//     if (
//       router.pathname == "/" ||
//       router.pathname == "/Login/Login" ||
//       router.pathname == "/User/UserForm"
//     ) {
//       return router.push("/User/UserList");
//     } else return children;
//   } else return router.push("/Login/Login");
// };

// export default ProtectedRoutes;
