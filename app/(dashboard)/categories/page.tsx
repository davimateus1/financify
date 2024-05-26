"use client";

import { Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table";

import { columns } from "./columns";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useGetCategories } from "@/features/categories/api/use-get-categories";
import { useNewCategory } from "@/features/categories/hooks/use-new-category";
import { useBulkDeleteCategories } from "@/features/categories/api/use-bulk-delete-categories";

const CategoriesPage = () => {
  const newCategory = useNewCategory();
  const { data, isLoading } = useGetCategories();
  const { mutate, isPending } = useBulkDeleteCategories();

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
            Página de categorias
          </CardTitle>
          <Button size="sm" onClick={newCategory.onOpen}>
            <Plus className="size-4 mr-2" />
            Adicionar
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            filterKey="name"
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

export default CategoriesPage;
