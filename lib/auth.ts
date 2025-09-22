// lib/auth.ts
import { cookies } from "next/headers";
import { jwtVerify, JWTPayload } from "jose";

const AUTH_COOKIE = "auth-token";
const SECRET_KEY = "122ewfpeo2we12";

export interface UserPayload extends JWTPayload {
  id?: number;
  email?: string;
  name?: string;
}

export async function getUser(): Promise<UserPayload | null> {
  const cookieStore = cookies();
  const token = (await cookieStore).get(AUTH_COOKIE)?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(SECRET_KEY));
    return payload as UserPayload;
  } catch {
    return null;
  }
}
