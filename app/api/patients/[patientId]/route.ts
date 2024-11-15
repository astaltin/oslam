import { prisma } from "@/lib/prisma";
import { isPrismaError } from "@/util/isPrismaError";

type Params = { params: Promise<{ patientId: string }> };

const isDevelopment = process.env.NODE_ENV === "development";

export async function PATCH(request: Request, { params }: Params) {
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

export async function DELETE(request: Request, { params }: Params) {
  const patientId = Number((await params).patientId);

  try {
    await prisma.patient.delete({ where: { patientId } });

    return new Response(null, { status: 204 });
  } catch (error) {
    if (isPrismaError(error)) {
      if (isDevelopment) {
        console.error(
          "A prisma error occured while trying to delete a patient data:",
          error,
        );
      }

      return new Response(null, { status: 500 });
    }
  }
}
