import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";

import { Select } from "@/components/select";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { useCreateAccount } from "@/features/accounts/api/use-create-account";

import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogFooter,
  DialogContent,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";

type ConfirmReturn = [() => JSX.Element, () => Promise<unknown>];

export const useSelectAccount = (): ConfirmReturn => {
  const selectValue = useRef<string>();
  const { data, isLoading } = useGetAccounts();
  const { mutate, isPending } = useCreateAccount();

  const [promise, setPromise] = useState<{
    resolve: (value?: string) => void;
  } | null>(null);

  const onCreateAccount = (name: string) => {
    mutate({ name });
  };

  const accountOptions = (data ?? []).map((account) => ({
    label: account.name,
    value: account.id,
  }));

  const confirm = () =>
    new Promise((resolve) => {
      setPromise({ resolve });
    });

  const handleClose = () => {
    setPromise(null);
  };

  const handleConfirm = () => {
    promise?.resolve(selectValue.current);
    handleClose();
  };

  const handleCancel = () => {
    promise?.resolve(undefined);
    handleClose();
  };

  const ConfirmationDialog = () => (
    <Dialog open={!!promise} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Selecione uma conta</DialogTitle>
          <DialogDescription>
            Por favor, selecione uma conta para continuar.
          </DialogDescription>
        </DialogHeader>
        <Select
          options={accountOptions}
          onCreate={onCreateAccount}
          disabled={isPending || isLoading}
          placeholder="Selecione uma conta"
          onChange={(value) => (selectValue.current = value)}
        />
        <DialogFooter>
          <Button onClick={handleCancel} variant="outline">
            Cancelar
          </Button>
          <Button onClick={handleConfirm}>Confirmar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  return [ConfirmationDialog, confirm];
};
