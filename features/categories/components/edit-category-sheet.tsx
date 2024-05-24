import {
  Sheet,
  SheetTitle,
  SheetHeader,
  SheetContent,
  SheetDescription,
} from "@/components/ui/sheet";

import { z } from "zod";
import { Loader2 } from "lucide-react";
import { insertCategorySchema } from "@/db/schema";

import { useConfirm } from "@/hooks/use-confirm";
import { useGetCategory } from "@/features/categories/api/use-get-category";
import { CategoryForm } from "@/features/categories/components/category-form";

import { useEditCategory } from "@/features/categories/api/use-edit-category";
import { useOpenCategory } from "@/features/categories/hooks/use-open-category";
import { useDeleteCategory } from "@/features/categories/api/use-delete-category";

const formSchema = insertCategorySchema.pick({ name: true });

type FormValues = z.infer<typeof formSchema>;

export const EditCategorySheet = () => {
  const { isOpen, onClose, id } = useOpenCategory();

  const [ConfirmDialog, confirm] = useConfirm({
    title: "Você tem certeza?",
    message: "Esta ação não pode ser desfeita.",
  });

  const { data, isLoading } = useGetCategory(id);
  const { mutate: editMutate, isPending: isEditPending } = useEditCategory(id);
  const { mutate: deleteMutate, isPending: isDeletePending } =
    useDeleteCategory(id);

  const onSubmit = (values: FormValues) => {
    editMutate(values, {
      onSuccess: () => onClose(),
    });
  };

  const handleDelete = async () => {
    const ok = await confirm();
    if (ok) {
      deleteMutate(undefined, {
        onSuccess: () => onClose(),
      });
    }
  };

  const isPending = isEditPending || isDeletePending;
  const defaultValues = { name: data ? data.name : "" };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>Editar categoria</SheetTitle>
          </SheetHeader>
          <SheetDescription>
            Edite os dados de uma categoria existente.
          </SheetDescription>
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="size-4 text-muted-foreground animate-spin" />
            </div>
          ) : (
            <CategoryForm
              id={id}
              onSubmit={onSubmit}
              disabled={isPending}
              onDelete={handleDelete}
              defaultValues={defaultValues}
            />
          )}
        </SheetContent>
      </Sheet>
      <ConfirmDialog />
    </>
  );
};
