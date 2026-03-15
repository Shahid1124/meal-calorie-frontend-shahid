import { create } from "zustand";

import { persist, createJSONStorage } from "zustand/middleware";

import { getCalories } from "@/lib/api";

import { CalorieRequest, CalorieResponse } from "@/types";

type MealSate = {
  result: CalorieResponse | null;
  history: CalorieResponse[];
  loading: boolean;
  error: string | null;

  fetchCalories: (payload: CalorieRequest) => Promise<void>;
  clearResult: () => void;
};

const useMealStore = create<MealSate>()(
  persist(
    (set) => ({
      result: null,
      history: [],
      loading: false,
      error: null,

      fetchCalories: async (payload) => {
        set({ loading: true, error: null });

        try {
          const data = await getCalories(payload);

          set((state) => ({
            result: data,
            history: [data, ...state.history],
            loading: false,
          }));
        } catch (err) {
          set({
            error: err instanceof Error ? err.message : "Dish not found",
            loading: false,
          });
        }
      },
      clearResult: () => {
        set({
          result: null,
          error: null,
        });
      },
    }),
    {
      name: "calHist",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ history: state.history }),
    },
  ),
);

export default useMealStore;
