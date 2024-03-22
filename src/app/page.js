"use client";

import ColumnHiding from "@/components/column-hiding";
import ColumnOrderingTable from "@/components/column-order";
import FilteringTable from "@/components/filtering-table";
import PaginationTable from "@/components/pagination-table";
import SortingTable from "@/components/sorting-table";
import TableV8 from "@/components/table-v8";
import BasicTable from "@/components/v-8/BasicTable";
import Image from "next/image";

export default function Home() {
  return (
    <div className=" bg-white pt-8 text-black text-sm">
      {/* <BasicTable /> */}
      {/* <SortingTable/> */}
      {/* <FilteringTable/> */}
      {/* <PaginationTable/> */}
      {/* <ColumnOrderingTable/> */}
      {/* <ColumnHiding/> */}
      {/* <TableV8/> */}
      <BasicTable/>
    </div>
  );
}
