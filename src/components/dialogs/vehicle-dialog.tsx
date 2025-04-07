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

const vehicleSchema = z.object({
  plate: z.string(),
  odometer: z.coerce.number(),
  branch: z.string(),
});

type VehicleSchema = z.infer<typeof vehicleSchema>;

export function VehicleDialog() {
  const { isVehicleModalOpened, toggleIsVehicleModalOpened } = useModalStore();

  const form = useForm<VehicleSchema>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: {
      branch: "",
      plate: "",
      odometer: 0,
    },
  });

  // const { handleSubmit } = methods;

  const onSubmit = (data: VehicleSchema) => {
    console.log(data);

    toggleIsVehicleModalOpened();
  };

  // const handleClick = () => {
  //   branches.push({
  //     id: branches.length + 1 + "",
  //     name: "Caetité" + branches.length + 1,
  //   });
  //   toggleIsBranchModalOpened();
  // };

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
              name="odometer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Odômetro</FormLabel>
                  <FormControl>
                    <Input inputMode="numeric" placeholder="2500" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="branch"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Filial</FormLabel>
                  <FormControl>
                    <Input placeholder="Caetité" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        {/* <div className="flex flex-col py-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name" className="text-right">
              Nome
            </Label>
            <Input id="name" placeholder="Caetité" className="col-span-3" />
          </div>
        </div> */}
        <DialogFooter>
          <Button form="vehicle-form" type="submit">
            Criar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
