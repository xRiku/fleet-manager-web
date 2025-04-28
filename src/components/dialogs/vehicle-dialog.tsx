"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useModalStore } from "@/stores/modal-store";
import { Button } from "../ui/button";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Garage } from "@/types";
import { use } from "react";
import { createVehicle } from "@/actions/actions";
import { capitalize } from "@/lib/utils";

const vehicleSchema = z.object({
  plate: z.string().trim(),
  odometer: z.coerce.number({
    invalid_type_error: "Informe a quilometragem",
  }).positive("A quilometragem deve ser maior que zero"),
  color: z.string().trim(),
  garageId: z.string().trim(),
  model: z.string().trim(),
  brand: z.string().trim(),
  year: z.coerce.number().positive(),
});

type VehicleSchema = z.infer<typeof vehicleSchema>;

export function VehicleDialog({
  garagesPromise,
}: {
  garagesPromise: Promise<Garage[]>;
}) {
  const { isVehicleModalOpened, toggleIsVehicleModalOpened } = useModalStore();
  const garages = use(garagesPromise);

  const form = useForm<VehicleSchema>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: {
      plate: "",
      model: "",
      color: "",
      year: undefined,
      brand: "",
      odometer: undefined,
      garageId: "",
    },
  });

  // const { handleSubmit } = methods;

  const onSubmit = (data: VehicleSchema) => {
    try {
      createVehicle({
        ...data,
        color: capitalize(data.color),
        brand: capitalize(data.brand),
        model: capitalize(data.model),
      });
      toggleIsVehicleModalOpened();
      form.reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog
      open={isVehicleModalOpened}
      onOpenChange={toggleIsVehicleModalOpened}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Criar Veículo</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            id="vehicle-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="brand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fabricante</FormLabel>
                  <FormControl>
                    <Input placeholder="Fabricante" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="model"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Modelo</FormLabel>
                  <FormControl>
                    <Input placeholder="Modelo" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cor</FormLabel>
                  <FormControl>
                    <Input placeholder="Cor" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="plate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Placa</FormLabel>
                  <FormControl>
                    <Input placeholder="XXXXXXX" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ano</FormLabel>
                  <FormControl>
                    <Input
                      inputMode="numeric"
                      placeholder="2023"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="odometer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quilometragem</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      type="number"
                      placeholder="Quilometragem do veículo" 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="garageId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Garagem</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma garagem" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {garages.length === 0 && (
                        <SelectItem value="none" disabled>
                          Nenhuma garagem cadastrada
                        </SelectItem>
                      )}
                      {garages.map((garage) => {
                        return (
                          <SelectItem key={garage.id} value={garage.id}>
                            {garage.name}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <Button form="vehicle-form" type="submit">
            Criar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
