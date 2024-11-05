import { Theme } from "@/types/config";
import { create, StateCreator } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const defaultTheme: Theme = {
  primary: "#006937",
  secondary: "#00703C",
  white: "#FFFFFF",
  black: "#0A0A0A"
};

interface ConfigStore {
  theme: Theme;
  updateTheme: (updatedTheme: Partial<Theme>) => void;
}

const useConfigStore = create<ConfigStore>(
  persist(
    (set) => ({
      theme: defaultTheme,
      setTheme: (theme: Theme) => {
        set({ theme });
      },
      updateTheme: (updatedTheme: Partial<Theme>) => {
        set((state) => ({
          theme: { ...state.theme, ...updatedTheme }
        }));
      }
    }),
    {
      name: "config-storage",
      storage: createJSONStorage(() => localStorage)
    }
  ) as StateCreator<ConfigStore, [], []>
);

export default useConfigStore;
