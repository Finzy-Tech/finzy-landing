import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Holdings, Fund } from "@/types/types";

interface MfState {
  holdings: Holdings | null;
  setHoldings: (data: Holdings) => void;
  clearHoldings: () => void;
  selectedMf: Fund | null;
  setSelectedMf: (mf: Fund) => void;
  clearSelectedMf: () => void;
}

export const useMfStore = create(
  persist<MfState>(
    (set) => ({
      holdings: null,
      setHoldings: (data) => set({ holdings: data }),
      clearHoldings: () => set({ holdings: null }),
      selectedMf: null,
      setSelectedMf: (mf) => set({ selectedMf: mf }),
      clearSelectedMf: () => set({ selectedMf: null }),
    }),
    {
      name: "mf-storage", // unique name for localStorage
    }
  )
);