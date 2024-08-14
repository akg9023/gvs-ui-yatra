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
const columns = [
  { id: 'memberIdList', label: 'Members', minWidth: 30 },
  {
    id: 'amount',
    label: 'Amount',
    minWidth: 50,
    align: 'right',
  },
  {
    id: 'upiTxnId',
    label: 'Txn Id',
    minWidth: 70,
    align: 'right',
  },
  {
    id: 'customerVPA',
    label: 'APP Used',
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
  { id: 'userEmail', label: 'Email', minWidth: 100 },

];
export default function StickyHeadTable(props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
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
                >
                  {column.label}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {props?.rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <StyledTableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    <StyledTableCell >
                      {index + 1}
                    </StyledTableCell>
                    {columns.map((column) => {
                      let value = row[column.id];
                      if (column.id === "memberIdList") {
                        value = value.map(o => `${o.dbDevId}_${o.dbDevName.toUpperCase()}_${o.dbDevGender.charAt(0)}${o.dbDevAge}`);
                      }
                      else if (column.id === "txnDate") {
                        const date = new Date(Number(value));
                        value = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}_${String(date.getHours()).padStart(2, 0)}:${String(date.getMinutes()).padEnd(2, 0)}`;
                      }
                      return (
                        <StyledTableCell key={column.id} align={'left'}>
                          {column.id === "memberIdList" ? value.join(" ,\n") : value}
                        </StyledTableCell>
                      );
                    })}
                  </StyledTableRow>
                );
              })}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={props.rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

    </Paper>
  );
}

