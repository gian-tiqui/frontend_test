import { create } from "zustand";

export interface Field {
  label: string;
  value: string;
}

interface State {
  field: Field;
  setField: (field: Field) => void;
}

const useFieldStore = create<State>((set) => ({
  field: { label: "Name", value: "name" },
  setField: (field) => set({ field }),
}));

export default useFieldStore;
