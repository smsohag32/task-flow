import axios from "axios";
export const loginApi = async (credential) => {
   try {
      const response = await axios.post(
         `${import.meta.env.VITE_BASE_URL}/auth/authenticate`,
         credential
      );
      return response;
   } catch (err) {
      throw new Error(err?.response?.data);
   }
};
