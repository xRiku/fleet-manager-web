import { getVehiclesForGarage } from "@/lib/server-utils";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: Promise<{
      garageId: string;
    }>;
  }
) {
  const garageId = (await params).garageId;
  if (!garageId || typeof garageId !== "string") {
    return new Response("Invalid garage ID", {
      status: 400,
    });
  }

  try {
    const vehicles = await getVehiclesForGarage(garageId);
    return Response.json(vehicles);
  } catch (error) {
    console.error(error);
    return new Response("Failed to fetch vehicles", {
      status: 500,
    });
  }
}
