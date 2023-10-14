import React, { useContext, useState } from "react";
import { Checkbox, Input, Modal, notification } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { ClientProvider } from "@/state-managemnt/client";
import {ClientContext} from "../../../../state-managemnt/client"
interface Addresses {
  id: string;
  name: string;
  details: string;
}

interface ModalAddressesProps {
  addresses: Addresses[];
  openModal: boolean;
  closeAddressesModal: any;
  phoneNumber:string;
  nationalId: string;
}



const ModalAddresses: React.FC<ModalAddressesProps> = ({
  addresses,
  openModal,
  closeAddressesModal,
}) => {
  const [addressId, setAddressId] = useState("");

  const {setAddressInfo} = useContext(ClientContext)

  const addressHandler = (address:Addresses) => {
    // console.log(address.id);
    
    setAddressId(address.id);
  };


  // close modal and handle data function 
  const choseAddress = () => {
    closeAddressesModal()
    const findObject = addresses.find((address) => address.id === addressId)
    console.log(findObject, 'findObject');
    
    setAddressInfo(findObject)
  }
  // close modal and handle data function 


  console.log(addresses, 'addresses');
  
  return (
    <>
      <Modal
        style={{ height: "100%" }}
        closeIcon={null}
        open={openModal}
        footer={null}
        onCancel={closeAddressesModal}
      >
        {/* {isLoading && <div> ...در حال دریافت اطلاعات </div>}
        {isError && <div> مشکلی پیش امده لطفا مجدد تلاش کنید </div>} */}
        <div>
          <div className="flex justify-between flex-row-reverse mb-4 m-4 items-baseline ">
            <h1 className=" font-semibold mt-4 ">انتخاب آدرس</h1>
            <CloseOutlined onClick={closeAddressesModal} />
          </div>

          <div className="border-t-[1px] border-[#E0E0E0]">
            {addresses.map((address) => {
              return (
                <>
                  <div
                    key={address.id}
                    className="flex flex-row-reverse m-8 gap-4 "
                  >
                    <input
                      checked={addressId === address.id}
                      onChange={() => addressHandler(address)}
                      type="checkbox"
                      className="bg-white w-[30px] h-[30px] border-2 border-[#c2c2c2] text-[#FFC453] focus:ring-0 rounded-[50%] "
                    />

                    <div className=" text-right ">
                      <h1 className=" font-bold "> {address.name} </h1>
                      <p> {address.details} </p>
                    </div>
                  </div>
                </>
              );
            })}
          </div>

          <div className="bg-[#fff] shadow-[0_3px_15px_-3px_rgba(34,34,34,0.10)] p-4 ">
            <button
              onClick={choseAddress}
              className="bg-black text-white  w-full py-4 font-semibold  "
            >
              انتخاب
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ModalAddresses;
