"use client";

import Header from "@/components/molecules/Header";
import UserBio from "@/components/molecules/UserBio";
import UserHero from "@/components/molecules/UserHero";
import useUser from "@/hooks/useUser";
import { MoonLoader } from "react-spinners";

export default function Home({ params }: { params: { userId: string } }) {
  const { data: user, isPending, error } = useUser(params.userId);

  if (isPending || !user) {
    return (
      <div className="flex justify-center items-center h-full">
        <MoonLoader color="lightblue" size={80} />
      </div>
    );
  }

  return (
    <>
      <Header showBackArrow label={user?.name} />
      <UserHero userId={params.userId} />
      <UserBio userId={params.userId} />
    </>
  );
}
