import { z } from 'zod';
import { Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useForm, Controller } from 'react-hook-form';
import { OrderSchema } from '@/schemas';
import style from '@/components/navbar.module.css';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';

type FormValues = z.input<typeof OrderSchema>;

type Props = {
  id?: string;
  defaultValues?: FormValues;
  onSubmit: (data: FormValues) => void;
  onDelete?: () => void;
  disabled?: boolean;
};

export const OrderForm = ({ id, defaultValues, onSubmit, onDelete, disabled }: Props) => {
  const form = useForm<FormValues>({
    defaultValues,
  });

  const handleSubmit = (values: FormValues) => {
    onSubmit(values);
  };

  const handleDelete = () => {
    onDelete?.();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 pt-4 z-50">
        <FormField
          name="status"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estado</FormLabel>
              <FormControl>
                <select
                  value={field.value}
                  onChange={field.onChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="RECEIVED">Recibido</option>
                  <option value="SENDING">Enviado</option>
                  <option value="PENDING">Pendiente</option>
                  <option value="CANCELLED">Cancelado</option>
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className={`${style.primaryBtn} w-full`} disabled={disabled}>
          Guardar cambios
        </Button>
      </form>
    </Form>
  );
};
