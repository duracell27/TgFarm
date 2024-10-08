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
  updateUserStats: (
    expAmount: number,
    goldAmount: number,
    usdAmount: number,
    type: string
  ) => Promise<boolean | undefined>;
}
interface User{
  _id: ObjectId;
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
  priceType: "gold" | "usd";
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

interface FieldPrice {
  _id: ObjectId;
  ordinal: number;
  costUsd: number;
}

interface PricesState {
  fieldPrices: FieldPrice[] | null;
  getFieldPrices: () => void;
}

interface Field {
  _id: ObjectId;
  userId: number;
  ordinalNumber: number;
  seed: Seed;
  timeToWater: Date | null;
  timeToFertilize: Date | null;
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
  updateField: (
    fieldId: ObjectId,
    seedId: ObjectId,
    fieldUpdateType: "plant" | "water" | "fertilize" | "harvest" | "dig",
    soilId: ObjectId,
    userId: number
  ) => void;
  buyField: (userId: number, ordinal: number) => void;
}

interface LvlState {
  expToNextLvl: number | null;
  percent: number | null;
  getExpData: (userId: number) => void;
}

interface WerehouseObj{
  _id: ObjectId;
  userId: number,
    seed: Seed,
    amount: number
    type: 'seed'
}

interface WerehouseState {
  werehouse: WerehouseObj[] | null;
  getWerehouse: (userId: number) => void;
  updateWerehouse: (userId: number, seedId: ObjectId, amount: number) => void;
  sellWerehouseItem:(werehouseId:ObjectId, userId: number)=>void
}

interface RatingState {
  ratingList: User[] | null,
  getRatingList: () => void; 
}

interface ConvertState {
  convertData: {
    userId: number,
    converted: number,
    convertAvaliable: number,
    lastUpdate: Date
  } | null,
  getConvertData: (userId:number) => void;
  updateConvertData: (userId:number, amount:number, type: "usd-1" | "usd-10" | "gold") => void;
}

interface Achive{
  userId: number,
  sadovid: {
    count: number,
    lvl: number
  },
  vodoliy: {
    count: number,
    lvl: number
  },
  agronom: {
    count: number,
    lvl: number,
  },
  zemlevlasnyk: {
    count: number,
    lvl: number,
  },
  mehanizator: {
    count: number,
    lvl: number,
  },
  achiveCount: number,
}

interface AchiveState {
  achives: Achive | null,
  getAchives: (userId: number) => void;
  
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
  updateUserStats: async (expAmount, goldAmount, usdAmount, type) => {
    const { userData, reNewUser } = get();
    if (userData && userData.userId) {
      const response = await axios.put("/api/userStats", {
        expAmount,
        goldAmount,
        usdAmount,
        type,
        userId: userData.userId,
      });
      if (response.status === 200) {
        if (response.data.result === true) {
          reNewUser();
          return true;
        } else if (response.data.result === false) {
          return false;
        }
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
  updateField: async (fieldId, seedId, fieldUpdateType, soilId, userId) => {
    const { getFields } = get();
    const { userData } = useUserStore.getState();
    const { getExpData } = useLvlStore.getState();

    const response = await axios.put("/api/fields", {
      fieldId,
      seedId,
      fieldUpdateType,
      soilId,
      userId
    });
    if (response.status === 200) {
      if (userData) {
        getFields(userData.userId);
        getExpData(userData.userId);
      }
    }
  },
  buyField: async (userId, ordinal) => {
    const response = await axios.post("/api/fields", { userId, ordinal });
    if (response.status === 200) {
      const { getFields } = get();
      getFields(userId);
    }
  },
}));

export const usePricesStore = create<PricesState>((set) => ({
  fieldPrices: null,
  getFieldPrices: async () => {
    const response = await axios.get("/api/fieldPrice");
    if (response.status === 200) {
      set({ fieldPrices: response.data });
    }
  },
}));

export const useLvlStore = create<LvlState>((set) => ({
  expToNextLvl: null,
  percent: null,
  getExpData: async (userId) => {
    

    const response = await axios.get("/api/lvl", {
      params: { userId },
    });
    if (response.status === 200) {
      set({ expToNextLvl: response.data.needExp });
      set({ percent: response.data.percent });

      if (response.data.needToUpdateUserData) {
        useUserStore.getState().reNewUser();
      }
    }
  },
}));

export const useRatingStore = create<RatingState>((set) => ({
  ratingList: null,
  getRatingList: async () => {
    const response = await axios.get("/api/rating");
    if (response.status === 200) {
      set({ ratingList: response.data });
    }
  },
}));


export const useWerehouseStore = create<WerehouseState>((set) => ({
  werehouse: null,
  getWerehouse: async (userId) => {
      const response = await axios.get("/api/werehouse", {
        params: { userId},
      });
      if (response.status === 200) {
        set({ werehouse: response.data });
      }
    
  },
  updateWerehouse: async (userId, seedId, amount) => {
    const response = await axios.post("/api/werehouse", { userId, seedId, amount});
    if (response.status === 200) {
      useWerehouseStore.getState().getWerehouse(userId)
    }
  },
  sellWerehouseItem: async (werehouseId, userId) => {
    const response = await axios.delete("/api/werehouse", {
      params: { werehouseId},
    });
    if (response.status === 200) {
      useWerehouseStore.getState().getWerehouse(userId)
    }
  }
  
}));



export const useConverStore = create<ConvertState>((set) => ({
  convertData: null,
  getConvertData: async (userId) => {
    const response = await axios.get("/api/convert", {params: {userId}});
    if (response.status === 200) {
      set({ convertData: response.data });
    }
  },
  updateConvertData: async (userId, amount, type) => {
    const response = await axios.put("/api/convert", {userId, amount, type});
    if (response.status === 200) {
      useConverStore.getState().getConvertData(userId);
      useUserStore.getState().reNewUser();
    }
  },
}));

export const useAchivesStore = create<AchiveState>((set) => ({
  achives: null,
  getAchives: async (userId) => {
    const response = await axios.get("/api/achive", {params: {userId}});
    if (response.status === 200) {
      set({ achives: response.data });
    }
  }
}));