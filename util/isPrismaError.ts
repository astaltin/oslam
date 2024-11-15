import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
  PrismaClientRustPanicError,
  PrismaClientUnknownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";

export function isPrismaError(value) {
  return [
    PrismaClientValidationError,
    PrismaClientInitializationError,
    PrismaClientRustPanicError,
    PrismaClientKnownRequestError,
    PrismaClientUnknownRequestError,
  ].find((error) => value instanceof error);
}
