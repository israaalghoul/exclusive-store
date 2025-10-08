// jwtClient.ts
import { SignJWT } from "jose";

const enc = new TextEncoder();

/** Convert secret to bytes and validate it's non-empty */
function toKeyBytes(secret) {
  const bytes = typeof secret === "string" ? enc.encode(secret) : secret;
  if (!(bytes instanceof Uint8Array) || bytes.length === 0) {
    throw new Error("HS256 secret is empty or invalid. Provide a non-empty secret.");
  }
  return bytes;
}

/**
 * Sign a JWT in the browser using HS256.
 * ⚠️ For demos only — do NOT ship real secrets to clients in production.
 */
export async function generateJWT(
  payload,
  secret = import.meta.env.VITE_JWT_SECRET,
  exp = "15m"
) {
  const key = toKeyBytes(secret ?? 'randorm-secret');
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setIssuedAt()
    .setExpirationTime(exp)
    .sign(key);
}
