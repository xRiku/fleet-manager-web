'use client';

import { useEffect, useState } from "react";
import { Branch, Vehicle } from "@/types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "./ui/badge";
import { Garage } from "@phosphor-icons/react";
export default function BranchCard({branch}: {branch: Branch}) {
  const [availableVehicles, setAvailableVehicles] = useState<Vehicle[]>([]);
  const [unavailableVehicles, setUnavailableVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
      async function asyncFunction() {
      try {
        const fetchedVehicles = await fetch(`/api/vehicles/${branch.id}`);
        const parsedFetchedVehicles = await fetchedVehicles.json();
        setAvailableVehicles(parsedFetchedVehicles.filter((vehicle: Vehicle) => vehicle.availability === "available"));
        setUnavailableVehicles(parsedFetchedVehicles.filter((vehicle: Vehicle) => vehicle.availability !== "available"));
      } catch (error) {
        console.error(error);
      }
    }
    asyncFunction();
  }, [branch]);


  return (
    <Card className="w-64 hover:shadow-lg transition">
      <CardHeader className="flex items-center gap-2">
        <Garage weight="bold" size={20}/>
        <CardTitle>{branch.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <Badge variant="success" className="min-w-[180px] justify-between">Veículos disponíveis: <strong>{availableVehicles.length}</strong></Badge>
        <Badge variant="destructive" className="min-w-[180px] justify-between">Veículos indisponíveis: <strong>{unavailableVehicles.length}</strong></Badge>
      </CardContent>
    </Card>
  );

}