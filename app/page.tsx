
'use client'

import { Metadata } from "next";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function Home() {

  const router = useRouter();

  useEffect(() => {
    // Redirect to the desired page
    router.push('/submission');
  }, []); 

 

  return null;
  
}
