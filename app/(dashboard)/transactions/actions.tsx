"use client";

import { Button } from "@/components/ui/button";
import { useConfirm } from "@/hooks/use-confirm";
import { Edit, MoreHorizontal, TrashIcon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";

import { useOpenTransaction } from "@/features/transactions/hooks/use-open-transaction";
import { useDeleteTransaction } from "@/features/transactions/api/use-delete-transaction";

type ActionsProps = {
  id: string;
};

export const Actions = ({ id }: ActionsProps) => {
  const { onOpen, onClose } = useOpenTransaction();
  const { mutate, isPending } = useDeleteTransaction(id);

  const [ConfirmDialog, confirm] = useConfirm({
    title: "Você tem certeza?",
    message: "Esta ação não pode ser desfeita.",
  });

  const handleDelete = async () => {
    const ok = await confirm();
    if (ok) {
      mutate(undefined, {
        onSuccess: () => onClose(),
      });
    }
  };

  const handleOpen = () => {
    onOpen(id);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="size-8 p-0">
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem disabled={isPending} onClick={handleOpen}>
            <Edit className="mr-2 size-4" />
            Editar
          </DropdownMenuItem>
          <DropdownMenuItem disabled={isPending} onClick={handleDelete}>
            <TrashIcon className="mr-2 size-4" />
            Excluir
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ConfirmDialog />
    </>
  );
};
