"use client";

import { InferResponseType } from "hono";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

import { client } from "@/lib/hono";
import { Actions } from "./actions";
import { ColumnDef } from "@tanstack/react-table";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { formatCurrency } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { AccountColumn } from "./account-column";
import { CategoryColumn } from "./category-column";

import { Checkbox } from "@/components/ui/checkbox";

export type ResponseType = InferResponseType<
  typeof client.api.transactions.$get,
  200
>["data"][0];

export const columns: ColumnDef<ResponseType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Data
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = row.getValue("date") as Date;

      return (
        <span>{format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}</span>
      );
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Categoria
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const { id, category, categoryId } = row.original;
      return (
        <CategoryColumn id={id} category={category} categoryId={categoryId} />
      );
    },
  },
  {
    accessorKey: "payee",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Pagador
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <span>{row.original.payee}</span>;
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Valor
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));

      return (
        <Badge
          variant={amount < 0 ? "destructive" : "primary"}
          className="text-xs font-medium px-3.5 py-2.5"
        >
          {formatCurrency(amount)}
        </Badge>
      );
    },
  },
  {
    accessorKey: "account",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Conta
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const { account, accountId } = row.original;
      return <AccountColumn account={account} accountId={accountId} />;
    },
  },
  {
    id: "actions",
    accessorKey: "Ações",
    cell: ({ row }) => <Actions id={row.original.id} />,
  },
];
