import create from "zustand";

interface State {
  user: {
    tgid: number;
    firstName: string;
    lastName: string;
    userName: string;
    languageCode: string;
    isPremium: boolean;
  } | null;
  userData: {
    gold: number;
    usd: number;
  } | null;
}
//   increase: () => void;
//   decrease: () => void;

const useStore = create<State>((set) => ({
  user: null,
  userData: null,
}));

//   increase: () => set((state) => ({ count: state.count + 1 })),
//   decrease: () => set((state) => ({ count: state.count - 1 })),

export default useStore;
