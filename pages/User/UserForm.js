import { useFormik } from "formik";
import * as React from "react";
import * as yup from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useSelector, useDispatch } from "react-redux";
import {
  updateUserData,
  registerUserData,
  resetUserData,
} from "../../Redux/Slice/UserSlice";
import { phoneRegExp } from "../../Utilis/ReguxValidation";
import { useRouter } from "next/router";
import toast from "../../Components/Toast/index";
import { USERFORM_TIMEOUT, uuid } from "../../Utilis/Utilis";

const validationSchema = yup.object({
  name: yup.string("Enter your name").required("Name is required"),
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
  username: yup
    .string()
    .min(1, "Minimum 1 characters")
    .max(15, "Maximum 15 characters")
    .required("You must enter a username"),
  mobile: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Phone number is required"),
  role: yup.string("Enter your Role").required("Role is required"),
});

const UserRegister = () => {
  const navigate = useRouter();
  const dispatch = useDispatch();
  const updateData = useSelector((state) => state?.users?.userUpdate);
  const getData = useSelector((state) => state?.users?.userData);
  const getRoleLabeldata = useSelector((state) => state?.roles?.roleData);
  const notify = React.useCallback((type, message) => {
    toast({ type, message });
  }, []);

  const formik = useFormik({
    initialValues: updateData
      ? updateData
      : {
          name: "",
          email: "",
          password: "",
          username: "",
          mobile: "",
          role: "",
        },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (updateData) {
        const updatedData = getData.map((item) => {
          if (updateData.key == item.key) {
            return values;
          } else {
            return item;
          }
        });
        dispatch(updateUserData(updatedData));
        dispatch(resetUserData());
        navigate.push("/User/UserList");
      } else {
        dispatch(registerUserData({ ...values, key: uuid() }));
        navigate.push("/Login/Login");
      }
      setTimeout(() => {
        notify("success", "User Submitted Successfully!");
      }, USERFORM_TIMEOUT);
    },
  });

  return (
    <>
      <div className="RegisterForm">
        <h1 className="headingTop">
          {!updateData ? "Register Form" : "Update Form"}
        </h1>

        <form onSubmit={formik.handleSubmit}>
          <div className="textBox">
            <TextField
              fullWidth
              name="name"
              label="Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </div>
          <div className="textBox">
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
          <div className="textBox">
            <TextField
              fullWidth
              name="username"
              label="Username"
              value={formik.values.username}
              onChange={formik.handleChange}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />
          </div>
          <div className="textBox">
            <TextField
              fullWidth
              name="mobile"
              label="Mobile Number"
              value={formik.values.mobile}
              onChange={formik.handleChange}
              error={formik.touched.mobile && Boolean(formik.errors.mobile)}
              helperText={formik.touched.mobile && formik.errors.mobile}
            />
          </div>
          <div className="textBox">
            <TextField
              select
              fullWidth
              name="role"
              label="Role Key"
              value={formik.values.role}
              onChange={formik.handleChange}
              error={formik.touched.role && Boolean(formik.errors.role)}
              helperText={formik.touched.role && formik.errors.role}
              SelectProps={{
                renderValue: (value) => value,
              }}
            >
              {getRoleLabeldata?.map((option, i) => (
                <MenuItem key={option.roleKey} value={option.roleLabel}>
                  {option.roleLabel}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <div className="textBox">
            {!updateData ? (
              <TextField
                fullWidth
                id="password"
                name="password"
                label="Password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
            ) : (
              ""
            )}
          </div>
          <Button
            color="primary"
            variant="contained"
            type="submit"
            fullWidth
            id="btn-user-submit-center"
          >
            Submit
          </Button>
        </form>
        <style jsx>{`
          .message {
            cursor: pointer;
            font: 15px Helvetica, Arial, sans-serif;
            background: #eee;
            padding: 20px;
            text-align: center;
            transition: 100ms ease-in background;
            margin: 10px;
          }
          .message:hover {
            background: #ccc;
          }
        `}</style>
      </div>
    </>
  );
};

export default UserRegister;
