import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
} from "./dialog";

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export function Modal({ open, onClose, children, className }: ModalProps) {
  return (
    <Dialog open={open} onOpenChange={(v: boolean) => !v && onClose()}>
      <DialogContent
        className={`bg-black border border-white text-white ${className ?? ""}`}
      >
        <DialogHeader />
        <DialogDescription asChild>
          <div>{children}</div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
