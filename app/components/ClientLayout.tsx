"use client";

import { ToastContainer } from "./Toast";
import { useWallet } from "./WalletContext";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const { toasts, removeToast } = useWallet();

  return (
    <>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </>
  );
}
