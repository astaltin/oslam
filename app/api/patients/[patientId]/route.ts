import { prisma } from "@/lib/prisma";
import { isPrismaError } from "@/util/isPrismaError";

const isDevelopment = process.env.NODE_ENV === "development";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ patientId: string }> },
) {
  const patientId = Number((await params).patientId);
  const data = await request.json();

  try {
    const updatedData = await prisma.patient.update({
      data,
      where: { patientId },
      select: {
        patientId: true,
        name: true,
        gender: true,
        age: true,
        address: true,
      },
    });

    return Response.json(updatedData);
  } catch (error) {
    if (isPrismaError(error)) {
      if (isDevelopment) {
        console.error(
          "A prisma error occured while trying to update a patient data:",
          error,
        );
      }

      return new Response(null, { status: 500 });
    }

    throw error;
  }
}
