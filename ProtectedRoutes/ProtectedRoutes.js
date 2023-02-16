import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import * as routePage from "../Utilis/constants";

const ProtectedRoutes = ({ children }) => {
  const router = useRouter();
  const token = useSelector((state) => state?.token?.token);
  let unprotectedRoutes = [
    routePage.LOGIN_PAGE,
    routePage.USER_FORM,
    routePage.LOGIN_PAGETWO,
  ];
  let protectedRoutes = [
    routePage.ROLE_LIST,
    routePage.ROLE_FORM,
    routePage.USER_LIST,
    routePage.USER_FORM,
  ];
  const pathIsUnProtected = unprotectedRoutes.indexOf(router.pathname) == -1;
  const pathIsProtected = protectedRoutes.indexOf(router.pathname) == -1;

  if (token == "" && pathIsUnProtected) {
    router.push(routePage.LOGIN_PAGE);
  }
  if (token && pathIsProtected) {
    router.push(routePage.USER_LIST);
  }
  return children;
};
export default ProtectedRoutes;
