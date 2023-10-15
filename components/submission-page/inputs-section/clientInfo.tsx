"use client";

import { useContext, useEffect, useState } from "react";

import ModalAddresses from "./modal-addresses/modalAddresses";

import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";

import * as Yup from "yup";

import { isIranianNationalIdValid } from "@/components/functions/functions";

import { ClientContext } from "@/state-managemnt/client";

import { getAddressesService, sendClientData } from "@/app/api/service";

import { useRouter } from "next/navigation";

import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { notification } from "antd";

interface ChosenAddress {
  nationalId: string;
  phoneNumber: string;
  addressId: string;
}

const ClientsInfo = () => {
  const router = useRouter();

  const [nationalId, setNationalId] = useState("");

  const [phoneNumber, setPhoneNumber] = useState("");

  const [openModal, setOpenModal] = useState(false);

  const { addressInfo } = useContext(ClientContext);

  // functions related to open and close modal
  const showAddressesModal = () => {
    setOpenModal(true);
    getAddresses();
  };

  const closeAddressesModal = () => {
    setOpenModal(false);
  };

  // inputs data handler
  const nationalIdHandler = (nationalId: string) => {
    setNationalId(nationalId);
  };

  const phoneNumberHandler = (phoneNumber: string) => {
    setPhoneNumber(phoneNumber);
  };
  // inputs data handler

  // section related to inputs validation
  const validationSchema = Yup.object().shape({
    nationalId: Yup.string()
      .required("لطفاً کد ملی را وارد کنید")
      .matches(/^\d{10}$/, "لطفاً یک کد ملی معتبر وارد کنید")
      .test(
        "national-id-validation",
        "کد ملی وارد شده معتبر نمی‌باشد",
        (value) => isIranianNationalIdValid(value ?? "")
      ),

    phoneNumber: Yup.string()
      .required("لطفاً شماره تلفن وارد کنید")
      .matches(/^(09|9)\d{9}$/, "شماره تلفن معتبر وارد کنید")
      .min(10, "شماره تلفن باید حداقل 11 رقم باشد")
      .max(11, "شماره تلفن باید حداکثر 11 رقم باشد"),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;
  // section related to inputs validation

  // functions related to open and close modal
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function getAddresses() {
    setIsLoading(true);

    const response = await getAddressesService();

    if (response) {
      setData(response);
      setIsLoading(false);
    } else {
      notification.error({
        description: "مشکلی پیش آمده لطفا مجددا تلاش کنید",
        message: undefined,
      });
    }
  }
  // handle fetch data for showing addresses in modal component

  // send chesen address data to back
  const handleFormSubmit = async () => {
    const formData: ChosenAddress = {
      nationalId: nationalId,
      phoneNumber: phoneNumber,
      addressId: addressInfo?.id,
    };

    const response = await sendClientData(formData);
    if (response?.status === 200) {
      router.push("/success-submission");
      setCookie("addresses", formData);
      setCookie("status", 200);
    } else {
      notification.error({
        description: "مشکلی پیش آمده لطفا مجددا تلاش کنید",
        message: undefined,
      });
    }
  };
  // send chesen address data to back

  // add natational id and phone number when user register successfully and came back to first page
  useEffect(() => {
    if (getCookie("status") === "200") {
      const cookieValue: any = getCookie("addresses");
      const addressesObject = JSON?.parse(cookieValue);
      setNationalId(addressesObject.nationalId);
      setPhoneNumber(addressesObject.phoneNumber);
    }
    return deleteCookie("status");
  }, []);
  // add natational id and phone number when user register successfully and came back to first page

  if (isLoading) return <div> ...در حال دریافت اطلاعات </div>;
  return (
    <>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="flex flex-col	justify-items-start	justify-start	 ">
          <input
            {...register("nationalId")}
            onChange={(e) => nationalIdHandler(e.target.value)}
            value={nationalId}
            dir="rtl"
            className={` m-4 mb-2 p-4 border-[1px] border-[#B4B4B4] ${
              errors.nationalId ? "border-red-500" : "border-[#B4B4B4]"
            }  ${
              errors.nationalId
                ? "focus:border-red-500"
                : "focus:border-[#B4B4B4]"
            }  focus:ring-0 `}
            type="number"
            id="nationalId"
            name="nationalId"
            placeholder="کد ملی"
          />
          <div className="text-red-500 mr-5 mt-0 text-right ">
            {errors.nationalId?.message}
          </div>

          <input
            {...register("phoneNumber")}
            onChange={(e) => phoneNumberHandler(e.target.value)}
            value={phoneNumber}
            dir="rtl"
            className={` m-4 mt-2 p-4 border-[1px] border-[#B4B4B4]  ${
              errors.phoneNumber ? "border-red-500" : "border-[#B4B4B4]"
            }  ${
              errors.phoneNumber
                ? "focus:border-red-500"
                : "focus:border-[#B4B4B4]"
            }  focus:ring-0  `}
            type="number"
            id="phoneNumber"
            name="phoneNumber"
            placeholder="شماره تلفن همراه"
          />
          <div className="text-red-500 mr-5 mt-0 text-right ">
            {errors.phoneNumber?.message}
          </div>
        </div>

        <div className="text-right m-5 mt-4 border-b-[1px] border-[#E0E0E0] pb-2  ">
          <h1 className="font-bold	">آدرس جهت درج روی بیمه‌نامه</h1>
        </div>

        <div className="text-right m-5 mt-8  pb-2">
          <h1>
            {addressInfo?.name
              ? addressInfo?.name
              : `لطفا آدرسی را که می‌خواهید روی بیمه‌نامه درج شود، وارد کنید `}
          </h1>
        </div>

        <div className=" px-4 ">
          <button
            onClick={showAddressesModal}
            className="bg-[#FFC453] px-8 py-2 w-full text-black font-bold	 "
          >
            انتخاب از آدرس های من
          </button>
        </div>

        <div className="m-4 mt-8">
          <button type="submit" className="bg-black text-white px-8 py-2 ">
            تایید و ادامه
          </button>
        </div>
      </form>

      <div>
        <ModalAddresses
          addresses={data}
          openModal={openModal}
          closeAddressesModal={closeAddressesModal}
          nationalId={nationalId}
          phoneNumber={phoneNumber}
        />
      </div>
    </>
  );
};

export default ClientsInfo;
