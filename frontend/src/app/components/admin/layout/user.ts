'use server';
import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  is_active: boolean;
  permission: {
    permission: string;
  };
}

const getcookies = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const { payload } = await jwtVerify(token as string, secret);
  const userId = payload._id as string;
  return { token, userId };
};



const getUserInfo = async (userId: string, token: string)=> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/user?id=${userId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );
  const data = response.json();
  return data;
};

export const UserInfo = async () => {
  const cookies = await getcookies();
  const response = await getUserInfo(cookies.userId, cookies.token as string);
  const userData: User[] = response.profile;
  console.log('User Data en user.ts:', userData);
  return userData;
};