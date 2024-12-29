import React from "react";
import { Box, TextField, Button, MenuItem } from "@mui/material";

const LogsFilter = ({
  filters,
  onFilterChange,
  onApplyFilters,
  onClearFilters,
}) => {
  const handleInputChange = (e) => {
    onFilterChange({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <Box display="flex" gap={2} marginBottom={2}>
      <TextField
        label="User"
        name="user"
        value={filters.user}
        onChange={handleInputChange}
        size="small"
      />
      <TextField
        select
        label="Action"
        name="action"
        value={filters.action}
        onChange={handleInputChange}
        size="small"
        style={{ minWidth: "150px" }}
      >
        <MenuItem value="">All</MenuItem>
        <MenuItem value="login">Login</MenuItem>
        <MenuItem value="login_failed">Login Failed</MenuItem>
        <MenuItem value="signup">Signup</MenuItem>
        <MenuItem value="profile_update">Profile Update</MenuItem>
        <MenuItem value="forgot_password">Forgot Password</MenuItem>
      </TextField>
      <TextField
        label="Date"
        name="date"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={filters.date}
        onChange={handleInputChange}
        size="small"
      />
      <Button variant="contained" onClick={onApplyFilters} size="small">
        Apply
      </Button>
      <Button variant="outlined" onClick={onClearFilters} size="small">
        Clear
      </Button>
    </Box>
  );
};

export default LogsFilter;
