import { XIcon } from "lucide-react";

import { Toast } from "../ui";

export const toastManager = Toast.createManager();

export interface ToasterProps {
  children?: React.ReactNode;
}

const ToastList = () => {
  const { toasts } = Toast.useManager();

  return toasts.map((toast) => (
    <Toast.Root key={toast.id} toast={toast}>
      <Toast.Content>
        <Toast.Title />
        <Toast.Description />
        <Toast.Action />
        <Toast.Close>
          <XIcon />
        </Toast.Close>
      </Toast.Content>
    </Toast.Root>
  ));
};

export const Toaster = ({ children }: ToasterProps) => {
  return (
    <Toast.Provider toastManager={toastManager}>
      {children}

      <Toast.Portal>
        <Toast.Viewport>
          <ToastList />
        </Toast.Viewport>
      </Toast.Portal>
    </Toast.Provider>
  );
};
