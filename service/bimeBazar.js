const { handleResponse } = require("./handler");
import axios from "axios";

export async function getAddressesService() {
  try {
    const response = await axios.get(
      "https://front-end-task.bmbzr.ir/my-addresses"
    );
    return response;
  } catch (e) {
    return {
      message: e,
    };
  }
}
