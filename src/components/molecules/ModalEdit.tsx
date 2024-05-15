"use client";

import Input from "@/components/atoms/Input";
import useCurrentUser from "@/hooks/useCurrentUser";
import useEditModal from "@/hooks/useEditModal";
import useUser from "@/hooks/useUser";
import { register, updateUser } from "@/services/auth.services";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Modal from "./Modal";
import email from "next-auth/providers/email";
import ImageUpload from "./ImageUpload";

const ModalEdit = () => {
  const { isOpen, onClose } = useEditModal();

  const { data: currentUser } = useCurrentUser();
  const { refetch } = useUser(currentUser?.id);

  const [profileImage, setProfileImage] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    setProfileImage(currentUser?.profileImage);
    setCoverImage(currentUser?.coverImage);
    setName(currentUser?.name);
    setUsername(currentUser?.username);
    setBio(currentUser?.bio);
  }, [
    currentUser?.profileImage,
    currentUser?.coverImage,
    currentUser?.name,
    currentUser?.username,
    currentUser?.bio,
  ]);

  const mutation = useMutation({
    mutationFn: async (data: {
      name: string;
      username: string;
      profileImage: string;
      coverImage: string;
      bio: string;
    }) => {
      const res = await updateUser(data);
      toast.success("User successfully updated! 🤩");
      refetch();

      return res;
    },
    onSuccess: onClose,
    onError: (e) => {
      toast.error("Something when wrong 🥲");
      console.error(e);
    },
  });

  const bodyContent = (
    <section className="flex flex-col gap-4">
      <ImageUpload
        value={profileImage}
        disabled={mutation.isPending}
        onChange={(image) => setProfileImage(image)}
        label="Upload profile image"
      />

      <ImageUpload
        value={coverImage}
        disabled={mutation.isPending}
        onChange={(image) => setCoverImage(image)}
        label="Upload cover image"
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
        placeholder="Bio"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        disabled={mutation.isPending}
      />
    </section>
  );

  const footerContent = (
    <div className="text-neutral-400 text-center mt-4"></div>
  );

  return (
    <Modal
      title="Edit your profile"
      isOpen={isOpen()}
      onClose={onClose}
      disabled={mutation.isPending}
      actionLabel="Register"
      onSubmit={() =>
        mutation.mutate({
          name,
          username,
          bio,
          coverImage,
          profileImage,
        })
      }
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default ModalEdit;
