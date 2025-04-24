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
    return new Response("Invalid trip ID", {
      status: 400,
    });
  }

  try {
    const trips = await getTripById(tripId);
    return Response.json(trips);
  } catch (error) {
    console.error(error);
    return new Response("Failed to fetch trip", {
      status: 500,
    });
  }
}
