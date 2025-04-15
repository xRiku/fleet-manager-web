"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Branch, Vehicle } from "@/types";
import { use } from "react";
import { Button } from "./ui/button";

const requestVehicleSchema = z
  .object({
    originId: z.string(),
    destinyId: z.string(),
    vehicleId: z.string(),
  })
  .refine((ctx) => ctx.destinyId !== ctx.originId, {
    message: "Destino não pode ser igual a origem",
    path: ["destinyId"],
  });

type RequestVehicleSchema = z.infer<typeof requestVehicleSchema>;

export function RequestVehicleForm({
  branchesPromise,
  vehiclesPromise,
}: {
  branchesPromise: Promise<Branch[]>;
  vehiclesPromise: Promise<Vehicle[]>;
}) {
  const branches = use(branchesPromise);
  const vehicles = use(vehiclesPromise);

  const form = useForm<RequestVehicleSchema>({
    resolver: zodResolver(requestVehicleSchema),
    defaultValues: {
      originId: branches[0].id,
      destinyId: branches[1].id,
      vehicleId: vehicles[0].id,
    },
  });

  const onSubmit = (data: RequestVehicleSchema) => {
    console.log(data);
  };

  return (
    <div className="px-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="vehicleId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Veículo</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={`${vehicles[0].brand} ${vehicles[0].model} - ${vehicles[0].color}`}
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {vehicles.map((vehicle) => {
                      return (
                        <SelectItem key={vehicle.id} value={vehicle.id}>
                          {`${vehicle.brand} ${vehicle.model} - ${vehicle.color}`}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="originId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Filial de origem</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={branches[0].name} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {branches.map((branch) => {
                      return (
                        <SelectItem key={branch.id} value={branch.id}>
                          {branch.name}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="destinyId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Filial de destino</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={branches[1].name} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {branches.map((branch) => {
                      return (
                        <SelectItem key={branch.id} value={branch.id}>
                          {branch.name}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Solicitar</Button>
        </form>
      </Form>
    </div>
  );
}
