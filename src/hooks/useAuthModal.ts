'use client';

import { usePathname, useRouter, useSearchParams } from "next/navigation";

type authModalValues = 'login-modal' | 'register-modal'

const useAuthModal = () => {
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const router = useRouter()

  const onOpen = (value: authModalValues) => {
    const params = new URLSearchParams(searchParams);
    params.set(value, 'true');

    router.push(`${pathname}?${params}`)
  };

  const onClose = (value: authModalValues) => {
    const params = new URLSearchParams(searchParams);
    params.delete(value);

    router.push(`${pathname}?${params}`)
  };

  const toggleModal = (value: authModalValues) => {
    const params = new URLSearchParams(searchParams)
    params.set(value, 'true')

    if (value == 'login-modal') params.delete('register-modal')
    if (value == 'register-modal') params.delete('login-modal')

    router.push(`${pathname}?${params}`)
  }

  const isOpen = (value: authModalValues) => searchParams.get(value) === 'true'


  return {
    isOpen,
    onOpen,
    onClose,
    toggleModal
  }
}

export default useAuthModal;