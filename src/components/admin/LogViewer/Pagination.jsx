import React from "react";
import { Box, Pagination } from "@mui/material";

const LogsPagination = ({ pagination, onPageChange }) => {
  const handlePageChange = (event, value) => {
    onPageChange(value);
  };

  return (
    <Box display="flex" justifyContent="center" marginTop={2}>
      <Pagination
        count={pagination.totalPages}
        page={pagination.currentPage}
        onChange={handlePageChange}
      />
    </Box>
  );
};

export default LogsPagination;
