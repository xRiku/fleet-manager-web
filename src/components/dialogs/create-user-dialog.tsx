"use client";

import { useModalStore } from "@/stores/modal-store";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Role } from "@/types";
import { createUser } from "@/actions/actions";
import { formatCPF, isValidCPF } from "@/lib/utils";

const createUserSchema = z.object({
  name: z.string().trim().min(2, {
    message: "Nome deve ser maior que 2 caracteres",
  }),
  documentNumber: z
    .string()
    .refine((val) => val.replace(/\D/g, "").length === 11, {
      message: "CPF deve conter 11 dígitos",
    })
    .refine((val) => isValidCPF(val), {
      message: "CPF inválido",
    }),
  role: z.string().refine((role) => role !== "", {
    message: "Escolha um cargo",
  }),
});

type CreateUserSchema = z.infer<typeof createUserSchema>;

export function CreateUserDialog() {
  const { toggleIsUserModalOpened, isUserModalOpened } = useModalStore();

  const form = useForm<CreateUserSchema>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      name: "",
      role: "",
      documentNumber: "",
    },
  });

  const onSubmit = (data: CreateUserSchema) => {
    console.log(data);
    try {
      createUser(data);
      toggleIsUserModalOpened();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={isUserModalOpened} onOpenChange={toggleIsUserModalOpened}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Criar Veículo</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            id="create-user-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome completo</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="documentNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CPF</FormLabel>
                  <FormControl>
                    <Input
                      value={formatCPF(field.value)}
                      onChange={(e) => {
                        if (e.target.value.length < 15) {
                          field.onChange(e.target.value);
                        }
                      }}
                      placeholder="000.000.000-00"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cargo</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue {...field} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={Role.USER}>Motorista</SelectItem>
                      <SelectItem value={Role.ADMIN}>Gerente</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <Button form="create-user-form" type="submit">
            Criar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
