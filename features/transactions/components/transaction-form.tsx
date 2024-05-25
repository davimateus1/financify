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
import { Option, Select } from "@/components/select";

import { Button } from "@/components/ui/button";
import { insertTransactionSchema } from "@/db/schema";
import { DatePicker } from "@/components/date-picker";

const formSchema = z.object({
  payee: z.string(),
  amount: z.string(),
  date: z.coerce.date(),
  accountId: z.string(),
  notes: z.string().nullable().optional(),
  categoryId: z.string().nullable().optional(),
});

const apiSchema = insertTransactionSchema.omit({
  id: true,
});

type FormValues = z.infer<typeof formSchema>;
type ApiFormValues = z.infer<typeof apiSchema>;

type AccountFormProps = {
  id?: string;
  disabled?: boolean;
  onDelete?: () => void;
  accountOptions: Option[];
  categoryOptions: Option[];
  defaultValues?: FormValues;
  onCreateAccount: (name: string) => void;
  onCreateCategory: (name: string) => void;
  onSubmit: (values: ApiFormValues) => void;
};

export const TransactionForm = ({
  id,
  onSubmit,
  disabled,
  onDelete,
  defaultValues,
  accountOptions,
  categoryOptions,
  onCreateAccount,
  onCreateCategory,
}: AccountFormProps) => {
  const form = useForm<FormValues>({
    defaultValues,
    resolver: zodResolver(formSchema),
  });

  const handleSubmit = (values: FormValues) => {
    console.log({ values });
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
          name="date"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Data</FormLabel>
              <FormControl>
                <DatePicker
                  disabled={disabled}
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage>{form.formState.errors.date?.message}</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          name="accountId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Conta</FormLabel>
              <FormControl>
                <Select
                  disabled={disabled}
                  value={field.value}
                  options={accountOptions}
                  onChange={field.onChange}
                  onCreate={onCreateAccount}
                  placeholder="Selecione uma conta"
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.accountId?.message}
              </FormMessage>
            </FormItem>
          )}
        />
        <FormField
          name="categoryId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categoria</FormLabel>
              <FormControl>
                <Select
                  disabled={disabled}
                  value={field.value}
                  options={categoryOptions}
                  onChange={field.onChange}
                  onCreate={onCreateCategory}
                  placeholder="Selecione uma categoria"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button className="w-full" disabled={disabled}>
          {id ? "Salvar alterações" : "Criar conta"}
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
            Apagar conta
          </Button>
        )}
      </form>
    </Form>
  );
};
