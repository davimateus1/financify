import {
  Sheet,
  SheetTitle,
  SheetHeader,
  SheetContent,
  SheetDescription,
} from "@/components/ui/sheet";

import { z } from "zod";
import { Loader2 } from "lucide-react";
import { insertAccountSchema } from "@/db/schema";

import { useConfirm } from "@/hooks/use-confirm";
import { useGetAccount } from "@/features/accounts/api/use-get-account";
import { AccountForm } from "@/features/accounts/components/account-form";

import { useEditAccount } from "@/features/accounts/api/use-edit-account";
import { useOpenAccount } from "@/features/accounts/hooks/use-open-account";
import { useDeleteAccount } from "@/features/accounts/api/use-delete-account";

const formSchema = insertAccountSchema.pick({ name: true });

type FormValues = z.infer<typeof formSchema>;

export const EditTransactionSheet = () => {
  const { isOpen, onClose, id } = useOpenAccount();

  const [ConfirmDialog, confirm] = useConfirm({
    title: "Você tem certeza?",
    message: "Esta ação não pode ser desfeita.",
  });

  const { data, isLoading } = useGetAccount(id);
  const { mutate: editMutate, isPending: isEditPending } = useEditAccount(id);
  const { mutate: deleteMutate, isPending: isDeletePending } =
    useDeleteAccount(id);

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
            <SheetTitle>Editar conta</SheetTitle>
          </SheetHeader>
          <SheetDescription>
            Edite os dados de uma conta existente.
          </SheetDescription>
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="size-4 text-muted-foreground animate-spin" />
            </div>
          ) : (
            <AccountForm
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
