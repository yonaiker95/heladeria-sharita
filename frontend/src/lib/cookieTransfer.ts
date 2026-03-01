'use server';

import type { JWTPayload } from 'jose';
import { jwtVerify } from 'jose';

// payload coming out of the token
interface JwtPayload extends JWTPayload {
  _id: string;
  role: string;
  username: string;
  userEmail: string;
  is_active: boolean;
  permission: string;
}

// shape used by the rest of your app
export interface UserData {
  userId: string;
  role: string;
  username: string;
  userEmail: string;
  is_active: boolean;
  permission: string;
}

const getcookies = async (token: string): Promise<UserData> => {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const { payload } = await jwtVerify<JwtPayload>(token, secret);

  return {
    userId: payload._id,
    role: payload.role,
    username: payload.username,
    userEmail: payload.userEmail,
    is_active: payload.is_active,
    permission: payload.permission,
  };
};

export const UserDataCookie = async (token: string) => {
  const cookies = await getcookies(token);
  return cookies;
};
