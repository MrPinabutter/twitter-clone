"use client";

import Input from "@/components/atoms/Input";
import useAuthModal from "@/hooks/useAuthModal";
import { register } from "@/services/auth.services";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { toast } from "react-toastify";
import Modal from "./Modal";

const ModalLogin = () => {
  const { isOpen, onClose, toggleModal } = useAuthModal();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");

  const mutation = useMutation({
    mutationFn: async (data: {
      password: string;
      email: string;
      name: string;
      username: string;
    }) => {
      const res = await register(data);

      toast.success("Account created. 😍");

      signIn(
        "credentials",
        {},
        {
          email,
          password,
        }
      );

      onClose("register-modal");

      return res;
    },
    onSuccess: onClose,
    onError: (e) => {
      toast.error("Something when wrong 🥲");
      console.error(e);
    },
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
        value={username}
        onChange={(e) => setUsername(e.target.value)}
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
      onClose={() => onClose("register-modal")}
      disabled={mutation.isPending}
      actionLabel="Register"
      onSubmit={() =>
        mutation.mutate({
          email,
          password,
          name,
          username,
        })
      }
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default ModalLogin;
