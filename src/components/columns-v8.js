import { format } from "date-fns";
import ColumnFilter from "./column-filter";

export const COLUMNS = [
  {
    header: "Id",
    accessor: "id",
    disableFilters: true,
  },
  {
    header: "Name",
    accessor: "name",
  },
  {
    header: "Category",
    accessor: "category",
  },
  {
    header: "Subcategory",
    accessor: "subcategory",
  },
  {
    header: "Created At",
    accessor: "createdAt",
    cell: ({ value }) => {
      return format(new Date(value), "dd/MM/yyyy");
    },
  },
  {
    header: "Updated At",
    accessor: "updatedAt",
    cell: ({ value }) => {
      return format(new Date(value), "dd/MM/yyyy");
    },
  },
  {
    header: "Price",
    accessor: "price",
  },
  {
    header: "Sale Price",
    accessor: "sale_price",
  },
];
