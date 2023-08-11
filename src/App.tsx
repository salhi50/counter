import React from "react";
import CounterReducer, {
  Actions,
  Initializer,
  Reducer,
  State,
  initializer,
} from "./counterReducer";
import {
  CreateNewCounterFunction,
  DeleteCounterFunction,
  UpdateCounterFunction,
  Counter,
  COUNTERS_KEY,
} from "./counter";
import GlobalContext from "./globalContext";
// Components
import CountersList from "./components/CountersList";
import Container from "./components/Container";
import { DeleteCounterModal, EditCounterModal } from "./components/Modals";
import Button from "./components/Button";
import { BsPlus } from "react-icons/bs";

export type ModalsVisibility = {
  editCounterModal: boolean;
  deleteCounterModal: boolean;
};

const App: React.FC = () => {
  const [counters, dispatch] = React.useReducer<Reducer, State>(CounterReducer, [], initializer);
  const [showModals, setShowModals] = React.useState<ModalsVisibility>({
    editCounterModal: false,
    deleteCounterModal: false,
  });
  const selectedCounterIdRef = React.useRef<Counter["id"] | null>(null);

  React.useEffect(() => {
    localStorage.setItem(COUNTERS_KEY, JSON.stringify(counters));
  }, [counters]);

  const createNewCounter = React.useCallback<CreateNewCounterFunction>(() => {
    dispatch({ type: Actions.ADD });
  }, []);

  const updateCounter = React.useCallback<UpdateCounterFunction>((id, update) => {
    dispatch({
      type: Actions.UPDATE,
      payload: { id, update },
    });
  }, []);

  const deleteCounter = React.useCallback<DeleteCounterFunction>((id) => {
    dispatch({
      type: Actions.DELETE,
      payload: { id },
    });
  }, []);

  const pinnedCounters: Counter[] = React.useMemo(() => {
    return counters.filter((counter) => counter.isPinned);
  }, [counters]);

  const unPinnedCounters: Counter[] = React.useMemo(() => {
    return counters.filter((counter) => !counter.isPinned);
  }, [counters]);

  return (
    <GlobalContext.Provider
      value={{
        counterMethods: { createNewCounter, updateCounter, deleteCounter },
        showModals,
        setShowModals,
        selectedCounterIdRef,
        counters,
      }}
    >
      <Container>
        <CountersList
          title="Pinned counters"
          counters={pinnedCounters}
        />
        <CountersList
          title="Your counters"
          counters={unPinnedCounters}
        />
      </Container>
      <DeleteCounterModal />
      <EditCounterModal />
      <Button
        onClick={createNewCounter}
        contrast="high"
        className="hstack gap-3 m-3 position-fixed bottom-0 end-0"
        size="lg"
      >
        <BsPlus />
        <span className="d-md-block d-none">New counter</span>
      </Button>
      {/* Modal backdrop */}
      <div
        className={
          Object.values(showModals).some((isOpen) => isOpen === true) ? "modal-backdrop show" : ""
        }
      ></div>
    </GlobalContext.Provider>
  );
};

export default App;
