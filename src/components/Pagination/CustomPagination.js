import { Pagination } from "@mui/material";

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
        margin: 14,
      }}
    >
      <Pagination
        sx={{ button: { color: "#ffffff" } }}
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
