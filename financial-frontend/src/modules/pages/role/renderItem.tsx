import { Button, Checkbox, TableCell, TableRow } from "@mui/material";
import React, { useState } from "react";

const RenderItem = ({ row }: any) => {
  const [obj, setObj] = useState({
    add: false,
    delete: false,
    edit: false,
    view: false,
  });
  const submit = () => {
    
  };
  console.log(obj);
  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell component="th" scope="row">
        {row.component}
      </TableCell>
      <TableCell align="right">
        <Checkbox
          checked={obj.delete}
          onChange={(event: any) => {
            setObj({
              ...obj,
              delete: event.target.checked,
            });
          }}
        />
      </TableCell>
      <TableCell align="right">
        <Checkbox
          checked={obj.edit}
          onChange={(event: any) => {
            setObj({
              ...obj,
              edit: event.target.checked,
            });
          }}
        />
      </TableCell>
      <TableCell align="right">
        {" "}
        <Checkbox
          checked={obj.add}
          onChange={(event: any) => {
            setObj({
              ...obj,
              add: event.target.checked,
            });
          }}
        />
      </TableCell>
      <TableCell align="right">
        {" "}
        <Checkbox
          checked={obj.view}
          onChange={(event: any) => {
            setObj({
              ...obj,
              view: event.target.checked,
            });
          }}
        />
      </TableCell>
      <TableCell align="right">
        <Button size="small" variant="outlined" onClick={() => submit()}>
          Submit
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default RenderItem;
