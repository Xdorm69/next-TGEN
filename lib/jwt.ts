import jwt, { type Secret, type SignOptions } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as Secret;

const signOptions: SignOptions = {
  expiresIn: (process.env.JWT_EXPIRES_IN ?? "7d") as SignOptions["expiresIn"],
};

export type JwtPayload = {
  id: string;
  email: string;
  role: string;
};

export function signToken(payload: JwtPayload) {
  return jwt.sign(payload, JWT_SECRET, signOptions);
}

export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
}
