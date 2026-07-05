"use client";

import { useProjectModal } from "./ModalProvider";

export function CtaButton({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const { openModal } = useProjectModal();

  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        onClick?.();
        openModal();
      }}
    >
      {children}
    </button>
  );
}
