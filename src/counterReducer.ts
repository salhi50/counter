import { COUNTERS_KEY, Counter, getDefaultCounter } from "./counter";

export type State = Counter[];

export enum Actions {
  ADD = "ADD",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
}

export type AddAction = { type: Actions.ADD };

export type UpdateAction = {
  type: Actions.UPDATE;
  payload: Pick<Counter, "id"> & { update: Partial<Omit<Counter, "id">> };
};

export type DeleteAction = {
  type: Actions.DELETE;
  payload: Pick<Counter, "id">;
};

export type Action = AddAction | UpdateAction | DeleteAction;

export type Reducer = (state: State, action: Action) => State;

export type Initializer = () => State;

const CounterReducer: Reducer = (state, action) => {
  switch (action.type) {
    case Actions.ADD:
      return [...state, getDefaultCounter()];
    case Actions.UPDATE:
      return state.map((item) =>
        item.id === action.payload.id ? { ...item, ...action.payload.update } : item,
      );
    case Actions.DELETE:
      return state.filter((item) => item.id !== action.payload.id);
    default:
      return state;
  }
};

export const initializer: Initializer = () => {
  const loc = localStorage.getItem(COUNTERS_KEY);
  return loc ? JSON.parse(loc) : [];
};

export default CounterReducer;
