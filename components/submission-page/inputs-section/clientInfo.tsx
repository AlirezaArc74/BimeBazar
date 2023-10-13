"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import ModalAddresses from "./modal-addresses/modalAddresses";

interface Addresses {
  id: string;
  name: string;
  details: string;
}

const ClientsInfo = () => {
  const [openModal, setOpenModal] = useState(false);

  const showAddressesModal = () => {
    setOpenModal(true);
  };

  const closeAddressesModal = () => {
    setOpenModal(false);
  };
  const fetchAddresses = async () => {
    try {
      const response = await axios.get(
        "https://front-end-task.bmbzr.ir/my-addresses"
      );
      return response.data as Addresses[];
    } catch (error) {
      throw new Error("Failed to fetch addresses: ");
    }
  };

  const { data, isLoading, isError } = useQuery(["addresses"], fetchAddresses);

  // console.log(data);

  if (isLoading) return <div> ...در حال دریافت اطلاعات </div>;

  if (isError) return <div> مشکلی پیش امده لطفا مجدد تلاش کنید </div>;

  return (
    <>
      <div className="flex flex-col	justify-items-start	justify-start	 ">
        <input
          dir="rtl"
          className=" m-4 p-4 border-[1px] border-[#B4B4B4] "
          type="number"
          id="natianlId"
          placeholder="کد ملی"
        />
        <input
          dir="rtl"
          className=" m-4 p-4 border-[1px] border-[#B4B4B4] "
          type="number"
          id="natianlId"
          placeholder="شماره تلفن همراه"
        />
      </div>

      <div className="text-right m-5 mt-4 border-b-[1px] border-[#E0E0E0] pb-2  ">
        <h1 className="font-bold	">آدرس جهت درج روی بیمه‌نامه</h1>
      </div>

      <div className="text-right m-5 mt-8  pb-2">
        <h1>لطفا آدرسی را که می‌خواهید روی بیمه‌نامه درج شود، وارد کنید</h1>
      </div>
      <div className=" px-4 ">
        <button onClick={showAddressesModal} className="bg-[#FFC453] px-8 py-2 w-full text-black font-bold	 ">
          انتخاب از آدرس های من
        </button>
      </div>

      <div className="m-4 mt-8">
        <button className="bg-black text-white px-8 py-2 ">
          تایید و ادامه
        </button>
      </div>

      <div>
        <ModalAddresses
          addresses={data}
          openModal={openModal}
          closeAddressesModal={closeAddressesModal}
          // isError={isError}
          // isLoading={isLoading}
        />
      </div>
    </>
  );
};

export default ClientsInfo;
