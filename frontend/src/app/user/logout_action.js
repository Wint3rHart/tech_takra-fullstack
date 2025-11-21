"use server";

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function logoutAction() {
  const cookieStore = await cookies();
  
  // Delete all auth-related cookies
  cookieStore.delete('User-data');
  cookieStore.delete('access');
  cookieStore.delete('refresh');
  
  redirect('/');
}

