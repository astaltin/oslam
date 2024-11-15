import { prisma } from "@/lib/prisma";
import { isPrismaError } from "@/util/isPrismaError";

const isDevelopment = process.env.NODE_ENV === "development";

export async function POST(request: Request) {
  const data = await request.json();

  try {
    const newPatient = await prisma.patient.create({
      data,
      select: {
        patientId: true,
        name: true,
        gender: true,
        age: true,
        address: true,
      },
    });

    return Response.json(newPatient, { status: 201 });
  } catch (error) {
    if (isPrismaError(error)) {
      if (isDevelopment) {
        console.error(
          "A prisma error occured while creating a patient:",
          error,
        );
      }

      return new Response(null, { status: 500 });
    }

    throw error;
  }
}

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
