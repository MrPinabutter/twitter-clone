'use client';

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const useLoginModal = () => {
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const router = useRouter()

  const onOpen = () => {
    const params = new URLSearchParams(searchParams);
    params.set('login-modal', 'true');

    router.push(`${pathname}?${params}`)
  };

  const onClose = () => {
    const params = new URLSearchParams(searchParams);
    params.delete('login-modal');

    router.push(`${pathname}?${params}`)
  };

  return {
    isOpen: searchParams.get('login-modal') === 'true',
    onOpen,
    onClose
  }
}

export default useLoginModal;