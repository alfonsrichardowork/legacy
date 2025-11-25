"use client"

import { ColumnDef } from "@tanstack/react-table"

import { CellAction } from "./cell-action"

export type ContactColumn = {
  id: string
  type: string;
  phoneNumber: string;
  city: string;
  // updatedAt: string;
  // updatedBy: string;
}

export const columns: ColumnDef<ContactColumn>[] = [
  {
    accessorKey: "type",
    header: "Type",
  },  
  {
    accessorKey: "phoneNumber",
    header: "Phone",
  },
  {
    accessorKey: "city",
    header: "City",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <CellAction data={row.original} />
  },
];
