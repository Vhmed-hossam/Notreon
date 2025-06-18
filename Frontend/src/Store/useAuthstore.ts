import { create } from "zustand";
import type { useAuthStoreType } from "@/Typescript/Types/useAuthStoreType";
import { axiosInstance } from "@/lib/axios";

const useAuthStore = create<useAuthStoreType>()((set) => ({
  User: null,
  isLoggingIn: false,
  isSigningUp: false,
  isCheckingAuth: false,
  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const res = await axiosInstance.get("/auth/checkauth");
      console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
      set({ isCheckingAuth: false });
    }
  },
}));

export default useAuthStore;
