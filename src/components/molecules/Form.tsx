"use client";

import useAuthModal from "@/hooks/useAuthModal";
import useCurrentUser from "@/hooks/useCurrentUser";
import usePosts from "@/hooks/usePosts";
import { useCallback, useState } from "react";
import Avatar from "../atoms/Avatar";
import Button from "../atoms/Button";

interface FormProps {
  placeholder: string;
  isComment?: boolean;
  postId?: string;
}

const Form: React.FC<FormProps> = ({
  placeholder,
  isComment,
  postId,
  ...rest
}) => {
  const { toggleModal, isOpen } = useAuthModal();

  const { data: currentUser } = useCurrentUser();
  const { data, mutate, isPending, isCreatePending } = usePosts();

  const [body, setBody] = useState("");

  const onSubmit = useCallback(async () => {
    mutate(
      { body },
      {
        onSuccess: () => {
          setBody("");
        },
      }
    );
  }, [body, mutate]);

  return (
    <div className="border-b border-neutral-800 px-5 py-2">
      {currentUser ? (
        <div className="flex flex-row gap-2">
          <div className="mt-2">
            <Avatar userId={currentUser?.id} />
          </div>

          <div className="w-full">
            <textarea
              disabled={isCreatePending}
              onChange={(e) => setBody(e.target.value)}
              value={body}
              className="
                disabled:opacity-80
                peer
                resize-none
                mt-3
                w-full
                bg-black
                ring-0
                outline-none
                placeholder-neutral-500
                text-white
              "
              placeholder={placeholder}
            />

            <hr className="opacity-0 peer-focus:opacity-100 h-px border-neutral-800 transition " />

            <div className="flex mt-3 mb-1 flex-row justify-end">
              <Button
                onClick={onSubmit}
                label="Tweet"
                className="py-1 px-3 text-[15px]"
                disabled={isCreatePending || !body}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="py-8">
          <h1 className="text-white text-2xl mb-4 font-bold">
            Welcome to Twitter
          </h1>

          <div className="flex flex-row items-center justify-center gap-4">
            <Button label="Login" onClick={() => toggleModal("login-modal")} className="py-1" />

            <Button
              label="Register"
              onClick={() => toggleModal("register-modal")}
              secondary className="py-1"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;
