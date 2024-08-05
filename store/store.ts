import axios from "axios";
import create from "zustand";

interface State {
  userData: {
    userId: number;
    firstName: string;
    lastName: string;
    userName: string;
    languageCode: string;
    isPremium: boolean;
    gold: number;
    usd: number;
    lvl: number;
    exp: number;
    lastLogin: Date
  } | null;
  getUserData: (userData: {}) => void;
}
//   increase: () => void;
//   decrease: () => void;

const useUserStore = create<State>((set) => ({
  userData: null,
  getUserData: async (userData) => {
    console.log('Я виклакалась')
    const response = await axios.post("/api/user", userData );
    if(response.status === 200){
      set({ userData: response.data });
    }
  },
}));

//   increase: () => set((state) => ({ count: state.count + 1 })),
//   decrease: () => set((state) => ({ count: state.count - 1 })),

export default useUserStore;
