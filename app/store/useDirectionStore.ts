import { create } from "zustand";
import { Field } from "./useFieldStore";

export interface Direction extends Field {}

interface State {
  direction: Direction;
  setDirection: (direction: Direction) => void;
}

export const useDirectionStore = create<State>((set) => ({
  direction: { label: "Ascending", value: "ascending" },
  setDirection: (direction: Direction) => set({ direction }),
}));
