'use client'

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { BiArrowBack } from "react-icons/bi";

interface HeaderProps {
  label: string;
  showBackArrow?: boolean;
}

const Header: React.FC<HeaderProps> = ({ label, showBackArrow }) => {
  const router = useRouter()

  const handleBack = useCallback(() => {
    router.back()
  }, [router])

  return (
    <header className="border-b border-neutral-800 p-5">
      <div className="flex flex-row items-center gap-2">
        {showBackArrow && (
          <BiArrowBack
            size={20}
            color="white"
            onClick={handleBack}
            className="cursor-pointer hover:opacity-70 transition"
          />
        )}
        
        <span className="text-white font-semibold">{label}</span>
      </div>
    </header>
  )
}

export default Header;