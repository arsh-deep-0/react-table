import React, { useMemo } from "react";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  useFilters,
  usePagination,
} from "react-table";
import { COLUMNS } from "./columns.js";
import SAMPLE_DATA from "./sample-data.json";
import "./table.css";
import GlobalFilter from "./global-filter.js";
import ColumnFilter from "./column-filter.js";

export default function PaginationTable() {
  const columns = useMemo(() => {
    return COLUMNS;
  }, []);

  const data = useMemo(() => {
    return SAMPLE_DATA;
  }, []);

  const defaultColumn = useMemo(() => {
    return { Filter: ColumnFilter };
  });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
    prepareRow,
    state,
    setGlobalFilter,
    
  } = useTable(
    {
      columns,
      data,
      ColumnFilter,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { globalFilter, pageIndex ,pageSize} = state;

  return (
    <div className="flex flex-col items-center">
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " ↓"
                        : " ↑"
                      : " "}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        <span>
          {" "}
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>{" "}
        <span>
          | Go to Page{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const pageNumber = e.target.value
                ? Number(e.target.value) - 1
                : 0;
              gotoPage(pageNumber);
            }}
            style={{'width':'50px'}}
          />
          <select value={pageSize} onChange={e=>{setPageSize(Number(e.target.value))}}>
            {[10,20,50].map(pageSize =>(
                <option key={pageSize} value={pageSize}>
                    show {pageSize}
                </option>

            ))}
          </select>
        </span>
        <button
          onClick={() => {
            gotoPage(0);
          }}
          disabled={!canPreviousPage}
        >
          {"<<"}
        </button>
        <button onClick={previousPage} disabled={!canPreviousPage}>
          Prev
        </button>
        <button onClick={nextPage} disabled={!canNextPage}>
          Next
        </button>
        <button
          onClick={() => {
            gotoPage(pageCount - 1);
          }}
          disabled={!canNextPage}
        >
          {">>"}
        </button>
      </div>
    </div>
  );
}
