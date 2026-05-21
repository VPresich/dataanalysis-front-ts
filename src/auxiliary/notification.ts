import toast from "react-hot-toast";

export const errNotify = (msg: string): void => {
  toast.error(msg, {
    duration: 1500,
  });
};

export const successNotify = (msg: string): void => {
  toast.success(msg, {
    duration: 2000,
  });
};
