import "server-only";
import { db } from "../lib/db";
import { images } from "../lib/db/schema";
import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import analyticsServerClient from "./analytics";
import { cookies } from "next/headers";
import * as jose from "jose";

export async function getUserFromCookie() {
  const cookieStore = cookies();
  const authToken = cookieStore.get("Authorization");

  if (!authToken) {
    redirect("/login");
  }

  const jwt = authToken.value;
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  try {
    const { payload } = await jose.jwtVerify(jwt, secret, {});
    return payload;
  } catch (err) {
    redirect("/login");
  }
}

export async function getUserFromDB(id: string) {
  const user = await db.query.users.findFirst({
    columns: {
      id: true,
      email: true,
    },
    where: (model, { eq }) => eq(model.id, id),
  });

  return user;
}

export async function getUser() {
  const userPayload = await getUserFromCookie();
  if (!userPayload?.sub) throw new Error("Unauthorized");

  const user = await getUserFromDB(userPayload?.sub);

  return user;
}

export async function getMyImages() {
  const user = await getUserFromCookie();
  if (!user || !user.sub) throw new Error("Unauthorized");

  const userId = user.sub;

  const images = await db.query.images.findMany({
    where: (model, { eq }) => eq(model.userId, userId),
    orderBy: (model, { desc }) => desc(model.id),
  });

  return images;
}

export async function getImage(id: number) {
  const user = await getUserFromCookie();
  if (!user.sub) throw new Error("Unauthorized");

  const image = await db.query.images.findFirst({
    where: (model, { eq }) => eq(model.id, id),
  });
  if (!image) throw new Error("Image not found");

  if (image.userId !== user.sub) throw new Error("Unauthorized");

  return image;
}

export async function deleteImage(id: number) {
  const user = await getUserFromCookie();
  if (!user.sub) throw new Error("Unauthorized");

  const userId = user.sub;

  await db
    .delete(images)
    .where(and(eq(images.id, id), eq(images.userId, userId)));

  analyticsServerClient.capture({
    distinctId: userId,
    event: "delete image",
    properties: {
      imageId: id,
    },
  });

  redirect("/");
}
