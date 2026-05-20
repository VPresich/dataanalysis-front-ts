import UnauthorizedForm from "../UnauthorizedForm/UnauthorizedForm";
import ModalWrapper from "../UI/ModalWrapper/ModalWrapper";

interface UnauthorizedModalProps {
  onClose: () => void;
}

export default function UnauthorizedModal({ onClose }: UnauthorizedModalProps) {
  const handleUnauthorizedSubmit = () => {
    onClose();
  };
  return (
    <ModalWrapper onClose={onClose}>
      <UnauthorizedForm onSubmit={handleUnauthorizedSubmit} />
    </ModalWrapper>
  );
}
