import { create } from "zustand";

interface StoreState {
  phoneNumbers: string[];
  contestNameStore: string | undefined;
  setPhoneNumbers: (numbers: string[]) => void;
  video: File | null;
  cover: File | null;
  image: File | null;
  winnerIndex: number | null;
  setVideo: (file: File) => void;
  setCover: (file: File) => void;
  setImage: (file: File) => void;
  setContestNameStore: (name: string | undefined) => void;
  setWinnerIndex: (index: number | null) => void;
  isHide: boolean; // New boolean state
  setIsHide: (value: boolean) => void; // New method to update isHide
}

const useStore = create<StoreState>((set) => ({
  phoneNumbers: [],
  contestNameStore: "کیس گیمینگ",
  setPhoneNumbers: (numbers) => set({ phoneNumbers: numbers }),
  setContestNameStore: (name) => set({ contestNameStore: name }),
  video: null,
  cover: null,
  image: null,
  winnerIndex: null,
  setVideo: (file) => set({ video: file }),
  setCover: (file) => set({ cover: file }),
  setImage: (file) => set({ image: file }),
  setWinnerIndex: (index) => set({ winnerIndex: index }),
  isHide: true, // Initial value for isHide
  setIsHide: (value) => set({ isHide: value }), // Method to update isHide
}));

export default useStore;
