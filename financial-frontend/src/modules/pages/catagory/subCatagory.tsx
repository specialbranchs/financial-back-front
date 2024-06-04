import React from "react";
import useChildDoronList from "../../../hooks/useChildDoron";
import { Chip } from "@mui/material";
import { CloseOutlined } from "@mui/icons-material";
import { sxStyle } from "../search/editsearch/PersonDetails";
type Props = {
  id: number;
  role: number;
};
const SubCatagory = ({ id, role }: Props) => {
  const { designations } = useChildDoronList(id);
  return (
    <>
      {designations.slice(1, designations.length).map((value) =>
        role === 7 || role === 6 ? (
          <Chip
            size="small"
            sx={{ mr: 1, ...sxStyle }}
            label={value.title}
            variant="outlined"
            deleteIcon={<CloseOutlined color="error" />}
            onDelete={() => {
              console.log("ond");
            }}
          />
        ) : (
          <Chip
            size="small"
            sx={{ mr: 1, ...sxStyle }}
            label={value.title}
            variant="outlined"
          />
        )
      )}
    </>
  );
};

export default SubCatagory;
