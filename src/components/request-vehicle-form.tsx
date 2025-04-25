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
import { Garage, GenericAnswer, Vehicle } from "@/types";
import { use, useEffect, useState } from "react";
import { createVehicleRequest } from "@/actions/actions";
import { useModalStore } from "@/stores/modal-store";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const requestVehicleSchema = z
  .object({
    originId: z.string(),
    destinyId: z.string(),
    vehicleId: z.string(),
    oilLevel: z.string(),
    waterLevel: z.string(),
    tiresStatus: z.string(),
    spareTire: z.string(),
    headlights: z.string(),

    odometer: z.coerce.number(),
    notes: z.string().optional(),
  })
  .refine((ctx) => ctx.vehicleId !== "", {
    message: "Selecione um veículo",
    path: ["vehicleId"],
  });

export type RequestVehicleSchema = z.infer<typeof requestVehicleSchema>;

export function RequestVehicleForm({
  garagesPromise,
}: {
  garagesPromise: Promise<Garage[]>;
}) {
  const garages = use(garagesPromise);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const { toggleIsRequestVehicleModalOpened } = useModalStore();

  const form = useForm<RequestVehicleSchema>({
    resolver: zodResolver(requestVehicleSchema),
    defaultValues: {
      originId: garages[0].id,
      destinyId: garages[1].id,
      vehicleId: "",
      oilLevel: GenericAnswer.NOT_CHECKED,
      waterLevel: GenericAnswer.NOT_CHECKED,
      tiresStatus: GenericAnswer.NOT_CHECKED,
      spareTire: GenericAnswer.NOT_CHECKED,
      headlights: GenericAnswer.NOT_CHECKED,
      notes: "",
      odometer: 0,
    },
  });

  const originId = form.watch("originId");

  useEffect(() => {
    if (!originId) return;

    async function asyncFunction() {
      try {
        const fetchedVehicles = await fetch(
          `/api/vehicles/${originId}?availability=available`
        );
        const parsedFetchedVehicles = await fetchedVehicles.json();
        setVehicles(parsedFetchedVehicles);
        form.setValue("vehicleId", parsedFetchedVehicles[0]?.id || "");
      } catch (error) {
        console.error(error);
      } finally {
      }
    }

    asyncFunction();
  }, [form, originId]);

  const onSubmit = async (data: RequestVehicleSchema) => {
    try {
      await createVehicleRequest(data);
      toggleIsRequestVehicleModalOpened();
      // form.reset();
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
          id="request-vehicle-form"
        >
          <FormField
            control={form.control}
            name="originId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Garagem de origem</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={garages[0].name} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
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
                <FormLabel>Garagem de destino</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={garages[1].name} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
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
            name="oilLevel"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>
                  O nível de óleo do motor está dentro dos padrões?
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value={GenericAnswer.OK} />
                      </FormControl>
                      <FormLabel className="font-normal">Sim</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value={GenericAnswer.NOT_OK} />
                      </FormControl>
                      <FormLabel className="font-normal">Não</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value={GenericAnswer.NOT_CHECKED} />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Não verifiquei
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="waterLevel"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>
                  O nível de água do radiador/reservatório está adequado?
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value={GenericAnswer.OK} />
                      </FormControl>
                      <FormLabel className="font-normal">Sim</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value={GenericAnswer.NOT_OK} />
                      </FormControl>
                      <FormLabel className="font-normal">Não</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value={GenericAnswer.NOT_CHECKED} />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Não verifiquei
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tiresStatus"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>
                  Os pneus estão em bom estado e calibrados?
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value={GenericAnswer.OK} />
                      </FormControl>
                      <FormLabel className="font-normal">Sim</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value={GenericAnswer.NOT_OK} />
                      </FormControl>
                      <FormLabel className="font-normal">Não</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value={GenericAnswer.NOT_CHECKED} />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Não verifiquei
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="spareTire"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>
                  O pneu step está disponível e em bom estado?
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value={GenericAnswer.OK} />
                      </FormControl>
                      <FormLabel className="font-normal">Sim</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value={GenericAnswer.NOT_OK} />
                      </FormControl>
                      <FormLabel className="font-normal">Não</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value={GenericAnswer.NOT_CHECKED} />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Não verifiquei
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="headlights"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>
                  As luzes (faróis, lanternas, pisca, freio) estão funcionando
                  corretamente?
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value={GenericAnswer.OK} />
                      </FormControl>
                      <FormLabel className="font-normal">Sim</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value={GenericAnswer.NOT_OK} />
                      </FormControl>
                      <FormLabel className="font-normal">Não</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value={GenericAnswer.NOT_CHECKED} />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Não verifiquei
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
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
    </div>
  );
}
