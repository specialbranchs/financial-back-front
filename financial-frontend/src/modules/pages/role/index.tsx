import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import RenderItem from "./renderItem";

const rows = [
  {
    id: 1,
    component: "com -1",
  },
  {
    id: 2,
    component: "com -2",
  },
  {
    id: 3,
    component: "com -2",
  },
];

export default function RoleManagementScreen() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Component Name</TableCell>
            <TableCell align="right">Delete</TableCell>
            <TableCell align="right">Edit</TableCell>
            <TableCell align="right">Add</TableCell>
            <TableCell align="right">View</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <RenderItem row={row} key={row.id} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
