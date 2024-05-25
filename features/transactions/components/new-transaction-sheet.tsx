import {
  Sheet,
  SheetTitle,
  SheetHeader,
  SheetContent,
  SheetDescription,
} from "@/components/ui/sheet";

import { z } from "zod";
import { Loader2 } from "lucide-react";
import { insertTransactionSchema } from "@/db/schema";

import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { useGetCategories } from "@/features/categories/api/use-get-categories";
import { useCreateCategory } from "@/features/categories/api/use-create-category";

import { useCreateAccount } from "@/features/accounts/api/use-create-account";
import { TransactionForm } from "@/features/transactions/components/transaction-form";
import { useNewTransaction } from "@/features/transactions/hooks/use-new-transaction";
import { useCreateTransaction } from "@/features/transactions/api/use-create-transaction";

const formSchema = insertTransactionSchema.omit({
  id: true,
});

type FormValues = z.infer<typeof formSchema>;

export const NewTransactionSheet = () => {
  const { isOpen, onClose } = useNewTransaction();
  const { data: accounts, isLoading: loadingAccounts } = useGetAccounts();
  const { data: categories, isLoading: loadingCategories } = useGetCategories();

  const { mutate: accountMutate, isPending: pendingAccount } =
    useCreateAccount();
  const { mutate: transactionMutate, isPending: pendingTransaction } =
    useCreateTransaction();
  const { mutate: categoryMutate, isPending: pendingCategory } =
    useCreateCategory();

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
    transactionMutate(values);
  };

  const isPending = pendingTransaction || pendingAccount || pendingCategory;
  const isLoading = loadingAccounts || loadingCategories;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>Nova transação</SheetTitle>
        </SheetHeader>
        <SheetDescription>
          Crie uma nova transação para registrar um movimento financeiro.
        </SheetDescription>
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="size-4 text-slate-300 animate-spin" />
          </div>
        ) : (
          <TransactionForm
            onSubmit={onSubmit}
            disabled={isPending}
            accountOptions={accountOptions}
            categoryOptions={categoryOptions}
            onCreateAccount={onCreateAccount}
            onCreateCategory={onCreateCategory}
          />
        )}
      </SheetContent>
    </Sheet>
  );
};
