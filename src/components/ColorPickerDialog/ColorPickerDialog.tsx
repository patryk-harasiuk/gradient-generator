import {
  KeyboardEventHandler,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import { hasAnimationsFinished } from "../../utils/hasAnimationsFinished";

enum ModalState {
  Idle,
  Closing,
}

type Props = {
  closeModal: VoidFunction;
};

// #TODO: Finish implementation of this later when popover color picker is done first

export const ColorPickerDialog = ({ closeModal }: Props) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [modalState, setModalState] = useState<ModalState>(ModalState.Idle);

  const setToClosing = () => setModalState(ModalState.Closing);

  const handleBackdropClick: MouseEventHandler<HTMLDialogElement> = (event) => {
    const clickedBackdrop =
      modalRef.current &&
      !event.nativeEvent.composedPath().includes(modalRef.current);
    console.log(
      modalRef.current &&
        event.nativeEvent.composedPath().includes(modalRef.current),
      "composedPath"
    );

    if (clickedBackdrop) setToClosing();
  };

  const onEscapeKey: KeyboardEventHandler<HTMLDialogElement> = (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      setToClosing;
    }
  };

  useEffect(() => {
    dialogRef.current?.showModal();
  }, []);

  useEffect(() => {
    if (modalRef.current && modalState === ModalState.Closing) {
      hasAnimationsFinished(modalRef.current).then(closeModal);
    }
  }, [modalState, closeModal]);

  return (
    <dialog
      onKeyDown={onEscapeKey}
      onClick={handleBackdropClick}
      ref={dialogRef}
    ></dialog>
  );
};
