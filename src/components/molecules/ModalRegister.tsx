"use client";

import Input from "@/components/atoms/Input";
import useAuthModal from "@/hooks/useAuthModal";
import { login } from "@/services/auth.services";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Modal from "./Modal";

const ModalLogin = () => {
  const { isOpen, onClose, toggleModal } = useAuthModal();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");

  const mutation = useMutation({
    mutationFn: async (data: { password: string; email: string }) => {
      return await login(data);
    },
    onSuccess: onClose,
  });

  const onToggle = () => {
    if (mutation.isPending) return;

    toggleModal("login-modal");
  };

  const bodyContent = (
    <section className="flex flex-col gap-4">
      <Input
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={mutation.isPending}
      />

      <Input
        placeholder="Nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={mutation.isPending}
      />

      <Input
        placeholder="Username"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        disabled={mutation.isPending}
      />

      <Input
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={mutation.isPending}
        type="password"
      />
    </section>
  );

  const footerContent = (
    <div className="text-neutral-400 text-center mt-4">
      <span>
        Already have an account?{" "}
        <span
          className="text-white cursor-pointer hover:underline"
          onClick={onToggle}
        >
          Sign in
        </span>
      </span>
    </div>
  );

  return (
    <Modal
      title="Create an account"
      isOpen={isOpen("register-modal")}
      onClose= {() => onClose("register-modal")}
      disabled={mutation.isPending}
      actionLabel="Register"
      onSubmit={() => mutation.mutate({ email, password })}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default ModalLogin;
