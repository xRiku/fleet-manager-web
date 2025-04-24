import { getVehiclesForGarage } from "@/lib/server-utils";
import { Availability } from "@/types";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{
      garageId: string;
    }>;
  }
) {

  const searchParams = request.nextUrl.searchParams
  const availability = searchParams.get('availability')
  console.log(availability)
  const garageId = (await params).garageId;
  if (!garageId || typeof garageId !== "string") {
    return new Response("Invalid garage ID", {
      status: 400,
    });
  }

  try {
    const vehicles = await getVehiclesForGarage(garageId, availability as Availability ?? undefined);
    return Response.json(vehicles);
  } catch (error) {
    console.error(error);
    return new Response("Failed to fetch vehicles", {
      status: 500,
    });
  }
}
