import {
  Button,
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
} from "@mui/material";
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteRoleData,
  getRoleData,
  resetRoleData,
} from "../../Redux/Slice/RoleSlice";
import TableNoRecordFound from "../../Components/Table/TableNoRecordFound";
import { useRouter } from "next/router";
import DeleteAlert from "../../Components/DeleteAlert/DeleteAlert";

const RoleListing = () => {
  const navigate = useRouter();
  const roleData = useSelector((value) => value?.roles?.roleData);
  const dispatch = useDispatch();
  const [rows, setRows] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setRows(roleData);
  }, [roleData]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);
  const confirmDelete = (Id) => {
    DeleteAlert(dispatch, deleteRoleData, Id);
  };

  const editData = (row) => {
    navigate.push("/Role/RoleForm");
    dispatch(getRoleData(row));
  };

  return (
    <>
      <div>
        <div className="Btn-Role-listing">
          <Button
            variant="contained"
            onClick={() => {
              navigate.push("/Role/RoleForm");
              dispatch(resetRoleData());
            }}
            startIcon={<AddIcon />}
          >
            Add Role
          </Button>
        </div>
        <h1 style={{ textAlign: "center" }}>Role List</h1>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  <b>Role Label</b>
                </TableCell>
                <TableCell align="center">
                  <b>Role Key</b>
                </TableCell>
                <TableCell align="center">
                  <b>Action</b>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {!isLoading &&
                rows?.map((row, index) => (
                  <TableRow
                    key={row.roleKey}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">{row.roleLabel}</TableCell>
                    <TableCell align="center">{row.roleKey}</TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => {
                          confirmDelete(index);
                        }}
                        startIcon={<DeleteIcon />}
                      >
                        Delete
                      </Button>
                      &nbsp;
                      <Button
                        variant="contained"
                        onClick={() => editData(row)}
                        startIcon={<CreateIcon />}
                      >
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              {(!roleData?.length || isLoading) && (
                <TableNoRecordFound colSpan={7} loading={isLoading} />
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default RoleListing;
