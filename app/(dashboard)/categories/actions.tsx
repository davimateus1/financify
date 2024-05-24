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

import { useOpenCategory } from "@/features/categories/hooks/use-open-category";
import { useDeleteCategory } from "@/features/categories/api/use-delete-category";

type ActionsProps = {
  id: string;
};

export const Actions = ({ id }: ActionsProps) => {
  const { onOpen, onClose } = useOpenCategory();
  const { mutate, isPending } = useDeleteCategory(id);

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
