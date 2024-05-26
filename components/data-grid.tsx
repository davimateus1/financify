"use client";

import { DataCard, DataCardLoading } from "./data-card";
import { PiggyBankIcon, TrendingDownIcon, TrendingUpIcon } from "lucide-react";

import { formatDateRange } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { useGetSummary } from "@/features/summary/api/use-get-summary";

export const DataGrid = () => {
  const params = useSearchParams();
  const { data, isLoading } = useGetSummary();

  const to = params.get("to") || undefined;
  const from = params.get("from") || undefined;

  const dateRangeLabel = formatDateRange({ from, to });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-2 mb-8">
        <DataCardLoading />
        <DataCardLoading />
        <DataCardLoading />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-2 mb-8">
      <DataCard
        title="Restante"
        icon={PiggyBankIcon}
        variant="default"
        dateRange={dateRangeLabel}
        value={data?.remainingAmount}
        percentageChange={data?.remainingChange}
      />
      <DataCard
        variant="success"
        title="Rendimentos"
        icon={TrendingUpIcon}
        dateRange={dateRangeLabel}
        value={data?.incomeAmount}
        percentageChange={data?.incomeChange}
      />
      <DataCard
        variant="danger"
        title="Despesas"
        icon={TrendingDownIcon}
        dateRange={dateRangeLabel}
        value={data?.expensesAmount}
        percentageChange={data?.expensesChange}
      />
    </div>
  );
};
