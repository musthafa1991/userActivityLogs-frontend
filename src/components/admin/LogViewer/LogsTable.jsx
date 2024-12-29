import React from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  Typography,
} from "@mui/material";

const LogsTable = ({ logs }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}>
              User Email
            </TableCell>
            <TableCell sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}>
              Action
            </TableCell>
            <TableCell sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}>
              Time
            </TableCell>
            <TableCell sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}>
              IP Address
            </TableCell>
            <TableCell sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}>
              User Agent
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {logs.length > 0 ? (
            logs.map((log) => (
              <TableRow key={log._id}>
                <TableCell>{log.userEmail || "N/A"}</TableCell>
                <TableCell>{log.action}</TableCell>
                <TableCell>
                  {new Date(log.timestamp).toLocaleString()}
                </TableCell>
                <TableCell>{log.details?.ip || "N/A"}</TableCell>
                <TableCell>{log.details?.userAgent || "N/A"}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5}>
                <Typography
                  align="center"
                  sx={{ padding: 2, fontStyle: "italic" }}
                >
                  No logs found
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LogsTable;
