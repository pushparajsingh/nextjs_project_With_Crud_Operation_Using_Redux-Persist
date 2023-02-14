import React, { memo } from "react";
import { TableRow, TableCell, CircularProgress } from "@mui/material";

const TableNoRecordFound = ({ loading, colSpan }) => {
  return (
    <TableRow>
      <TableCell colSpan={colSpan} align="center">
        {loading ? <CircularProgress size={22} /> : <h2>No Record Found</h2>}
      </TableCell>
    </TableRow>
  );
};
export default memo(TableNoRecordFound);
