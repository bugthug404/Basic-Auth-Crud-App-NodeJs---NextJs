import { ToastOptions, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export const useToaster = () => {
  const Toast = (text: string, options?: ToastOptions) => {
    toast(text, {
      ...options,
    });
  };
  return Toast;
};
