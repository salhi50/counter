import React from "react";
import Button from "./Button";
import { BsX } from "react-icons/bs";
import GlobalContext from "../globalContext";
import { createPortal } from "react-dom";
import TextField from "./TextField";

/**
 * @object Modal
 * @Component ModalDialog (children)
 * @Component ModalHeader (title, closeModal)
 * @Component ModalBody (children)
 * @Component ModalFooter (children)
 * @Component ModalBackdrop (show)
 */

const ModalDialog: React.FC<{ children: React.ReactNode }> = ({ children = "" }) => {
  return (
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">{children}</div>
    </div>
  );
};

const ModalHeader: React.FC<{ title: string; closeModal: () => void }> = ({
  title = "",
  closeModal = () => {},
}) => {
  return (
    <div className="modal-header">
      <h5 className="modal-title">{title}</h5>
      <Button
        size="sm"
        onClick={closeModal}
        type="button"
      >
        <BsX />
      </Button>
    </div>
  );
};

const ModalBody: React.FC<{ children: React.ReactNode }> = ({ children = "" }) => {
  return <div className="modal-body">{children}</div>;
};

const ModalFooter: React.FC<{ children: React.ReactNode }> = ({ children = "" }) => {
  return <div className="modal-footer">{children}</div>;
};

export const Modal = {
  Header: ModalHeader,
  Dialog: ModalDialog,
  Body: ModalBody,
  Footer: ModalFooter,
};

/**
 * TODO:
 * @create DeleteCounterModal
 * @create EditCounterModal
 */

export const DeleteCounterModal: React.FC = () => {
  const { selectedCounterIdRef, showModals, setShowModals, counterMethods } =
    React.useContext(GlobalContext);

  const closeModal = () => {
    setShowModals({
      ...showModals,
      deleteCounterModal: false,
    });
  };

  const deleteCounter = () => {
    const counterId = selectedCounterIdRef.current;
    if (counterId) {
      counterMethods.deleteCounter(counterId);
    }
    closeModal();
  };

  return createPortal(
    <div className={`modal ${showModals.deleteCounterModal ? "d-block" : ""}`}>
      <Modal.Dialog>
        <Modal.Body>
          <h6>Delete counter?</h6>
          <p className="text-muted">Do you want really to delete this counter?</p>
        </Modal.Body>
        <Modal.Footer>
          <div className="hstack gap-2">
            <Button onClick={closeModal}>Cancel</Button>
            <Button
              contrast="high"
              className="btn-danger"
              onClick={deleteCounter}
            >
              Delete
            </Button>
          </div>
        </Modal.Footer>
      </Modal.Dialog>
    </div>,
    document.body,
  );
};
export const EditCounterModal: React.FC = () => {
  const { counters, selectedCounterIdRef, showModals, setShowModals, counterMethods } =
    React.useContext(GlobalContext);

  const closeModal = () => {
    setShowModals({
      ...showModals,
      editCounterModal: false,
    });
  };

  const counter = counters.find((c) => c.id === selectedCounterIdRef.current);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    type Data = {
      label: string;
      value: string;
      init: string;
      step: string;
    };
    const submittedData = Object.fromEntries(
      new FormData(e.target as HTMLFormElement),
    ) as unknown as Data;
    if (counter) {
      counterMethods.updateCounter(counter.id, {
        label: submittedData.label,
        value: isNaN(parseInt(submittedData.value, 10)) ? 0 : parseInt(submittedData.value, 10),
        step: isNaN(parseInt(submittedData.step, 10)) ? 1 : parseInt(submittedData.step, 10),
        init: isNaN(parseInt(submittedData.init, 10)) ? 0 : parseInt(submittedData.init, 10),
      });
    }
    closeModal();
  };

  return createPortal(
    <div className={`modal ${showModals.editCounterModal ? "d-block" : ""}`}>
      <Modal.Dialog>
        <form onSubmit={handleSubmit}>
          <Modal.Header
            title="Edit counter"
            closeModal={closeModal}
          />
          <Modal.Body>
            <div className="vstack gap-2">
              <TextField
                label="Label"
                required
                name="label"
                defaultValue={counter?.label || ""}
              />
              <div className="hstack gap-2">
                <TextField
                  label="Value"
                  required
                  name="value"
                  type="number"
                  defaultValue={counter?.value}
                />
                <TextField
                  label="Step"
                  required
                  name="step"
                  type="number"
                  defaultValue={counter?.step}
                />
                <TextField
                  label="Init"
                  required
                  name="init"
                  type="number"
                  defaultValue={counter?.init}
                />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className="hstack gap-2">
              <Button
                onClick={closeModal}
                type="button"
              >
                Cancel
              </Button>
              <Button
                contrast="high"
                type="submit"
              >
                Save
              </Button>
            </div>
          </Modal.Footer>
        </form>
      </Modal.Dialog>
    </div>,
    document.body,
  );
};
