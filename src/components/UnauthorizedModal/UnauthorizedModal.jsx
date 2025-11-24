import UnauthorizedForm from "../UnauthorizedForm/UnauthorizedForm";
import ModalWrapper from "../UI/ModalWrapper/ModalWrapper";

export default function UnauthorizedModal({ onClose }) {
  const handleUnauthorizedSubmit = (e) => {
    e.preventDefault();
    onClose();
  };
  return (
    <ModalWrapper onClose={onClose}>
      <UnauthorizedForm onSubmit={handleUnauthorizedSubmit} />
    </ModalWrapper>
  );
}
