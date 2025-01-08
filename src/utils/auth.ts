import { jwtVerify, SignJWT } from "jose";

interface UserJwtPayload {
  sub: string;
  exp: number;
}

export const verifyAuth = async (token: string): Promise<UserJwtPayload> => {
  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET),
    );
    return verified.payload as UserJwtPayload;
  } catch (error) {
    throw new Error("Token has expired.");
  }
};
