import { format } from "date-fns";
import ColumnFilter from "./column-filter";

export const COLUMNS = [
  {
    Header: "Id",
    accessor: "id",
    disableFilters: true,
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Category",
    accessor: "category",
  },
  {
    Header: "Subcategory",
    accessor: "subcategory",
  },
  {
    Header: "Created At",
    accessor: "createdAt",
    Cell: ({ value }) => {
      return format(new Date(value), "dd/MM/yyyy");
    },
  },
  {
    Header: "Updated At",
    accessor: "updatedAt",
    Cell: ({ value }) => {
      return format(new Date(value), "dd/MM/yyyy");
    },
  },
  {
    Header: "Price",
    accessor: "price",
  },
  {
    Header: "Sale Price",
    accessor: "sale_price",
  },
];
