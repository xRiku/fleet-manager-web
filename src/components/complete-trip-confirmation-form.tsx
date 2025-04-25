import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { finishTrip } from "@/actions/actions";
import { useModalStore } from "@/stores/modal-store";

const completeTripSchema = z.object({
  odometer: z.coerce.number(),
  notes: z.string().optional(),
});

export type CompleteTripSchema = z.infer<typeof completeTripSchema>;

export function CompleteTripConfirmationForm() {
  const { toggleIsCompleteTripConfirmationModalOpened } = useModalStore();

  const form = useForm<CompleteTripSchema>({
    defaultValues: {
      notes: "",
      odometer: 0,
    },
    resolver: zodResolver(completeTripSchema),
  });

  const onSubmit = async (data: CompleteTripSchema) => {
    await finishTrip(data);

    toggleIsCompleteTripConfirmationModalOpened();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 px-4 mb-4"
        id="complete-trip-form"
      >
        <FormField
          control={form.control}
          name="odometer"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quilometragem</FormLabel>
              <Input {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Houve alguma avaria ou problema durante a retirada do veículo
                (opcional)
              </FormLabel>
              <Textarea {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
