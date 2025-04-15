import { getVehiclesForBranch } from "@/lib/server-utils";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: Promise<{
      branchId: string;
    }>;
  }
) {
  const branchId = (await params).branchId;
  if (!branchId || typeof branchId !== "string") {
    return new Response("Invalid branch ID", {
      status: 400,
    });
  }

  try {
    const vehicles = await getVehiclesForBranch(branchId);
    return Response.json(vehicles);
  } catch (error) {
    console.error(error);
    return new Response("Failed to fetch vehicles", {
      status: 500,
    });
  }
}
