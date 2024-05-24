import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { TrashIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  name: z.string().min(1, { message: "O nome é obrigatório" }).trim(),
});

type FormValues = z.infer<typeof formSchema>;

type CategoryFormProps = {
  id?: string;
  disabled?: boolean;
  onDelete?: () => void;
  defaultValues?: FormValues;
  onSubmit: (values: FormValues) => void;
};

export const CategoryForm = ({
  id,
  onSubmit,
  disabled,
  onDelete,
  defaultValues,
}: CategoryFormProps) => {
  const form = useForm<FormValues>({
    defaultValues,
    resolver: zodResolver(formSchema),
  });

  const handleSubmit = (values: FormValues) => {
    onSubmit(values);
  };

  const handleDelete = () => {
    onDelete?.();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-4 pt-4"
      >
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input
                  disabled={disabled}
                  placeholder="ex: Alimentação, Transporte, Saúde"
                  {...field}
                />
              </FormControl>
              <FormMessage>{form.formState.errors.name?.message}</FormMessage>
            </FormItem>
          )}
        />
        <Button className="w-full" disabled={disabled}>
          {id ? "Salvar alterações" : "Criar categoria"}
        </Button>
        {!!id && (
          <Button
            size="icon"
            type="button"
            variant="outline"
            className="w-full"
            disabled={disabled}
            onClick={handleDelete}
          >
            <TrashIcon className="size-4 mr-2" />
            Apagar categoria
          </Button>
        )}
      </form>
    </Form>
  );
};
