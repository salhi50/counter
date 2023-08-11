import React from "react";
import { Counter, CountersListView } from "../counter";
import {
  BsArrowCounterclockwise,
  BsDash,
  BsPencil,
  BsPin,
  BsPlus,
  BsThreeDots,
  BsTrash,
} from "react-icons/bs";
import useCloseOnClickOutside from "../hooks/useCloseOnClickOutside";
import Button from "./Button";
import GlobalContext from "../globalContext";

type closeMenuFunction = () => void;
type openMenuFunction = () => void;
type toggleMenuFunction = () => void;

const CounterOptionsMenu: React.FC<{ counter: Counter }> = ({ counter }) => {
  const [showMenu, setShowMenu] = React.useState(false);
  const menuRef = React.useRef<HTMLUListElement | null>(null);
  const triggerRef = React.useRef<HTMLButtonElement | null>(null);
  const { counterMethods, showModals, setShowModals, selectedCounterIdRef } =
    React.useContext(GlobalContext);

  const closeMenu = React.useCallback<closeMenuFunction>(() => {
    setShowMenu(false);
  }, []);

  const openMenu = React.useCallback<openMenuFunction>(() => {
    setShowMenu(true);
  }, []);

  const toggleMenu = React.useCallback<toggleMenuFunction>(() => {
    setShowMenu((prevState) => !prevState);
  }, []);

  const handlePin = () => {
    closeMenu();
    counterMethods.updateCounter(counter.id, {
      isPinned: !counter.isPinned,
    });
  };

  const handleDelete = () => {
    selectedCounterIdRef.current = counter.id;
    setShowModals({
      ...showModals,
      deleteCounterModal: true,
    });
  };

  const handleEdit = () => {
    selectedCounterIdRef.current = counter.id;
    setShowModals({
      ...showModals,
      editCounterModal: true,
    });
  };

  useCloseOnClickOutside(menuRef, showMenu, () => closeMenu(), triggerRef);

  return (
    <div className="dropdown">
      <Button
        size="sm"
        onClick={toggleMenu}
        ref={triggerRef}
      >
        <BsThreeDots />
      </Button>
      <ul
        ref={menuRef}
        className={`dropdown-menu border-0 p-0 shadow ${showMenu ? "show" : ""}`}
        style={{ transform: "translate(-98%)" }}
      >
        <div className="hstack">
          <Button
            className="rounded-0 border-0 flex-grow-1"
            onClick={handleEdit}
          >
            <BsPencil />
          </Button>
          <Button
            className="rounded-0 border-0 flex-grow-1"
            onClick={handleDelete}
          >
            <BsTrash />
          </Button>
          <Button
            className="rounded-0 border-0 flex-grow-1"
            contrast={counter.isPinned ? "high" : "low"}
            onClick={handlePin}
          >
            <BsPin />
          </Button>
        </div>
      </ul>
    </div>
  );
};

interface Props {
  view: CountersListView;
  counter: Counter;
}

const CounterCard: React.FC<Props> = ({ view = "grid", counter }) => {
  const { counterMethods } = React.useContext(GlobalContext);

  return (
    <>
      {/* Header */}
      <div className="d-flex justify-content-between py-2 px-3 bg-light border align-items-center">
        <h6 className="mb-0 fw-normal">{counter.label}</h6>
        <CounterOptionsMenu counter={counter} />
      </div>
      {/* Body */}
      <div
        className={
          "p-3 border border-top-0 " +
          (view === "grid" ? "vstack gap-3 align-items-center" : "hstack justify-content-between")
        }
      >
        <span className="text-muted fs-4">{counter.value}</span>
        <div className={`hstack gap-2 ${view === "grid" ? "justify-content-center" : ""}`}>
          <Button
            size="sm"
            className="border-0 text-muted"
            onClick={() =>
              counter.init === counter.value
                ? {}
                : counterMethods.updateCounter(counter.id, {
                    value: counter.init,
                  })
            }
          >
            <BsArrowCounterclockwise />
          </Button>
          <Button
            size="sm"
            className="border-0 text-muted"
            onClick={() =>
              counterMethods.updateCounter(counter.id, {
                value: counter.value - counter.step,
              })
            }
          >
            <BsDash />
          </Button>
          <Button
            size="sm"
            className="border-0 text-muted"
            onClick={() =>
              counterMethods.updateCounter(counter.id, {
                value: counter.value + counter.step,
              })
            }
          >
            <BsPlus />
          </Button>
        </div>
      </div>
    </>
  );
};

export default CounterCard;
