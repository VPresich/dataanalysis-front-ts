import { useState } from "react";
import ModalWrapper from "../../components/UI/ModalWrapper/ModalWrapper";
import Button from "../../components/UI/Button/Button";
import GraphComponent from "../../components/GraphComponent/GraphComponent";
import css from "./ShowGraphModal.module.css";

export default function ShowGraphModal({ dataForTrack }) {
  const [showGraph, setShowGraph] = useState(false);

  const handleClick = () => {
    setShowGraph(true);
  };

  const handleClose = () => {
    setShowGraph(false);
  };

  return (
    <>
      <Button btnAuxStyles={css.auxBtnStyle} onClick={handleClick}>
        Show graph
      </Button>
      {showGraph && (
        <ModalWrapper onClose={handleClose} isGraph={true}>
          <GraphComponent dataForTrack={dataForTrack} />
        </ModalWrapper>
      )}
    </>
  );
}
