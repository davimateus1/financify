"use client";

import { Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table";

import { columns } from "./columns";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useGetTransactions } from "@/features/transactions/api/use-get-transactions";
import { useNewTransaction } from "@/features/transactions/hooks/use-new-transaction";
import { useBulkDeleteTransactions } from "@/features/transactions/api/use-bulk-delete-transactions";

const TransactionsPage = () => {
  const newTransaction = useNewTransaction();
  const { data, isLoading } = useGetTransactions();
  const { mutate, isPending } = useBulkDeleteTransactions();

  const isDisabled = isPending || isLoading;

  if (isLoading) {
    return (
      <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
        <Card className="border-none drop-shadow-sm">
          <CardHeader>
            <Skeleton className="h-8 w-48" />
          </CardHeader>
          <CardContent>
            <div className="h-[400px] w-full flex items-center justify-center">
              <Loader2 className="size-8 text-slate-300 animate-spin" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">
            Histórico de transações
          </CardTitle>
          <Button size="sm" onClick={newTransaction.onOpen}>
            <Plus className="size-4 mr-2" />
            Adicionar
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            filterKey="payee"
            data={data || []}
            columns={columns}
            disabled={isDisabled}
            onDelete={(rows) => {
              const ids = rows.map((row) => row.original.id);
              mutate({ ids });
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionsPage;
