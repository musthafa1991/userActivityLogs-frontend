import React, { useEffect, useState } from "react";

import { Box, CircularProgress, Typography } from "@mui/material";

import axiosInstance from "../../config/axiosConfig";

import LogsPagination from "../../components/admin/LogViewer/Pagination";
import LogsTable from "../../components/admin/LogViewer/LogsTable";
import LogsFilter from "../../components/admin/LogViewer/LogsFilter";

const Logs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ user: "", action: "", date: "" });
  const [appliedFilters, setAppliedFilters] = useState({
    user: "",
    action: "",
    date: "",
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 10,
    totalLogs: 0,
    totalPages: 0,
  });

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axiosInstance.get("/logs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page: pagination.currentPage,
          pageSize: pagination.pageSize,
          user: appliedFilters.user,
          action: appliedFilters.action,
          date: appliedFilters.date,
        },
      });

      setLogs(response.data.logs);
      setPagination((prev) => ({
        ...prev,
        totalLogs: response.data.totalLogs,
        totalPages: response.data.totalPages,
      }));
    } catch (err) {
      setError("Failed to fetch logs. Please try again.");
      console.error("Error fetching logs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [appliedFilters, pagination.currentPage]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const applyFilters = () => {
    setAppliedFilters(filters);
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  };

  const clearFilters = () => {
    setFilters({ user: "", action: "", date: "" });
    setAppliedFilters({ user: "", action: "", date: "" });
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  };

  const handlePageChange = (newPage) => {
    setPagination((prev) => ({ ...prev, currentPage: newPage }));
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="calc(100vh - 64px)"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="calc(100vh - 64px)"
      >
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box mt={8} p={2}>
      <LogsFilter
        filters={filters}
        onFilterChange={handleFilterChange}
        onApplyFilters={applyFilters}
        onClearFilters={clearFilters}
      />
      <LogsTable logs={logs} />
      <LogsPagination pagination={pagination} onPageChange={handlePageChange} />
    </Box>
  );
};

export default Logs;
