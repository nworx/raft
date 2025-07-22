"use client";
import useUserStore from '@/zustand/userStore';
// import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React,{useEffect, useLayoutEffect} from 'react';

export default function DashboardLayout({ children }) {
    const router=useRouter();
//   const cookieStore = cookies();
//   const token = cookieStore.get('jwt')?.value;

 useLayoutEffect(() => {
    const cookies = document.cookie;
    const { setUser, setUt, clearUser, user, ut } = useUserStore.getState();
    const hasJWT = cookies.includes('jwt');
   

    if (!ut) {
      router.push('/');
    }
  }, []);

  return <>{children}</>;
}
