"use client";

import Input from "@/components/atoms/Input";
import useAuthModal from "@/hooks/useAuthModal";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { useState } from "react";
import Modal from "./Modal";

const ModalLogin = () => {
  const { isOpen, onClose, toggleModal } = useAuthModal();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const mutation = useMutation({
    mutationFn: async () => {
      await signIn("credentials", {
        email,
        password,
        callbackUrl: '/'
      });
    },
  });

  const onToggle = async () => {
    if (mutation.isPending) return;

    toggleModal("register-modal");
  };

  const onSubmit = async () => {
    mutation.mutate();
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
        First time using Twitter?{" "}
        <span
          className="text-white cursor-pointer hover:underline"
          onClick={onToggle}
        >
          Create an account
        </span>
      </span>
    </div>
  );

  return (
    <Modal
      title="Login"
      isOpen={isOpen("login-modal")}
      onClose={() => onClose("login-modal")}
      disabled={mutation.isPending}
      actionLabel="Sign in"
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default ModalLogin;
