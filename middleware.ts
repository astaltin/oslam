import {
  type MiddlewareConfig,
  type NextRequest,
  NextResponse,
} from "next/server";
import { ZodError } from "zod";
import { patientSchema } from "./lib/zod/schema";

const isDevelopment = process.env.NODE_ENV === "development";

export async function middleware(req: NextRequest) {
  try {
    if (req.nextUrl.pathname.startsWith("/api/patients")) {
      if (req.method === "POST") {
        const data = await req.json();
        // validates the patient data. Throws an error if fails
        patientSchema.parse(data);

        return NextResponse.next();
      }
    }

    return NextResponse.next();
  } catch (error) {
    if (error instanceof ZodError) {
      if (isDevelopment) {
        console.error(
          "A zod validation error occured while processing patient data:",
          error,
        );
      }

      return new Response(error.message, {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    throw error;
  }
}

export const config: MiddlewareConfig = {
  matcher: ["/api/patients"],
};
