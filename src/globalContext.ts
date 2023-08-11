import { createContext } from "react";
import {
  CreateNewCounterFunction,
  DeleteCounterFunction,
  UpdateCounterFunction,
  Counter,
} from "./counter";
import { ModalsVisibility } from "./App";

export type ContextValue = {
  counterMethods: {
    createNewCounter: CreateNewCounterFunction;
    updateCounter: UpdateCounterFunction;
    deleteCounter: DeleteCounterFunction;
  };
  selectedCounterIdRef: React.MutableRefObject<Counter["id"] | null>;
  showModals: ModalsVisibility;
  setShowModals: React.Dispatch<React.SetStateAction<ModalsVisibility>>;
  counters: Counter[];
};

const GlobalContext = createContext<ContextValue>({
  counterMethods: {
    createNewCounter: () => {},
    updateCounter: () => {},
    deleteCounter: () => {},
  },
  setShowModals: () => {},
  showModals: {
    editCounterModal: false,
    deleteCounterModal: false,
  },
  selectedCounterIdRef: { current: null },
  counters: [],
});

export default GlobalContext;
