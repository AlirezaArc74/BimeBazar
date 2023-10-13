const { default: axios } = require("axios");
const { handleResponse } = require("./handler");

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
