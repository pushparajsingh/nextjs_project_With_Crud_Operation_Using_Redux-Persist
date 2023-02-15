import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { registerRoleData, updateRoleData } from "../../Redux/Slice/RoleSlice";
import { numberKeyRegExp } from "../../Utilis/ReguxValidation";
import { useRouter } from "next/router";
import toast from "../../Components/Toast/index";
import { ROLEFORM_TIMEOUT } from "../../Utilis/Utilis";
import { useCallback } from "react";

const validationSchema = yup.object({
  roleLabel: yup
    .string("Enter your roleLabel:")
    .required("Role Label is required"),
  roleKey: yup
    .string("Enter your roleKey")
    .min(3, "Role key at least 3 digit")
    .matches(numberKeyRegExp, "Role Key is not valid,Write in number format")
    .required("Role Key is required"),
});

const RoleRegister = () => {
  const navigate = useRouter();
  const dispatch = useDispatch();
  const roleData = useSelector((state) => state?.roles?.roleData);
  const updateData = useSelector((state) => state?.roles?.updateRoleData);
  const notify = useCallback((type, message) => {
    toast({ type, message });
  }, []);

  const formik = useFormik({
    initialValues: updateData
      ? updateData
      : {
          roleLabel: "",
          roleKey: "",
        },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (updateData) {
        const uniqueKey = roleData.filter(
          (item) => item.roleKey == values.roleKey
        );
        if (updateData.roleKey == values.roleKey || uniqueKey.length == 0) {
          const updatedData = roleData?.map((item) => {
            if (updateData.roleKey == item.roleKey) {
              return values;
            } else {
              return item;
            }
          });

          dispatch(updateRoleData(updatedData));
          navigate.push("/Role/RoleList");
          setTimeout(() => {
            notify("success", "Role Updated Successfully!");
          }, ROLEFORM_TIMEOUT);
        } else {
          alert("This key has already exist, please try another key");
        }
      } else {
        const data = roleData?.filter((item) => item.roleKey == values.roleKey);
        if (data != 0) {
          alert("This key has already exist, please try another key");
        } else {
          dispatch(registerRoleData(values));
          navigate.push("/Role/RoleList");
          setTimeout(() => {
            notify("success", "Role Created Successfully!");
          }, ROLEFORM_TIMEOUT);
        }
      }
    },
  });

  return (
    <>
      <h1 style={{ textAlign: "center", marginTop: "3rem" }}>
        {updateData ? "Role Labeling Update" : "Role Labeling"}
      </h1>
      <div id="centerRoleLabelBox">
        <form onSubmit={formik.handleSubmit}>
          <div className="box-label">
            <TextField
              fullWidth
              name="roleLabel"
              label="Role Label"
              value={formik.values.roleLabel}
              onChange={formik.handleChange}
              error={
                formik.touched.roleLabel && Boolean(formik.errors.roleLabel)
              }
              helperText={formik.touched.roleLabel && formik.errors.roleLabel}
            />
          </div>

          <div className="box-label">
            <TextField
              fullWidth
              name="roleKey"
              label="Role Key"
              value={formik.values.roleKey}
              onChange={formik.handleChange}
              error={formik.touched.roleKey && Boolean(formik.errors.roleKey)}
              helperText={formik.touched.roleKey && formik.errors.roleKey}
            />
          </div>
          <Button color="primary" variant="contained" fullWidth type="submit">
            Submit
          </Button>
        </form>
      </div>
    </>
  );
};

export default RoleRegister;
