"use server";
import axios from "axios";

import { cookies } from "next/headers";

export const getAddressesService = async () => {
  // const data =

  try {
    const response = await axios.get(
      "https://front-end-task.bmbzr.ir/my-addresses/"
    );
    if (response.status === 200) {
      //@ts-ignore
      cookies().set("session", response.headers["set-cookie"], {
        secure: true,
      });

      return response.data;
    }
  } catch (e) {}
};

interface ChosenAddress {
  nationalId: string;
  phoneNumber: string;
  addressId: string;
}

export const sendClientData = async (formData: ChosenAddress) => {
  try {
    const response = await axios.post(
      "https://front-end-task.bmbzr.ir/order/completion/",
      formData,
      {
        headers: {
          Cookie: cookies().get("session")?.value,
        },
      }
    );
    return { data: response.data, status: response.status };
    // }
  } catch (error) {}
};
