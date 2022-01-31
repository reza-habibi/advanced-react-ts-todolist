import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import { Form } from "react-bootstrap";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import TableBodyRow from "./TableBodyRow/TableBodyRow";
import { useSortableData } from "./../../hooks/useSortableData";
import { useAppSelector } from "../../app/hooks";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function BasicTable(props: any) {
  const classes = useStyles();

  const { searchTodo } = useAppSelector((state) => state.todos);

  const [paginationValue, setPaginationValue] = useState<number>(0);
  const [pageCounts, setPageCounts] = useState<number>(1);
  const [pageNumber, setPageNumber] = useState<number>(1);

  function handleEdit(index: number) {
    props.setOpen(true);

    props.setEditMode(true);
  }

  function handleView(index: number) {
    props.setOpen(true);

    props.setViewMode(true);
  }

  function paginationChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setPaginationValue(parseFloat(e.target.value));
  }

  useEffect(() => {
    paginationValue !== 0
      ? setPageCounts(searchTodo.length / paginationValue)
      : setPageCounts(1);
  }, [paginationValue, searchTodo.length]);

  const pageNumberUp = () => {
    pageNumber * paginationValue < searchTodo.length &&
      setPageNumber(pageNumber + 1);
  };
  const pageNumberDown = () => {
    pageNumber > 1 && setPageNumber(pageNumber - 1);
  };

  const { items, requestSort, sortConfig } = useSortableData(searchTodo);
  const getClassNamesFor = (name: string) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell
              style={{ borderRight: "1px solid rgba(224, 224, 224, 1)" }}
            >
              Task
            </TableCell>
            <TableCell
              style={{ cursor: "pointer" }}
              align="center"
              onClick={() => requestSort("priority")}
              className={getClassNamesFor("priority")}
            >
              Priority
            </TableCell>
            <TableCell
              style={{ cursor: "pointer" }}
              align="center"
              onClick={() => requestSort("status")}
              className={getClassNamesFor("status")}
            >
              Status
            </TableCell>
            <TableCell
              style={{ cursor: "pointer" }}
              align="center"
              onClick={() => requestSort("deadline")}
              className={getClassNamesFor("deadline")}
            >
              Deadline
            </TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item, index) => {
              if (paginationValue !== 0) {
                if (
                  pageNumber * paginationValue - paginationValue <= index &&
                  index < pageNumber * paginationValue
                ) {
                  return (
                    <TableBodyRow
                      key={index}
                      item={item}
                      handleView={handleView}
                      handleEdit={handleEdit}
                    />
                  );
                }
              } else {
                return (
                  <TableBodyRow
                    key={index}
                    item={item}
                    handleView={handleView}
                    handleEdit={handleEdit}
                  />
                );
              }
            })}
        </TableBody>
      </Table>
      <div className={"w-100 d-flex justify-content-end"}>
        <div
          className={
            "pagination-div w-25 d-flex justify-content-around align-items-center"
          }
        >
          <label htmlFor={"pagination-select"}>Rows per page :</label>
          <Form.Control
            as="select"
            id={"pagination-select"}
            className={"border-0 border-bottom-3"}
            custom
            onChange={paginationChange}
          >
            <option value={0}>All</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
          </Form.Control>
          {paginationValue !== 0 && (
            <div>
              {pageNumber * paginationValue - paginationValue + 1}-
              {pageNumber * paginationValue} / page : {pageNumber}
            </div>
          )}
          <MdKeyboardArrowLeft
            className={"display-6"}
            onClick={pageNumberDown}
          ></MdKeyboardArrowLeft>
          <MdKeyboardArrowRight
            className={"display-6"}
            onClick={pageNumberUp}
          ></MdKeyboardArrowRight>
        </div>
      </div>
    </TableContainer>
  );
}
