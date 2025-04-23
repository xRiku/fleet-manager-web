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
import { use, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { createVehicleRequest } from "@/actions/actions";
import { useModalStore } from "@/stores/modal-store";

const requestVehicleSchema = z
  .object({
    originId: z.string(),
    destinyId: z.string(),
    vehicleId: z.string(),
  })
  .refine((ctx) => ctx.destinyId !== ctx.originId, {
    message: "Destino não pode ser igual a origem",
    path: ["destinyId"],
  })
  .refine((ctx) => ctx.vehicleId !== "", {
    message: "Selecione um veículo",
    path: ["vehicleId"],
  });

type RequestVehicleSchema = z.infer<typeof requestVehicleSchema>;

export function RequestVehicleForm({
  branchesPromise,
}: {
  branchesPromise: Promise<Branch[]>;
}) {
  const branches = use(branchesPromise);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [_, setIsLoadingVehicles] = useState(false);
  const { toggleIsRequestVehicleModalOpened } = useModalStore();

  const form = useForm<RequestVehicleSchema>({
    resolver: zodResolver(requestVehicleSchema),
    defaultValues: {
      originId: branches[0].id,
      destinyId: branches[1].id,
      vehicleId: "",
    },
  });

  const originId = form.watch("originId");

  useEffect(() => {
    if (!originId) return;

    async function asyncFunction() {
      setIsLoadingVehicles(true);
      try {
        const fetchedVehicles = await fetch(`/api/vehicles/${originId}`);
        const parsedFetchedVehicles = await fetchedVehicles.json();
        setVehicles(parsedFetchedVehicles);
        form.setValue("vehicleId", parsedFetchedVehicles[0]?.id || "");
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoadingVehicles(false);
      }
    }

    asyncFunction();
  }, [form, originId]);

  const onSubmit = async (data: RequestVehicleSchema) => {
    try {
      await createVehicleRequest(data);
      toggleIsRequestVehicleModalOpened();
      form.reset();
    } catch (error) {
      console.error(error);
    }
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
            name="vehicleId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Veículo</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
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
