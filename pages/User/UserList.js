import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import TableNoRecordFound from "../../Components/Table/TableNoRecordFound";
import { deleteUserData, getUserData } from "../../Redux/Slice/UserSlice";
import { useRouter } from "next/router";
import DeleteAlert from "../../Components/DeleteAlert/DeleteAlert";

const UserListings = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state?.users?.userData);
  const tokenData = useSelector((state) => state?.token?.token);
  const [rows, setRows] = useState([]);
  const navigate = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setRows(data);
  }, [data]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  const DeleteData = (Id) => {
    DeleteAlert(dispatch, deleteUserData, Id);
  };

  const editData = (row) => {
    navigate.push("/User/UserForm");
    dispatch(getUserData(row));
  };
  useEffect(() => {
    if (!tokenData) {
      navigate.push("/Login/Login");
    }
  }, []);
  // dispatch(resetUserData());
  return (
    <div className="User-Listing">
      <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>User List</h1>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 650 }}
          aria-label="simple table"
          className="margin-Top"
        >
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <span className="Table-Font-Size-UserList">Name</span>
              </TableCell>
              <TableCell align="center">
                <span className="Table-Font-Size-UserList"> Email </span>
              </TableCell>

              <TableCell align="center">
                <span className="Table-Font-Size-UserList">Username </span>
              </TableCell>
              <TableCell align="center">
                <span className="Table-Font-Size-UserList">Mobile Number</span>
              </TableCell>
              <TableCell align="center">
                <span className="Table-Font-Size-UserList">Role</span>
              </TableCell>
              <TableCell align="center">
                <span className="Table-Font-Size-UserList"> Action</span>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!isLoading &&
              rows?.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" align="center">
                    {row.name}
                  </TableCell>
                  <TableCell align="center">{row.email} </TableCell>
                  <TableCell align="center">{row.username}</TableCell>
                  <TableCell align="center">{row.mobile}</TableCell>
                  <TableCell align="center">{row.role}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => DeleteData(index)}
                      startIcon={<DeleteIcon />}
                    >
                      Delete
                    </Button>
                    &nbsp;
                    <Button
                      variant="contained"
                      onClick={() => {
                        editData(row);
                      }}
                      startIcon={<CreateIcon />}
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            {(!data?.length || isLoading) && (
              <TableNoRecordFound colSpan={7} loading={isLoading} />
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default UserListings;
