import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useStore = create((set) => ({
	history: [],
	addToHistory: (result) => set((state) => ({ history: [...state.history, result] })),

	clearHistory: () => {
		set({ history: [] });
	},
	loadHistory: async () => {
		try {
			const savedHistory = await AsyncStorage.getItem("history");
			if (savedHistory) {
				set({ history: JSON.parse(savedHistory) });
			}
		} catch (error) {
			console.error("Error loading history:", error);
		}
	},
	saveHistory: async () => {
		try {
			await AsyncStorage.setItem("history", JSON.stringify(get().history));
		} catch (error) {
			console.error("Error saving history:", error);
		}
	},
}));

export default useStore;
