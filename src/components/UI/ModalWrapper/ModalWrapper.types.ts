export interface ModalWrapperProps {
  children: React.ReactNode;
  onClose: () => void;
  portalId?: string;
  isGraph?: boolean;
}
