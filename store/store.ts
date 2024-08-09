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
    defaultSeed: Seed;
    defaultSoil: Soil;
  } | null;
  getUserData: (userData: {}) => void;
  setDefaultSeed: (defaultSeedId: ObjectId) => void;
  setDefaultSoil: (defaultSoilId: ObjectId) => void;
  reNewUser: () => void;
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
  _id: ObjectId;
  userId: number;
  ordinalNumber: number;
  seed: Seed | null;
  timeToWater: Date | null;
  timeToFertilize: Date | null
  timeToHarvest: Date | null;
  status:
    | "waitForPlant"
    | "waitForWater"
    | "waitForFertilize"
    | "waitForHarvest"
    | "waitForDig";
}

interface FieldState {
  fields: Field[] | null;
  getFields: (userId: number) => void;
  updateField: (fieldId:ObjectId, seedId:ObjectId, fieldUpdateType: 'plant'|'water' |'fertilize', soilId:ObjectId) => void
}

export const useUserStore = create<UserState>((set, get) => ({
  userData: null,
  getUserData: async (userData) => {
    const response = await axios.post("/api/user", userData);
    if (response.status === 200) {
      set({ userData: response.data });
    }
  },
  reNewUser: async () => {
    const { userData } = get();
    if (userData && userData.userId) {
      const response = await axios.get("/api/user", {
        params: { userId: userData.userId },
      });
      if (response.status === 200) {
        set({ userData: response.data });
      }
    }
  },
  setDefaultSeed: async (defaultSeedId) => {
    const { userData, reNewUser } = get();
    if (userData && userData.userId) {
      const response = await axios.put("/api/user", {
        defaultSeedId,
        userId: userData.userId,
        defType: "seed",
      });
      if (response.status === 200) {
        reNewUser();
      }
    }
  },
  setDefaultSoil: async (defaultSoilId) => {
    const { userData, reNewUser } = get();
    if (userData && userData.userId) {
      const response = await axios.put("/api/user", {
        defaultSoilId,
        userId: userData.userId,
        defType: "soil",
      });
      if (response.status === 200) {
        reNewUser();
      }
    }
  },
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

export const useFieldtStore = create<FieldState>((set, get) => ({
  fields: null,
  getFields: async (userId) => {
    const response = await axios.get("/api/fields", {
      params: { userId },
    });
    if (response.status === 200) {
      set({ fields: response.data });
    }
  },
  updateField: async (fieldId,seedId,fieldUpdateType,soilId)=>{
  
    const {getFields} = get()
    const { userData } = useUserStore.getState();

    const response = await axios.put("/api/fields", {fieldId, seedId,fieldUpdateType,soilId});
    if (response.status === 200) {
      if(userData){
        getFields(userData.userId)
      }
    }
  }
}));
