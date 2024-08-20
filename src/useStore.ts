import { create } from "zustand";

interface StoreState {
  phoneNumbers: string[]; // Array of phone numbers as strings
  image: string | undefined; // Image can be a File object or null
  contestNameStore: string | undefined;
  setPhoneNumbers: (numbers: string[]) => void; // Function to set phone numbers
  setImage: (img: string | undefined) => void; // Function to set image
  setContestNameStore: (name: string | undefined) => void;
}

const useStore = create<StoreState>((set) => ({
  phoneNumbers: [],
  image: "",
  contestNameStore: "کیس گیمینگ",
  setPhoneNumbers: (numbers) => set({ phoneNumbers: numbers }),
  setContestNameStore: (name) => set({ contestNameStore: name }),
  setImage: (img) => set({ image: img }),
}));

export default useStore;
