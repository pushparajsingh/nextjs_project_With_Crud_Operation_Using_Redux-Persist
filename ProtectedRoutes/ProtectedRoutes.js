import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

// const isBrowser = () => typeof window !== "undefined";

const ProtectedRoutes = ({ children }) => {
  const router = useRouter();
  const token = useSelector((state) => state?.token?.token);
  let unprotectedRoutes = ["/", "/User/UserForm", "/Login/Login"];
  let protectedRoutes = [
    "/Role/RoleList",
    "/Role/RoleForm",
    "/User/UserList",
    "/User/UserForm",
  ];
  const pathIsUnProtected = unprotectedRoutes.indexOf(router.pathname) == -1;
  const pathIsProtected = protectedRoutes.indexOf(router.pathname) == -1;

  if (token == "" && pathIsUnProtected) {
    router.push("/Login/Login");
  }
  if (token && pathIsProtected) {
    router.push("/User/UserList");
  }

  return children;
};
export default ProtectedRoutes;
