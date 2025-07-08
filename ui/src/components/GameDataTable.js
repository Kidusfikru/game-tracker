import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

function GameDataTable({ data }) {
  return (
    <>
      <Typography variant="h5" gutterBottom fontWeight={600}>
        Data Table
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Steam Followers</TableCell>
              <TableCell>Reddit Mentions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, idx) => (
              <TableRow key={idx}>
                <TableCell>{row.date}</TableCell>
                <TableCell>
                  {row.followers !== null ? row.followers : "-"}
                </TableCell>
                <TableCell>{row.mentions}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default GameDataTable;
