import { Pagination } from "@mui/material";
import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  ul: {
    "& .MuiPaginationItem-root": {
      color: "#fff",
    },
  },
}));

const CustomPagination = ({ setPage }) => {
  const classes = useStyles();
  // change page behaviour
  const handlePageChange = (page) => {
    setPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginTop: 20,
      }}
    >
      <Pagination
        classes={{ ul: classes.ul }}
        count={10}
        shape="rounded"
        color="primary"
        onChange={(event) => {
          handlePageChange(event.target.textContent);
        }}
      />
    </div>
  );
};

export default CustomPagination;
