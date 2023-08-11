import { nanoid } from "nanoid";
import { UpdateAction } from "./counterReducer";

// Used to update the localstorage
export const COUNTERS_KEY = "counters";

export interface Counter {
  value: number;
  step: number;
  init: number;
  label: string;
  id: string;
  isPinned: boolean;
}

export type GetDefaultCounterFunction = () => Counter;

export const getDefaultCounter: GetDefaultCounterFunction = () => {
  return {
    value: 0,
    step: 1,
    init: 0,
    label: "My counter",
    id: nanoid(),
    isPinned: false,
  };
};

export type CreateNewCounterFunction = () => void;

export type UpdateCounterFunction = (
  id: Counter["id"],
  update: UpdateAction["payload"]["update"],
) => void;

export type DeleteCounterFunction = (id: Counter["id"]) => void;

export type CountersListView = "grid" | "list";

export const defaultCountersListView: CountersListView = "grid";
