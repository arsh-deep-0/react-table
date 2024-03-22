import React, { useMemo } from "react";
import { useTable ,useSortBy } from "react-table";
import { COLUMNS } from "./columns.js";
import SAMPLE_DATA from "./sample-data.json";
import "./table.css";

export default function SortingTable() {
  const columns = useMemo(() => {
    return COLUMNS;
  }, []);

  const data = useMemo(() => {
    return SAMPLE_DATA;
  }, []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    },
    useSortBy
    );

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render("Header")}
                <span>
                    {column.isSorted ? (column.isSortedDesc ?  " ↓":" ↑"):" "}
                </span>
                </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
