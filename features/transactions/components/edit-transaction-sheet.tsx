import {
  Sheet,
  SheetTitle,
  SheetHeader,
  SheetContent,
  SheetDescription,
} from "@/components/ui/sheet";

import { z } from "zod";

import { Loader2 } from "lucide-react";
import { useConfirm } from "@/hooks/use-confirm";
import { insertTransactionSchema } from "@/db/schema";

import { useCreateCategory } from "@/features/categories/api/use-create-category";
import { useGetTransaction } from "@/features/transactions/api/use-get-transaction";
import { TransactionForm } from "@/features/transactions/components/transaction-form";

import { useEditTransaction } from "@/features/transactions/api/use-edit-transaction";
import { useOpenTransaction } from "@/features/transactions/hooks/use-open-transaction";
import { useDeleteTransaction } from "@/features/transactions/api/use-delete-transaction";

import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { useCreateAccount } from "@/features/accounts/api/use-create-account";
import { useGetCategories } from "@/features/categories/api/use-get-categories";

const formSchema = insertTransactionSchema.omit({ id: true });

type FormValues = z.infer<typeof formSchema>;

export const EditTransactionSheet = () => {
  const { isOpen, onClose, id } = useOpenTransaction();

  const [ConfirmDialog, confirm] = useConfirm({
    title: "Você tem certeza?",
    message: "Esta ação não pode ser desfeita.",
  });

  const { mutate: editMutate, isPending: isEditPending } =
    useEditTransaction(id);
  const { mutate: deleteMutate, isPending: isDeletePending } =
    useDeleteTransaction(id);

  const { mutate: accountMutate, isPending: pendingAccount } =
    useCreateAccount();
  const { mutate: categoryMutate, isPending: pendingCategory } =
    useCreateCategory();

  const { data: accounts } = useGetAccounts();
  const { data: categories } = useGetCategories();
  const { data, isLoading } = useGetTransaction(id);

  const onCreateAccount = (name: string) => accountMutate({ name });

  const onCreateCategory = (name: string) => categoryMutate({ name });

  const categoryOptions = (categories || []).map((category) => ({
    label: category.name,
    value: category.id,
  }));

  const accountOptions = (accounts || []).map((account) => ({
    label: account.name,
    value: account.id,
  }));

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

  const isPending =
    isEditPending ||
    isDeletePending ||
    pendingAccount ||
    pendingCategory ||
    isLoading;

  const defaultValues = data
    ? {
        accountId: data.accountId,
        categoryId: data.categoryId,
        amount: data.amount.toString(),
        date: data.date ? new Date(data.date) : new Date(),
        payee: data.payee,
        notes: data.notes,
      }
    : {
        accountId: "",
        categoryId: "",
        amount: "",
        date: new Date(),
        payee: "",
        notes: "",
      };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>Editar transação</SheetTitle>
          </SheetHeader>
          <SheetDescription>
            Edite os detalhes de uma transação existente.
          </SheetDescription>
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="size-4 text-muted-foreground animate-spin" />
            </div>
          ) : (
            <TransactionForm
              id={id}
              onSubmit={onSubmit}
              disabled={isPending}
              onDelete={handleDelete}
              defaultValues={defaultValues}
              accountOptions={accountOptions}
              categoryOptions={categoryOptions}
              onCreateAccount={onCreateAccount}
              onCreateCategory={onCreateCategory}
            />
          )}
        </SheetContent>
      </Sheet>
      <ConfirmDialog />
    </>
  );
};
