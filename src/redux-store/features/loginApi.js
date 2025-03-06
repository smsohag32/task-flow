import axios from "axios";
export const loginApi = async (credential) => {
   try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/login`, credential);
      return response;
   } catch (err) {
      const errorMessage = err?.response?.data?.message || "Login failed";
      throw new Error(errorMessage);
   }
};
