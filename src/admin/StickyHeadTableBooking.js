import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import { Box, Button, IconButton, TextField } from '@mui/material';
import { FileDownload } from 'emotion-icons/fa-solid';
const columns = [
  { id: 'id', label: 'Booking Id', minWidth: 30 },
  { id: 'customerName', label: 'Booked By', minWidth: 30 },
  { id: 'customerPhoneNo', label: 'Phone no', minWidth: 30 },
  { id: 'roomSet', label: 'Members Room', minWidth: 30 },
  {
    id: 'amount',
    label: 'Amount',
    minWidth: 50,
    align: 'right',
  },
  {
    id: 'customerTxnId',
    label: 'Txn Id',
    minWidth: 70,
    align: 'right',
  },
  {
    id: 'customerVPA',
    label: 'method',
    minWidth: 50,
    align: 'right',
  },
  {
    id: 'paymentStatus',
    label: 'Status',
    minWidth: 50,
    align: 'right',
  },
  {
    id: 'txnDate',
    label: "Txn Date",
    minWidth: 50,
    align: 'right',
  },
  { id: 'customerEmail', label: 'Email', minWidth: 100 },

];
export default function StickyHeadTableBooking(props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [searchText, setSearchText] = React.useState("");
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#090979',
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  const filteredRows = props.rows.filter((row) => {
    return Object.values(row).some((value) =>
      typeof value === "string"
        ? value.toLowerCase().includes(searchText.toLowerCase())
        : typeof value === "number"
          ? value.toString().includes(searchText)
          : false
    );
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <Paper elevation={4} sx={{ width: '140%', overflow: 'hidden', rem: 4, alignSelf: 'center', marginLeft: 1, marginTop: 5, marginRight: 5 }}>
      <TableContainer >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
          sx={{ p: 2 }}
        >
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            // sx={{ width: 300 }}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />

          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50]}
            component="div"
            count={filteredRows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{
              '.MuiTablePagination-toolbar': {
                minHeight: '32px',
                padding: '0px 8px',
              },
              '.MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows': {
                fontSize: '0.75rem',
                margin: 0,
              },
              '.MuiTablePagination-select': {
                fontSize: '0.75rem',
              },
              '.MuiTablePagination-actions': {
                marginLeft: 0,
              },
            }}
          />
          <IconButton
            variant="contained"
            onClick={() => props.onExport(filteredRows, `Members_rooms_${searchText || 'all'}.xlsx`)}
            sx={{
              mx: 1,
              transition: 'all 0.3s',
              '&:hover': {
                color: 'green',
              },
            }}
          >
            <FileDownload size={20} />
          </IconButton>
        </Box>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <StyledTableCell
                style={{ minWidth: "40" }}
              >
                Sl
              </StyledTableCell>
              {columns.map((column) => (
                <StyledTableCell
                  key={column.id}
                  align={'center'}
                  style={{ minWidth: column.minWidth }}
                  sx={{ whiteSpace: 'nowrap', minWidth: 'fit-content' }}
                >
                  {column.label}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <StyledTableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    <StyledTableCell >
                      {index + 1}
                    </StyledTableCell>
                    {columns.map((column) => {
                      let value = row[column.id];
                      if (column.id === "roomSet") {
                        value = value.map(o => {
                          const members = o.member
                            .map(m => `${m.dbDevName.toUpperCase()}_${m.dbDevGender.charAt(0)}`)
                            .join(", ");
                          return `${o.roomType.roomId}->[${members}]`
                        });
                      }
                      else if (column.id === "txnDate") {
                        value = value.split('.')[0].replace("T", " ");
                      }
                      return (
                        <StyledTableCell key={column.id} align={'left'} sx={{ whiteSpace: 'nowrap', minWidth: 'fit-content' }}>
                          {column.id === "roomSet" ? value.join("\n") : value}
                        </StyledTableCell>
                      );
                    })}
                  </StyledTableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>

    </Paper>
  );
}

