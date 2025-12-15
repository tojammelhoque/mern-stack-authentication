import { JwtPayload } from "jsonwebtoken";

// Custom JWT Payload interface
export interface JwtPayloadWithId extends JwtPayload {
  id: string;
}

// Type guard to check if payload has id
export function isJwtPayloadWithId(
  payload: string | JwtPayload
): payload is JwtPayloadWithId {
  return typeof payload !== "string" && "id" in payload;
}