import { createHmac, randomBytes } from "node:crypto";

export function hashPassword(password: string): { salt: string; hash: string } {
  const salt = randomBytes(32).toString("hex");
  const hash = createHmac("sha256", salt).update(password).digest("hex");
  return { salt, hash };
}
export function checkHashPassword(
  password: string,
  salt: string,
): { hash: string } {
  const hash = createHmac("sha256", salt).update(password).digest("hex");
  return { hash };
}
