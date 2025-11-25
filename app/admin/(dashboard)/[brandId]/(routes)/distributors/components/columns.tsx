"use client"

import { ColumnDef } from "@tanstack/react-table"

import { CellAction } from "./cell-action"

export type DistributorColumn = {
  id: string
  name: string;
  phoneNumber: string;
  country: string;
  state: string;
  city: string;
  // updatedAt: string;
  // updatedBy: string;
}

export const columns: ColumnDef<DistributorColumn>[] = [
  {
    accessorKey: "name",
    header: "Company",
  },  
  {
    accessorKey: "phoneNumber",
    header: "Phone",
  },
  {
    accessorKey: "country",
    header: "Country",
  },
  {
    accessorKey: "state",
    header: "State",
  },
  {
    accessorKey: "city",
    header: "City",
  },
  // {
  //   accessorKey: "updatedBy",
  //   header: "Updated By",
  // },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <CellAction data={row.original} />
  },
];
