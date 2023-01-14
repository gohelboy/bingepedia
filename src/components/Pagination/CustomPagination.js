import { Pagination } from "@mui/material";
import React from "react";

const CustomPagination = ({ setPage, NoOfPage }) => {
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
        alignItems: "center",
        marginTop: 20,
      }}
    >
      <Pagination
        sx={{ button: { color: "#ffffff" } }}
        style={{ color: "red" }}
        count={NoOfPage}
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
