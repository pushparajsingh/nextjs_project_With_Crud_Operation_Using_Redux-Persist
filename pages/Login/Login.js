import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { resetToken, setToken } from "../../Redux/Slice/TokenSlice";

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const Login = () => {
  const getData = useSelector((state) => state?.users?.userData);
  const tokenData = useSelector((state) => state?.token?.token);
  const router = useRouter();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "foobar@example.com",
      password: "foobar",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const Authorization = getData.filter(
        (item) => item.email == values.email && item.password == values.password
      );

      if (Authorization.length != 0) {
        const token = Authorization[0].key;
        dispatch(setToken(token));
        router.push("/User/UserList");
      } else {
        alert("Please Check Email and Password");
      }
    },
  });
  useEffect(() => {
    if (tokenData) {
      router.push("/User/UserList");
    }
  }, []);

  return (
    <div className="loginForm">
      <h1 align="center">Login Form</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="textField">
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </div>
        <div className="textField">
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </div>
        <Button color="primary" variant="contained" fullWidth type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};
export default Login;
