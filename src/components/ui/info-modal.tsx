import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogClose,
} from "./dialog";

export interface InfoModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function InfoModal({ open, onClose, children }: InfoModalProps) {
  return (
  <Dialog open={open} onOpenChange={(v: boolean) => !v && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
        </DialogHeader>
        <DialogDescription asChild>
          <div>{children}</div>
        </DialogDescription>
        <DialogClose asChild>
          <button className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded">닫기</button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
