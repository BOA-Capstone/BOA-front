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
}

export function Modal({ open, onClose, children,}: ModalProps) {
  return (
  <Dialog open={open} onOpenChange={(v: boolean) => !v && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
        </DialogHeader>
        <DialogDescription asChild>
          <div>{children}</div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
