import { prisma } from "@/lib/prisma";
import { isPrismaError } from "@/util/isPrismaError";

const isDevelopment = process.env.NODE_ENV === "development";

export async function GET() {
  try {
    const patients = await prisma.patient.findMany({
      select: {
        patientId: true,
        name: true,
        gender: true,
        age: true,
        address: true,
      },
    });

    return Response.json(patients);
  } catch (error) {
    if (isPrismaError(error)) {
      if (isDevelopment) {
        console.error(
          "A prisma error occured while fetching patients data:",
          error,
        );
      }

      return new Response(null, { status: 500 });
    }

    throw error;
  }
}
