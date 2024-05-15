"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const useEditModal = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const router = useRouter();

  const onOpen = () => {
    const params = new URLSearchParams(searchParams);
    params.set("edit-modal", "true");

    router.push(`${pathname}?${params}`);
  };

  const onClose = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("edit-modal");

    router.push(`${pathname}?${params}`);
  };

  const isOpen = () => searchParams.get("edit-modal") === "true";

  return {
    isOpen,
    onOpen,
    onClose,
  };
};

export default useEditModal;
