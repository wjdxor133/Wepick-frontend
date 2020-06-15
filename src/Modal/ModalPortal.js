import { useMemo } from "react";
import ReactDOM from "react-dom";

const ModalPortal = ({ children, elementId }) => {
  const rootElement = useMemo(() => document.getElementById(elementId), [
    elementId,
  ]);

  return ReactDOM.createPortal(children, rootElement);
};

export default ModalPortal;
