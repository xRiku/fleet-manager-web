import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { finishTrip } from "@/actions/actions";
import { useModalStore } from "@/stores/modal-store";

const completeTripSchema = z.object({
  odometer: z.coerce.number({
    invalid_type_error: "Informe a quilometragem",
  }).positive("A quilometragem deve ser maior que zero"),
  notes: z.string().optional(),
});

export type CompleteTripSchema = z.infer<typeof completeTripSchema>;

export function CompleteTripConfirmationForm() {
  const { toggleIsCompleteTripConfirmationModalOpened } = useModalStore();

  const form = useForm<CompleteTripSchema>({
    defaultValues: {
      notes: "",
      odometer: undefined,  // Deixa o campo vazio inicialmente
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
              <Input 
                {...field} 
                type="number" 
                placeholder="Quilometragem do veículo" 
              />
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
              <Textarea {...field} placeholder="Descreva aqui, se houver..." />
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
