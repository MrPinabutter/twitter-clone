"use client";

import useLoginModal from "@/hooks/useLogin";
import Modal from "./Modal";
import { useState } from "react";

const ModalLogin = () => {
  const { isOpen, onClose } = useLoginModal();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Modal
      title="Login"
      isOpen={isOpen}
      onClose={onClose}
      actionLabel="Login"
      onSubmit={() => {}}
    />
  );
};

export default ModalLogin;
