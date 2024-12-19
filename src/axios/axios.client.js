import axios from "axios";

const get = async (url) => {
  try {
    const response = await axios.get(url, {
      headers: {
        Accept: "application/json",
        "Accept-Encoding": "identity"
      }
    });
    return response.data;
  } catch (error) {
    console.error("Axios error:", error);
    throw error;
  }
};

export default { get };