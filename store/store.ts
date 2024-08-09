import axios from "axios";
import { create } from "zustand";
import { ObjectId } from "bson";

interface UserState {
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
    lastLogin: Date;
    defaultSeed: Seed | null;
    defaultSoil: Soil | null;
  } | null;
  getUserData: (userData: {}) => void;
  setDefaultSeed: (defaultSeedId: ObjectId) => void;
  reNewUser: ()=>void;
}

interface Seed {
  _id: ObjectId;
  name: string;
  price: number;
  timeToHarvest: number;
  timeToFertilize: number;
  profit: number;
  exp: number;
  quantity: number;
  imageUrl: string;
  lvl: number;
}

interface Soil {
  _id: ObjectId;
  name: string;
  price: number;
  priceType: string;
  reduceTime: number;
  exp: number;
  imageUrl: string;
  lvl: number;
}

interface DefaultState {
  seeds: Seed[] | null;
  soils: Soil[] | null;
  getSeeds: () => void;
  getSoils: () => void;
}

interface Field {
  userId: number,
    ordinalNumber: number,
    seed: Seed | null,
    timeToWater: number | null,
    status: 'waitForPlant' | 'waitForWater' | 'waitForFertilize' | 'waitForHarvest' | 'waitForDig'
}

interface FieldState {
  fields: Field[] | null,
  getFields: (userId:number) => void;
}

export const useUserStore = create<UserState>((set,get) => ({
  userData: null,
  getUserData: async (userData) => {
    const response = await axios.post("/api/user", userData);
    if (response.status === 200) {
      set({ userData: response.data });
    }
  },
  reNewUser: async () => {
    const { userData } = get();
    if(userData && userData.userId){
      const response = await axios.get("/api/user", {
        params: { userId: userData.userId }
      });
      if (response.status === 200) {
        set({ userData: response.data });
      }
    }
  },
  setDefaultSeed: async (defaultSeedId) => {
    const { userData, reNewUser } = get();
    if(userData && userData.userId){
      const response = await axios.put("/api/user", {defaultSeedId, userId: userData.userId});
      if (response.status === 200) {
        await reNewUser();
      }
    }
    
  }

}));

export const useDefaultStore = create<DefaultState>((set) => ({
  seeds: null,
  soils: null,
  getSeeds: async () => {
    const response = await axios.get("/api/seed");
    if (response.status === 200) {
      set({ seeds: response.data });
    }
  },
  getSoils: async () => {
    const response = await axios.get("/api/soil");
    if (response.status === 200) {
      set({ soils: response.data });
    }
  },
}));


export const useFieldtStore = create<FieldState>((set) => ({
  fields: null,
  getFields: async (userId) => {
    const response = await axios.get("/api/fields", {
      params: { userId }
    });
    if (response.status === 200) {
      set({ fields: response.data });
    }
  } 
}))