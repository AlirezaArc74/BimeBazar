"use client";

import { getCookie } from "cookies-next";
import {  useRouter } from "next/navigation";
import { useEffect } from "react";



const SuccessSubmission = () => {
  const router = useRouter();
  
  useEffect(() => {
    if (getCookie('status') !== "200" || !getCookie('status') ) {
      router.push('/submission')
    }
  },[])

  return (
    <>
      <div>
        <h1 className="text-right m-4 text-[#34A862] font-bold ">
          اطلاعات شما با موفقیت ثبت شد
        </h1>
      </div>

      <button
        onClick={() => router.back()}
        className="fixed  bottom-0  bg-black text-white pointer m-10 py-2 px-[40px] "
      >
        بازگشت
      </button>
    </>
  );
};

export default SuccessSubmission;
