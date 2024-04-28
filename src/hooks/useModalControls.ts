import { useCallback, useState } from "react";

const lockBodyScroll = () => {
  const hasVerticalScroll = !!(
    window.innerWidth - window.document.body.clientWidth
  );

  if (hasVerticalScroll) {
    window.document.body.style.paddingRight = "15px";
  }

  window.document.body.style.overflow = "hidden";
};

const unlockBodyScroll = () => {
  window.document.body.style.overflow = "auto";
  window.document.body.style.paddingRight = "0";
};

export const useModalControls = (defaultState = false) => {
  const [isOpen, setIsOpen] = useState(defaultState);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    unlockBodyScroll();
  }, []);

  const openModal = useCallback(() => {
    setIsOpen(true);
    lockBodyScroll();
  }, []);

  const toggleModal = useCallback(
    (prevState: boolean) => setIsOpen(!prevState),
    []
  );

  return { isOpen, closeModal, openModal, toggleModal };
};
