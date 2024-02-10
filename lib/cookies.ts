"use server";
import { cookies } from "next/headers";

export async function setCookie(key: string, value: any) {
  const oneDay = 24 * 60 * 60 * 1000;
  cookies().set(key, value, { expires: Date.now() - oneDay });
}
export async function getCookie(key: string) {
  cookies().get(key);
}

export async function removeCookie(key: string) {
  cookies().delete(key);
}
