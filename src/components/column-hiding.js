import React, { useMemo } from "react";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  useFilters,
  usePagination,
  useColumnOrder,
} from "react-table";
import { COLUMNS } from "./columns.js";
import SAMPLE_DATA from "./sample-data.json";
import "./table.css";
import GlobalFilter from "./global-filter.js";
import ColumnFilter from "./column-filter.js";
import {CheckBox} from "./checkbox.js";

export default function ColumnHiding() {
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
    setColumnOrder,
    allColumns,
    getToggleHideAllColumnsProps,
  } = useTable(
    {
      columns,
      data,
    //   ColumnFilter,
    defaultColumn
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
    useColumnOrder
  );

  const { globalFilter, pageIndex, pageSize } = state;

  const changeOrder = () => {
    setColumnOrder([
      "id",
      "name",
      "category",
      "subcategory",

      "sale_price",
      "price",
      "createdAt",
      "updatedAt",
    ]);
  };

  return (
    <div className="flex flex-col items-center">
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <button onClick={changeOrder}>Change Column Order</button>
      <div className="flex gap-2 justify-between">
        <div>
          <CheckBox {...getToggleHideAllColumnsProps()} /> Toggle All
        </div>
        {allColumns.map((column) => (
          <div key={column.id} >
            <label>
                <input type="checkbox" {...column.getToggleHiddenProps()} />
                {column.Header}
            </label>
          </div>
        ))}
      </div>

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
                  <div>{column.canFilter ? column.render('Filter'):null}</div>
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
            style={{ width: "50px" }}
          />
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 50].map((pageSize) => (
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
