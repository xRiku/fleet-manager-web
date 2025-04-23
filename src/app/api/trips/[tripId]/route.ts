import { getTripById } from "@/lib/server-utils";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: Promise<{
      tripId: string;
    }>;
  }
) {
  const tripId = (await params).tripId;
  if (!tripId || typeof tripId !== "string") {
    return new Response("Invalid branch ID", {
      status: 400,
    });
  }

  try {
    const vehicles = await getTripById(tripId);
    return Response.json(vehicles);
  } catch (error) {
    console.error(error);
    return new Response("Failed to fetch vehicles", {
      status: 500,
    });
  }
}
