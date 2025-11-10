import * as React from "react";
import { Button } from "./button";
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
  className?: string;
}

export function InfoModal({ open, onClose, children, className }: InfoModalProps) {
  return (
    <Dialog open={open} onOpenChange={(v: boolean) => !v && onClose()}>
      <DialogContent className={`${className ?? ""}`}>
        <DialogHeader>
        </DialogHeader>
        <DialogDescription asChild>
          <div>{children}</div>
        </DialogDescription>
        <DialogClose asChild>
          <Button variant="secondary" className="mt-6 w-full bg-black-200 text-white font-semibold py-2 rounded">닫기</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
